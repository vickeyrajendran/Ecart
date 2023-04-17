import {Fragment, useEffect, useState} from "react";
import { useDispatch, useSelector,} from "react-redux";
import { clearAuthError, login } from "../../actions/userAction";
import MetaData from "../Layouts/MetaData";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";




export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch(); // indha function dan login la irukadha eduthu store ku anupum
    const navigate = useNavigate(); //change the browser to the wanted page
    const location = useLocation();
    const { loading, error, isAuthenticated} = useSelector(state =>state.authState); // idhu redux la authstate la iruka loading data va eduka use panrom
    const redirect = location.search?'/'+location.search.split('=')[1]:'/'; // cart.js la checkouthnadler la use panradhu
   

const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
};


    const submitHandler = (e)=>{
        e.preventDefault(); // idhu vandhu login ah touch panrapo mela load aagaama stop panradhukaga
       dispatch(login(email,password))
    }

    useEffect(()=>{  
        //use effect - component load aagi mudicha udane kaamikra oru fn kandipa dependency kudukanum
        if(isAuthenticated){
            navigate(redirect) //change to redirect page
        
        }
        if(error){
            toast(error,{
            position:toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            onOpen: ()=> { dispatch(clearAuthError)}
            
            })
            return
        }
    },[error,isAuthenticated,dispatch,navigate,redirect])

    return(
        <Fragment>
            <MetaData title={`Login`}/>
      <div className="row wrapper"> 
            <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange = {e=>setEmail(e.target.value)}
                />
                </div>
    
                <div className="form-group password-input-container">
                <label htmlFor="password_field">Password</label>
                <div className=""></div>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange = {e=>setPassword(e.target.value)}                  
                />
                  <i className={showPassword ?"fa fa-eye":"fa fa-eye-slash"} onClick={toggleShowPassword}></i>
            </div>

                <Link to={'/password/forgot'} className="float-right mb-4">Forgot Password?</Link>
    
                <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled = {loading}
                >
                LOGIN
                </button>

               <Link to ={'/register'} className="float-right mt-3">New User?</Link>
            </form>
            </div>
         </div>
        </Fragment>
    )
}

