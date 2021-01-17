
import { combineReducers } from 'redux';

import lang from './LangReducer';
import auth from './AuthReducer';
import plan from './HomeReducer';
import subs from './SubscriptionReducer';
import banks from './BankReducer';
import drawer from './DrawerReducer';
import notify from './notifictaionReducer'

export default multiReducres = combineReducers({
    lang,
    auth,
    plan,
    subs,
    banks,
    drawer,
    notify
})