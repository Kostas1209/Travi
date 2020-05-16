import { UserState, userReducer } from "./User/reducer";
import { combineReducers } from "redux";
import { TravellingState, travelReducer } from "./Travelling/reducer";
import { NeededThingsState, thingsReducer } from "./NeededThings/reducer";


export interface RootState{
    user: UserState
    travelling: TravellingState
    neededThings : NeededThingsState
}

const rootReducer = combineReducers({
    user: userReducer,
    travelling: travelReducer,
    neededThings : thingsReducer
})

export default rootReducer;