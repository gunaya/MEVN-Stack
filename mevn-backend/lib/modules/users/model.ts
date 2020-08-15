import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: String;
    name: {
        first_name: String;
        last_name: String;
    }
    username: String;
    password: String;
    email: String;
    phone_number: String;
    gender: String;
    is_admin?: Boolean;
    modification_note: ModificationNote[];

}