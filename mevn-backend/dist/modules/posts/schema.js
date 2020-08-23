"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    post: String,
    modification_note: [model_1.ModificationNote],
});
exports.default = mongoose.model('post', schema);
