import { defineAction } from "rd-redux-utils"
import { User } from "../../types/User";

export const setIsUserInit = defineAction<{
    userCreate : boolean;
}>("USER IS INIT");

export const SaveUser = defineAction<{
    user: User
}>("CREATE USER")

export const SaveAvatar = defineAction<{
    imagePath: string 
}>("SAVE AVATAR")