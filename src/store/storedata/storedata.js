import idupdata from "../../dispach/dispachtype/dispachtype";

const defaultState = {
    id:""
}
export default (state=defaultState,action)=>{
    let newstate = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case idupdata:
            newstate.id=action.val;
            return newstate;
        default:
            break;
    }
    return state
}