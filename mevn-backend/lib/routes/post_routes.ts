import { Application, Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";
import { PostController } from "../controller/postController";

export class PostRoutes {
    private post_controller: PostController = new PostController();

    public route(app: Application) {
        app.post('/api/post', [checkAuth], (req: Request, res: Response) => {
            this.post_controller.create_post(req, res);
        });
    }
}