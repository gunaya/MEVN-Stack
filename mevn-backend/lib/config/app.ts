import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as helmet from "helmet";
import environment from '../environment';
// route import
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { UserRoutes } from '../routes/user_routes';
import { PostRoutes } from "../routes/post_routes";
import { AuthRoutes } from "../routes/auth_routes";

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

    // this.mongoUrl = 'mongodb+srv://gunaya:88888888@cluster0.wsbmk.mongodb.net/' + environment_1.default.getDBName();

    private test_routes: TestRoutes = new TestRoutes();
    private user_routes: UserRoutes = new UserRoutes();
    private post_routes: PostRoutes = new PostRoutes();
    private auth_routes: AuthRoutes = new AuthRoutes();
    private common_routes: CommonRoutes = new CommonRoutes(); //last

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        this.test_routes.route(this.app);
        this.user_routes.route(this.app);
        this.post_routes.route(this.app);
        this.auth_routes.route(this.app);
        this.common_routes.route(this.app); //last
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}

export default new App().app;
