import { ModificationNote } from "../common/model";

export interface IPost {
    _id?: String;
    post: String;
    modification_note: ModificationNote[];
}