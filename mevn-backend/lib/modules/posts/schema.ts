import * as mongoose from 'mongoose';
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const schema = new Schema({
    post: String,
    modification_note: [ModificationNote],
});

export default mongoose.model('post', schema);