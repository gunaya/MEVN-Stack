"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class UserService {
    createUser(user_params, callback) {
        const _session = new schema_1.default(user_params);
        _session.save(callback);
    }
    filterUser(query, callback) {
        schema_1.default.findOne(query, callback).populate("posts", "-modification_note -__v");
    }
    updateUser(user_params, callback) {
        const query = { _id: user_params._id };
        schema_1.default.findOneAndUpdate(query, user_params, callback);
    }
    deleteUser(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
    listUser(query, callback) {
        schema_1.default.find(query, callback);
    }
    // post
    updatePost(user_id, post_id, callback) {
        schema_1.default.findByIdAndUpdate(user_id, { $push: { posts: post_id } }, callback);
    }
}
exports.default = UserService;
