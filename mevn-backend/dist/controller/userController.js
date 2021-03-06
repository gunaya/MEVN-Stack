"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
const bycript = require("bcrypt");
class UserController {
    constructor() {
        this.user_service = new service_2.default();
        this.create_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.name && req.body.name.first_name && req.body.name.last_name && req.body.username && req.body.email && req.body.phone_number && req.body.gender) {
                const hashedPassword = yield bycript.hash(req.body.password, 10);
                const user_params = {
                    name: {
                        first_name: req.body.name.first_name,
                        last_name: req.body.name.last_name
                    },
                    password: hashedPassword,
                    username: req.body.username,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    gender: req.body.gender,
                    modification_note: [{
                            modified_on: new Date(Date.now()),
                            modified_by: null,
                            modification_note: 'New User Created'
                        }],
                    posts: null,
                };
                this.user_service.createUser(user_params, (err, user_data) => {
                    if (err) {
                        service_1.mongoError(err, res);
                    }
                    else {
                        service_1.successResponse('create user successfully', user_data, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        });
        this.update_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.params.id && req.body.name || req.body.name.first_name || req.body.name.last_name || req.body.username || req.body.email || req.body.phone_number || req.body.gender || req.body.is_admin) {
                const user_filter = { _id: req.params.id };
                let hashedPassword = '';
                if (req.body.password) {
                    hashedPassword = yield bycript.hash(req.body.password, 10);
                }
                this.user_service.filterUser(user_filter, (err, user_data) => {
                    if (err) {
                        service_1.mongoError(err, res);
                    }
                    else if (user_data) {
                        user_data.modification_note.push({
                            modified_on: new Date(Date.now()),
                            modified_by: null,
                            modification_note: 'User Updated'
                        });
                        const user_params = {
                            _id: req.params.id,
                            name: req.body.name ? {
                                first_name: req.body.name.first_name ? req.body.name.first_name : user_data.name.first_name,
                                last_name: req.body.name.last_name ? req.body.name.last_name : user_data.name.last_name,
                            } : user_data.name,
                            password: req.body.password ? hashedPassword : user_data.password,
                            username: req.body.username ? req.body.username : user_data.username,
                            email: req.body.email ? req.body.email : user_data.email,
                            gender: req.body.gender ? req.body.gender : user_data.gender,
                            phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                            is_admin: req.body.is_admin ? req.body.is_admin : user_data.is_admin,
                            modification_note: user_data.modification_note,
                            posts: user_data.posts,
                        };
                        this.user_service.updateUser(user_params, (err) => {
                            if (err) {
                                service_1.mongoError(err, res);
                            }
                            else {
                                service_1.successResponse('update user successfully', null, res);
                            }
                        });
                    }
                    else {
                        service_1.failureResponse('invalid user', null, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        });
    }
    list_user(req, res) {
        this.user_service.listUser({}, (err, user_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('get all user successfully', user_data, res);
            }
        });
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('get user successfully', user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete user successfully', null, res);
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.UserController = UserController;
