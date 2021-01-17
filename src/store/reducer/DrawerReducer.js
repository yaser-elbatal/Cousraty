import { Get_Terms, Get_About, Get_Ques, Get_contactus } from "../action/DrawerAction";

const initalstate = {
    terms: '', about: '', question: [], contact: {}

};


export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_Terms:
            return { terms: action.data.data }
        case Get_About:
            return { about: action.data.data }
        case Get_Ques:
            return { question: action.data.data }
        case Get_contactus:
            return { contact: action.data.data };


        default:
            return state;
    }
};
