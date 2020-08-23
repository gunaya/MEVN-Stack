"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
class AuthController {
    constructor() {
        this.user_service = new service_2.default();
    }
    login(req, res) {
        if (req.body.username && req.body.password) {
            const user_filter = { username: req.body.username };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    const cekPass = bycript.compareSync(req.body.password, user_data['password']);
                    if (cekPass) {
                        const token = jwt.sign({ userId: user_data._id, username: user_data.username }, config_1.default.jwtSecret, { expiresIn: '1h' });
                        // user_data['token'] = token;
                        res.send({ user: user_data, token: token });
                        // successResponse('login successfully', user_data, res);
                    }
                    else {
                        service_1.failureResponse('invalid user', null, res);
                    }
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.AuthController = AuthController;
