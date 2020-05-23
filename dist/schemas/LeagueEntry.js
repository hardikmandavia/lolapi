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
let LeagueEntry = /** @class */ (() => {
    let LeagueEntry = class LeagueEntry {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "leagueId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "summonerId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "summonerName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "queueType", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "tier", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "rank", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "leaguePoints", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "wins", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "losses", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "hotStreak", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "veteran", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "freshBlood", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "inactive", void 0);
    LeagueEntry = __decorate([
        type_graphql_1.ObjectType()
    ], LeagueEntry);
    return LeagueEntry;
})();
exports.default = LeagueEntry;
//# sourceMappingURL=LeagueEntry.js.map