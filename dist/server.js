"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./modules/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Library Management System API",
    });
});
app.listen(config_1.default.port, () => {
    console.log("Server is running on port 5000");
});
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(config_1.default);
            yield mongoose_1.default.connect(config_1.default.databse_url);
            console.log(`Database connected successfully ${5000}`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            console.error(`server error: ${server}`);
        }
    });
}
server();
