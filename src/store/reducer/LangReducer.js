import { chooseLang } from "../action/LangAction";

const initalstate = {
    language: 'ar',
};
export default (state = initalstate, action) => {

    switch (action.type) {
        case chooseLang:
            return { language: action.lang };

        default:
            return state;
    }
};

