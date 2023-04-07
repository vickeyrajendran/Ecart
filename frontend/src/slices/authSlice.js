import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
     name : 'auth',
     initialState: {
        loading: true,
        isAuthenticated:false
     },
     reducers: {       
            //Login details    
        loginRequest(state,action){
            return {
                ...state, //isAuthenticated:false idha marupadi type panradhuku badhil spread operator la kondu varom
                loading:true
            }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user: action.payload.user
                //action.payload.user - postman la iruka authentication la iruka user ah access panna dan idhu
               }
        },
        loginFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        clearError (state,action){
            return{
               ...state,
                error: null
            }
        },

    //  Register details

        registerRequest(state,action){
            return {
                ...state, //isAuthenticated:false idha marupadi type panradhuku badhil spread operator la kondu varom
                loading:true
            }
        },
        registerSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user: action.payload.user
                //action.payload.user - postman la iruka authentication la iruka user ah access panna dan idhu
               }
        },
        registerFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },

    //Loading User Details
        loadUserRequest(state,action){
            return {
                ...state, 
                isAuthenticated:false,
                loading:true
            }
        },
        loadUserSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user: action.payload.user
               }
        },
        loadUserFail(state,action){
            return{
                ...state,
                loading:false
            }
        },
        // Logout field
        logoutSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false,
               }
        },
        logoutFail(state,action){
            return{
                ...state,
                error: action.payload
            }
        },
        //Update profile
        updateProfileRequest(state,action){
            return {
                ...state, 
                loading:true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state,action){
            return{
                ...state,
                loading:false,
                user: action.payload.user,
                isUpdated:true
                
        }
    },
        updateProfileFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        clearUpdateProfile(state,action){
            return{
                ...state,
               isUpdated:false
            }
        },
        //Update password
        updatePasswordRequest(state,action){
            return {
                ...state, 
                loading:true,
                isUpdated:false
            }
        },
        updatePasswordSuccess(state,action){
            return{
                ...state,
                loading:false,             
                isUpdated:true               
        }
    },
        updatePasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
         //forgot password
         forgotPasswordRequest(state,action){
            return {
                ...state, 
                loading:true,
                message:null 
            }
        },
        forgotPasswordSuccess(state, action){
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
           //Reset password
        resetPasswordRequest(state,action){
            return {
                ...state, 
                loading:true,
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,             
               isAuthenticated : true ,
               user:action.payload.user             
        }
    },
    resetPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
         
       
        
        
     }

}); 
    
const { actions, reducer} = authSlice;

export const {loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserSuccess,
    loadUserFail,
    loadUserRequest,
    logoutFail,
    logoutSuccess,
    updateProfileFail,
    updateProfileSuccess,
    updateProfileRequest,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = actions;

export default reducer;

