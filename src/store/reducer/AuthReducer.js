import { Activate_Code, Sign_up, login_failed, login_success, Sign_In, logout } from "../action/AuthAction";

const initial_State = { user: null, loading: false, message: '', success: false, Validate: false }


export default (state = initial_State, action) => {
    switch (action.type) {
        case Sign_In:
            return { ...state };

        case login_success:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success }
        case login_failed:
            return { ...state, message: action.error.message, success: action.error.success }
        case Sign_up:
            return { ...state, message: action.payload.message, }
        case Activate_Code:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success };

        case logout:
            return { user: null }

        default:
            return state;
    }


}