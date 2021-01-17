import { Get_Bank } from "../action/BankAction";

const initalstate = {
    banks: [],

};


export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_Bank:
            return { banks: action.data.data }

        default:
            return state;
    }
};
