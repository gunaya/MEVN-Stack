import { Request, Response } from "express";
import { insufficientParameters, mongoError, successResponse, failureResponse } from "../modules/common/service";
import { IPost } from "../modules/posts/model";
import PostService from '../modules/posts/service';
import UserService from '../modules/users/service';
import e = require('express');
import { json } from "body-parser";

export class PostController {
    private post_service: PostService = new PostService();
    private user_service: UserService = new UserService();

    public create_post(req: Request, res: Response){
        if(req.body.post){
            const post_params: IPost = {
                post: req.body.post,
                modification_note: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New Post Created'
                }]
            };

            this.post_service.createPost(post_params, (err: any, post_data: IPost) => {
                if(err){
                    mongoError(err, res);
                } else {
                    this.user_service.updatePost(req.body.user_id, post_data._id, (err: any) => {
                        successResponse('add post successfully', null, res);
                    });
                }
            });
        }
    }
}