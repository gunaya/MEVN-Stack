"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class PostService {
    createPost(post_params, callback) {
        const _session = new schema_1.default(post_params);
        _session.save(callback);
    }
}
exports.default = PostService;
