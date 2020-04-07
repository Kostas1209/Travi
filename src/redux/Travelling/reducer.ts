import { Travelling } from "../../types/Travelling";
import { Action } from "redux";
import { createTravelling, deleteTravelling } from "./actions";

export interface TravellingState
{
    travellingList: Travelling[]
}

const INITIAL_STATE: TravellingState = {
    travellingList: []
}

export function travelReducer(state: TravellingState = INITIAL_STATE, action: Action): TravellingState
{
    if(createTravelling.is(action))
    {
        state.travellingList.push(action.travelling);
        let newTravellingList = state.travellingList.sort((a:Travelling, b:Travelling) =>{
            if(a.arriveDate  >  b.arriveDate)
            {
                return 1;
            } 
            if(a.arriveDate < b.arriveDate)
            {
                return -1
            }
            return 0;

        })
        console.log(newTravellingList)
        return{
            ...state,
            travellingList: newTravellingList
        };
    }
    if(deleteTravelling.is(action))
    {
        let newTravellingList = Object.assign([], state.travellingList);
        newTravellingList.splice(action.index,1);
        return{
            ...state,
            travellingList: newTravellingList
        };
    }
    return state
}