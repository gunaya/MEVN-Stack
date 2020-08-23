import { Application, Request, Response } from 'express';
import { AuthController } from "../controller/authController";

export class AuthRoutes {
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        app.post('/api/login', (req: Request, res: Response) => {
            this.auth_controller.login(req, res);
        });
    }
}