"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/posts/service");
const service_3 = require("../modules/users/service");
class PostController {
    constructor() {
        this.post_service = new service_2.default();
        this.user_service = new service_3.default();
    }
    create_post(req, res) {
        if (req.body.post) {
            const post_params = {
                post: req.body.post,
                modification_note: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New Post Created'
                    }]
            };
            this.post_service.createPost(post_params, (err, post_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    this.user_service.updatePost(req.body.user_id, post_data._id, (err) => {
                        service_1.successResponse('add post successfully', null, res);
                    });
                }
            });
        }
    }
}
exports.PostController = PostController;
