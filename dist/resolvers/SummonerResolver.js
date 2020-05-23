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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Summoner_1 = require("../schemas/Summoner");
const League_1 = require("../riotApi/League");
const Summoner_2 = require("../riotApi/Summoner");
let default_1 = /** @class */ (() => {
    let default_1 = class default_1 {
        fetchSummoner(region, name) {
            return __awaiter(this, void 0, void 0, function* () {
                return Summoner_2.getSummonerByName(region, name)
                    .then((data) => (Object.assign(Object.assign({}, data), { region })))
                    .catch(e => console.log(e.message));
            });
        }
        ranked(summoner) {
            return League_1.getLeaguesBySummoner(summoner.region, summoner.id)
                .then((data) => data)
                .catch(e => console.log(e.message));
        }
    };
    __decorate([
        type_graphql_1.Query(returns => Summoner_1.default),
        __param(0, type_graphql_1.Arg('region')),
        __param(1, type_graphql_1.Arg('name')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], default_1.prototype, "fetchSummoner", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Summoner_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "ranked", null);
    default_1 = __decorate([
        type_graphql_1.Resolver(of => Summoner_1.default)
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=SummonerResolver.js.map