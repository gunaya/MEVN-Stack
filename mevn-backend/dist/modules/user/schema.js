"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
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
    modification_note: [model_1.ModificationNote]
});
exports.default = mongoose.model('user', schema);
