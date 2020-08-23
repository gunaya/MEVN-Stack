import { Request, Response } from "express";
import { insufficientParameters, mongoError, successResponse, failureResponse } from "../modules/common/service";
import { IUser } from "../modules/users/model";
import UserService from "../modules/users/service";
import e = require('express');
import { json } from "body-parser";
import * as bycript from 'bcrypt';

export class UserController {
    private user_service: UserService = new UserService();

    public create_user = async(req: Request, res: Response) => {
        if(req.body.name && req.body.name.first_name && req.body.name.last_name && req.body.username && req.body.email && req.body.phone_number && req.body.gender){
            const hashedPassword = await bycript.hash(req.body.password, 10)
            const user_params: IUser = {
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

            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                if(err) {
                    mongoError(err, res);
                } else {
                    successResponse('create user successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public list_user(req: Request, res: Response){
        this.user_service.listUser({}, (err: any, user_data: IUser) => {
            if(err) {
                mongoError(err, res);
            } else {
                successResponse('get all user successfully', user_data, res);
            }
        })
    }

    public get_user(req: Request, res: Response){
        if(req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if(err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user = async(req: Request, res: Response) => {
        if(req.params.id && req.body.name || req.body.name.first_name || req.body.name.last_name || req.body.username || req.body.email || req.body.phone_number || req.body.gender || req.body.is_admin){
            const user_filter = { _id: req.params.id };
            let hashedPassword = '';
            if(req.body.password){
                hashedPassword = await bycript.hash(req.body.password, 10)
            }
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if(err){
                    mongoError(err, res);
                } else if(user_data) {
                    user_data.modification_note.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User Updated'
                    });

                    const user_params: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            first_name: req.body.name.first_name? req.body.name.first_name : user_data.name.first_name,
                            last_name: req.body.name.last_name? req.body.name.last_name : user_data.name.last_name,
                        } : user_data.name,
                        password: req.body.password? hashedPassword : user_data.password,
                        username: req.body.username? req.body.username : user_data.username,
                        email: req.body.email? req.body.email : user_data.email,
                        gender: req.body.gender? req.body.gender : user_data.gender,
                        phone_number: req.body.phone_number? req.body.phone_number : user_data.phone_number,
                        is_admin: req.body.is_admin? req.body.is_admin : user_data.is_admin,
                        modification_note: user_data.modification_note,
                        posts: user_data.posts,
                    };

                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response){
        if(req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if(err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfully', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}