"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const graphql_1 = require("graphql");
const user_args_1 = require("./user.args");
exports.UserSchema = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => user_args_1.UserSchemaArgs,
});
