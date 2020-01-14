"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("mongodb"));
var url = 'mongodb://127.0.0.1:27017';
var dbName = 'sandbox';
var client = mongodb_1.default.connect(url, function (error, client) {
    var db = client.db('test');
    console.log(db);
});
