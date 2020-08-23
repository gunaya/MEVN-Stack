import * as mongoose from 'mongoose';
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: {
            first_name: String,
            last_name: String
        }
    },
    username: String,
    password: String,
    email: String,
    phone_number: String,
    gender: String,
    is_admin: {
        type: Boolean,
        default: false
    },
    modification_note: [ModificationNote],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

export default mongoose.model('user', schema);