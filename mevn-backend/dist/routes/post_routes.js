"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const checkAuth_1 = require("../middleware/checkAuth");
const postController_1 = require("../controller/postController");
class PostRoutes {
    constructor() {
        this.post_controller = new postController_1.PostController();
    }
    route(app) {
        app.post('/api/post', [checkAuth_1.checkAuth], (req, res) => {
            this.post_controller.create_post(req, res);
        });
    }
}
exports.PostRoutes = PostRoutes;
