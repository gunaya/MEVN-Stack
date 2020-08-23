"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const environment_1 = require("../environment");
// route import
const test_routes_1 = require("../routes/test_routes");
const common_routes_1 = require("../routes/common_routes");
const user_routes_1 = require("../routes/user_routes");
const post_routes_1 = require("../routes/post_routes");
const auth_routes_1 = require("../routes/auth_routes");
class App {
    constructor() {
        // this.mongoUrl = 'mongodb://localhost/' + environment_1.default.getDBName();
        this.mongoUrl = 'mongodb+srv://gunaya:88888888@cluster0.wsbmk.mongodb.net/' + environment_1.default.getDBName();
        this.test_routes = new test_routes_1.TestRoutes();
        this.user_routes = new user_routes_1.UserRoutes();
        this.post_routes = new post_routes_1.PostRoutes();
        this.auth_routes = new auth_routes_1.AuthRoutes();
        this.common_routes = new common_routes_1.CommonRoutes(); //last
        this.app = express();
        this.config();
        this.mongoSetup();
        this.test_routes.route(this.app);
        this.user_routes.route(this.app);
        this.post_routes.route(this.app);
        this.auth_routes.route(this.app);
        this.common_routes.route(this.app); //last
    }
    config() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}
exports.default = new App().app;
