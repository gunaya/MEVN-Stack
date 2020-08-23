"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../users/schema");
class AuthService {
    login(query, callback) {
        schema_1.default.findOne(query, callback);
    }
}
exports.default = AuthService;
