import { Get_notify } from "../action/notificationAction";

const initalstate = {
    notify: [],

};


export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_notify:
            return { notify: action.data.data }

        default:
            return state;
    }
};
