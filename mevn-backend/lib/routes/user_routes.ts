import { Application, Request, Response } from 'express';
import { UserController } from "../controller/userController";
import { checkAuth } from "../middleware/checkAuth";

export class UserRoutes {
    private user_controller: UserController = new UserController();

    public route(app: Application) {
        app.post('/api/user', [checkAuth], (req: Request, res: Response) => {
            this.user_controller.create_user(req, res);
        });

        app.get('/api/user/all', [checkAuth], (req: Request, res: Response) => {
            this.user_controller.list_user(req, res);
        });

        app.get('/api/user/:id', [checkAuth], (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        app.put('/api/user/:id', [checkAuth], (req: Request, res: Response) => {
            this.user_controller.update_user(req, res);
        });

        app.delete('/api/user/:id', [checkAuth], (req: Request, res: Response) => {
            this.user_controller.delete_user(req, res);
        });
    }
}