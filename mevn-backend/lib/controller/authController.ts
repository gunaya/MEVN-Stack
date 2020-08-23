import { Request, Response } from "express";
import { insufficientParameters, mongoError, successResponse, failureResponse } from "../modules/common/service";
import { IUser } from "../modules/users/model";
import UserService from "../modules/users/service";
import e = require('express');
import { json } from "body-parser";
import * as bycript from 'bcrypt';
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export class AuthController {
    private user_service: UserService = new UserService();

    public login(req: Request, res: Response){
        if(req.body.username && req.body.password){
            const user_filter = { username: req.body.username };
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if(err) {
                    mongoError(err, res);
                } else {
                    const cekPass = bycript.compareSync(req.body.password, user_data['password']);
                    if(cekPass){

                        const token = jwt.sign(
                            { userId: user_data._id, username: user_data.username },
                            config.jwtSecret,
                            { expiresIn: '1h' }
                        )

                        // user_data['token'] = token;
                        res.send({ user: user_data, token: token})

                        // successResponse('login successfully', user_data, res);
                    } else {
                        failureResponse('invalid user', null, res);
                    }
                }
            })

        } else {
            insufficientParameters(res);
        }
    }
}