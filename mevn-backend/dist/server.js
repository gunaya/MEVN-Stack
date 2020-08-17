"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const environment_1 = require("./environment");
const PORT = process.env.PORT || 3000
app_1.default.listen(process.env.PORT || 3000);
