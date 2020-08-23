"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const userController_1 = require("../controller/userController");
const checkAuth_1 = require("../middleware/checkAuth");
class UserRoutes {
    constructor() {
        this.user_controller = new userController_1.UserController();
    }
    route(app) {
        app.post('/api/user', [checkAuth_1.checkAuth], (req, res) => {
            this.user_controller.create_user(req, res);
        });
        app.get('/api/user/all', [checkAuth_1.checkAuth], (req, res) => {
            this.user_controller.list_user(req, res);
        });
        app.get('/api/user/:id', [checkAuth_1.checkAuth], (req, res) => {
            this.user_controller.get_user(req, res);
        });
        app.put('/api/user/:id', [checkAuth_1.checkAuth], (req, res) => {
            this.user_controller.update_user(req, res);
        });
        app.delete('/api/user/:id', [checkAuth_1.checkAuth], (req, res) => {
            this.user_controller.delete_user(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
