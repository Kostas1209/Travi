import { Action } from "redux";
import { setIsUserInit, SaveUser, SaveAvatar, addDocument, deleteDocument } from "./actions";
import { User, UserDocument } from "../../types/User";

const INITIAL_STATE = {
    user: new User(),
    userCreate: false,
    documentList : []
};


export interface UserState{
    userCreate: boolean
    user: User,
    documentList: Array<UserDocument>

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
    if(addDocument.is(action))
    {
        let newDocumentList = Object.assign([], state.documentList);
        newDocumentList.push(action.document);
        return{
            ...state,
            documentList: newDocumentList
        }
    }
    if(deleteDocument.is(action))
    {
        let newDocumentList = Object.assign([], state.documentList);
        newDocumentList.splice(action.index,1);
        return {
            ...state,
            documentList: newDocumentList
        }
    }

    return state
}
