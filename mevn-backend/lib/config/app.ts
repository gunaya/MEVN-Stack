import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import environment from '../environment';
// route import
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { UserRoutes } from '../routes/user_routes';

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

    private test_routes: TestRoutes = new TestRoutes();
    private user_routes: UserRoutes = new UserRoutes();
    private common_routes: CommonRoutes = new CommonRoutes(); //last

    constructor() {
        this.app = express();
        this.app.use(cors())
        this.config();
        this.mongoSetup();

        this.test_routes.route(this.app);
        this.user_routes.route(this.app);
        this.common_routes.route(this.app); //last
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}

export default new App().app;
