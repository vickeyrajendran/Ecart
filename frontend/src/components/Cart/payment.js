import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "../Cart/Shipping";
import { CardNumberElement,CardExpiryElement,CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder} from "../../actions/orderActions";
import { clearError } from "../../slices/orderSlice";


export default function Payment() {
    const stripe = useStripe();
    const elements = useElements(); //payment releated like card no adhuku use panra hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));//json.parse used to convert string into json object
    const { user }= useSelector(state=>state.authState);
    const { items:cartItems, shippingInfo } =  useSelector(state=>state.cartState);
    const {error:orderError} = useSelector(state => state.orderState);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100), //100 cents make 1 dollar ruppe ku paise mari dollar ku cents
        shipping:{
            name:user.name,
            address:{
                city:shippingInfo.city,
                postal_code:shippingInfo.postalCode,
                country:shippingInfo.country,
                state:shippingInfo.state,
                line1:shippingInfo.address
            },
            phone:shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems:cartItems,
        shippingInfo
    }
    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    useEffect(()=>{
        validateShipping(shippingInfo,navigate)
        if(orderError){
            toast(orderError,{
                position:toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError())}
                
                })
                return
        }

},[shippingInfo, orderError,navigate,dispatch])
 const submitHandler = async(e)=>{
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;
    try {
     const { data } =  await axios.post('/api/v1/payment/process',paymentData);
     const clientSecret = data.client_secret;
     const result =  stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: elements.getElement(CardNumberElement),
            billing_details:{
                name:user.name,
                email:user.email
            }
        }
     })
     if(result.error){
        toast (result.error.message, {
            type:'error',
            position:toast.POSITION.BOTTOM_CENTER
        })
        document.querySelector('#pay_btn').disabled = false;
     }else{
        if((await result).paymentIntent.status ==='succeeded'){
            toast('Payment Success',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER
            })
            order.paymentInfo = {
                id:(await result).paymentIntent.id,
                status:(await result).paymentIntent.status
            }
            dispatch(orderCompleted())
            dispatch(createOrder(order))
            navigate('/order/success')
        }else{
            toast('please try again', {
                type:'warning',
                position:toast.POSITION.BOTTOM_CENTER
            })
        }
     }
    } catch (error) {
        toast('An error occurred. Please try again later.', {
            type: 'error',
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
 }
return(
   
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                <label htmlFor="card_num_field">Card Number</label>
                <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                   
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="card_exp_field">Card Expiry</label>
                <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                 
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="card_cvc_field">Card CVC</label>
                <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                   
                 
                />
                </div>
    
            
                <button
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3"
                >
                Pay = {` $${orderInfo && orderInfo.totalPrice}`}
                </button>

            </form>
        </div>
    </div>
)

}


