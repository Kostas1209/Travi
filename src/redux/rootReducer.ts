import { UserState, userReducer } from "./User/reducer";
import { combineReducers } from "redux";
import { TravellingState, travelReducer } from "./Travelling/reducer";


export interface RootState{
    user: UserState
    travelling: TravellingState
}

const rootReducer = combineReducers({
    user: userReducer,
    travelling: travelReducer
})

export default rootReducer;