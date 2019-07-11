import {createStore,combineReducers} from "redux";
import storedata from "./storedata/storedata";
const Reduxs = combineReducers({
    storedata
})
const store = createStore(Reduxs);
export default store;
