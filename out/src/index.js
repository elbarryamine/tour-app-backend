"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema"));
const dotenv = __importStar(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const tours_1 = __importDefault(require("./router/tours"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv.config();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({
        data: 'Working',
    });
});
app.use(tours_1.default);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true,
    customFormatErrorFn: (err) => {
        return {
            message: err.message,
        };
    },
}));
process.on('unhandledRejection', (err) => {
    console.error(err.message);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
