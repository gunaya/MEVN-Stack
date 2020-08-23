"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const authController_1 = require("../controller/authController");
class AuthRoutes {
    constructor() {
        this.auth_controller = new authController_1.AuthController();
    }
    route(app) {
        app.post('/api/login', (req, res) => {
            this.auth_controller.login(req, res);
        });
    }
}
exports.AuthRoutes = AuthRoutes;
