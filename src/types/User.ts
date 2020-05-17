export class User
{
    name: string
    lastName: string
    email: string
    username: string
    birthday?: Date
    imagePath?: string

    constructor(name: string = "", lastName:string = "", email: string = "", username: string = "")
    {
        this.name = name
        this.lastName = lastName
        this.email = email
        this.username = username;
    }
}

export interface UserDocument
{
    path: string
    documentType : string,
    additionInfo : string
}