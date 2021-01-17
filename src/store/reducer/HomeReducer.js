import { get_Plans, Get_toutoriales } from "../action/HomeAction";

const initalstate = {
    plan: [],
    toutorial: [],
};


export default (state = initalstate, action) => {

    switch (action.type) {
        case get_Plans:
            return { plan: action.data.data }
        case Get_toutoriales:
            return { toutorial: action.data };


        default:
            return state;
    }
};
