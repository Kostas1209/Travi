import { Action } from "redux";
import { setIsUserInit, SaveUser, SaveAvatar } from "./actions";
import { User } from "../../types/User";

const INITIAL_STATE = {
    user: new User(),
    userCreate: false
};


export interface UserState{
    userCreate: boolean
    user: User
}

export function userReducer(state: UserState  = INITIAL_STATE, action: Action):UserState  {

    if(setIsUserInit.is(action))
    {
        console.log(action.userCreate)
        return{
            ...state,
            userCreate: action.userCreate
        };
    }
    if(SaveUser.is(action))
    {
        console.log(action.user);
        return{
            ...state,
            user: action.user
        }
    }
    if(SaveAvatar.is(action))
    {
        console.log(action.imagePath);
        let newUser = Object.assign({}, state.user);
        newUser.imagePath = action.imagePath;
        return{
            ...state,
            user: newUser
        }
    }

    return state
}
