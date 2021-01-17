import { Get_subscriptions } from "../action/Subscribtionaction";

const initalstate = {
    subs: [],

};


export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_subscriptions:
            return { subs: action.data.data }

        default:
            return state;
    }
};
