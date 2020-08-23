import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: string;
    name: {
        first_name: string;
        last_name: string;
    }
    username: string;
    password: string;
    email: string;
    phone_number: string;
    gender: string;
    is_admin?: Boolean;
    modification_note: ModificationNote[];
    posts: [];

}