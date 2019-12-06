"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LevelDB = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(date, val) {
        this.timestamp = date;
        this.value = val;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = LevelDB.LevelDB.open(dbPath);
    }
    MetricsHandler.prototype.getOne = function (key, callback) {
        if (key) {
            this.db.get(key, function (err, res) {
                if (err)
                    callback(err, null);
                else
                    callback(null, res);
            });
        }
        else
            callback(new Error("no key provided"), null);
    };
    MetricsHandler.prototype.get = function (callback) {
        var resdata = new Array();
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            resdata.push(data);
        })
            .on('error', function (err) {
            callback(err, []);
        })
            .on('close', function () {
            callback(null, resdata);
        })
            .on('end', function () {
            console.log('Stream ended');
        });
    };
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + m.timestamp, value: m.value });
        });
        stream.end();
    };
    MetricsHandler.prototype.delete = function (key, callback) {
        this.db.del(key, function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null, res);
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
