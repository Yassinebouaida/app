"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = exports.UserResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let UserResponse = class UserResponse {
};
exports.UserResponse = UserResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.UserType),
    __metadata("design:type", String)
], UserResponse.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "isVerified", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "avatar", void 0);
exports.UserResponse = UserResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UserResponse);
let AuthResponse = class AuthResponse {
};
exports.AuthResponse = AuthResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserResponse),
    __metadata("design:type", UserResponse)
], AuthResponse.prototype, "user", void 0);
exports.AuthResponse = AuthResponse = __decorate([
    (0, graphql_1.ObjectType)()
], AuthResponse);
//# sourceMappingURL=auth.response.js.map