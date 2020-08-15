"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
class UserController {
    constructor() {
        this.user_service = new service_2.default();
    }
    create_user(req, res) {
        if (req.body.name && req.body.name.first_name && req.body.name.last_name && req.body.username && req.body.email && req.body.phone_number && req.body.gender) {
            const user_params = {
                name: {
                    first_name: req.body.name.first_name,
                    last_name: req.body.name.last_name
                },
                password: null,
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                modification_note: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New User Created'
                    }]
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
    }
    list_user(req, res) {
        this.user_service.listUser({}, (err, user_data) => {
            console.log(user_data);
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
    update_user(req, res) {
        if (req.params.id && req.body.name || req.body.name.first_name || req.body.name.last_name || req.body.username || req.body.email || req.body.phone_number || req.body.gender || req.body.is_admin) {
            const user_filter = { _id: req.params.id };
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
                        password: req.body.password ? req.body.password : user_data.password,
                        username: req.body.username ? req.body.username : user_data.username,
                        email: req.body.email ? req.body.email : user_data.email,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                        is_admin: req.body.is_admin ? req.body.is_admin : user_data.is_admin,
                        modification_note: user_data.modification_note
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
