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
const type_graphql_1 = require("type-graphql");
const LeagueEntry_1 = require("./LeagueEntry");
let Summoner = /** @class */ (() => {
    let Summoner = class Summoner {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "accountId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "puuid", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "profileIconId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "revisionDate", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "summonerLevel", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "region", void 0);
    __decorate([
        type_graphql_1.Field(type => [LeagueEntry_1.default]),
        __metadata("design:type", Array)
    ], Summoner.prototype, "ranked", void 0);
    Summoner = __decorate([
        type_graphql_1.ObjectType()
    ], Summoner);
    return Summoner;
})();
exports.default = Summoner;
//# sourceMappingURL=Summoner.js.map