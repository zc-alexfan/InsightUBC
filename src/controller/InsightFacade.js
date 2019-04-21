"use strict";
var Query_1 = require("./Query");
var Util_1 = require("../Util");
var IOProcessing_1 = require("./IOProcessing");
var TransformQuery_1 = require("./TransformQuery");
var InsightFacade = (function () {
    function InsightFacade() {
        this.universe = {};
        this.db = new IOProcessing_1.default();
        this.universe = [];
        Util_1.default.trace('InsightFacadeImpl::init()');
    }
    InsightFacade.prototype.putData = function (id, data) {
        this.universe[id] = data;
    };
    InsightFacade.prototype.showSomeData = function (n, id) {
        if (Object.keys(this.universe).indexOf(id) == -1) {
            return;
        }
        var data = this.universe[id];
        n = Math.min(n, data.length);
        for (var i = 0; i < n; i++) {
            Query_1.default.prettyPrint(data[i]);
        }
    };
    InsightFacade.prototype.mainQuery = function (masterQuery, currentDataset) {
        var filter = masterQuery["WHERE"];
        var options = masterQuery["OPTIONS"];
        var transformation = masterQuery["TRANSFORMATIONS"];
        var ids = Query_1.default.queryIDs(filter, currentDataset);
        var result = Query_1.default.queryFormalizer(ids, currentDataset, options, transformation);
        result = TransformQuery_1.default.transform(result, transformation, options);
        var order = masterQuery.OPTIONS.ORDER;
        console.log(order);
        if (order && typeof order === "string") {
            result["result"] = Query_1.default.sortByKey(result["result"], order, true);
        }
        else if (order) {
            var dir = void 0;
            if (order && order["dir"] === "UP") {
                dir = true;
            }
            else {
                dir = false;
            }
            result["result"] = Query_1.default.sortByMultipleKey(result["result"], order["keys"], dir);
        }
        return result;
    };
    InsightFacade.prototype.performQuery = function (query) {
        console.log("**********Query START********");
        var that = this;
        return new Promise(function (fulfill, reject) {
            var str = JSON.stringify(query);
            var qDriver = new Query_1.default();
            var errMsg = qDriver.isValid(str);
            if (errMsg != null) {
                if (errMsg.includes('{"missing":[')) {
                    console.log("here");
                    var r_1 = { code: 424, body: JSON.parse(errMsg) };
                    return reject(r_1);
                }
                var error = { 'error': errMsg };
                var r = { code: 400, body: error };
                return reject(r);
            }
            var id = that.getDependencyID(query);
            var currentDataset;
            if (that.universe[id]) {
                currentDataset = that.universe[id];
                var result = that.mainQuery(query, currentDataset);
                var r = { code: 200, body: result };
                console.log("**********Query END********");
                return fulfill(r);
            }
            else {
                InsightFacade.addCacheDataset(id, that)
                    .then(function () {
                    currentDataset = that.universe[id];
                    var result = that.mainQuery(query, currentDataset);
                    var r = { code: 200, body: result };
                    console.log("**********Query END********");
                    return fulfill(r);
                })
                    .catch(function () {
                    var r = { code: 424, body: { "missing:": id } };
                    return reject(r);
                });
            }
        });
    };
    InsightFacade.prototype.getDependencyID = function (query) {
        var arr = query["OPTIONS"]["COLUMNS"];
        if (query["TRANSFORMATIONS"]) {
            arr = arr.concat(query["TRANSFORMATIONS"]["GROUP"]);
        }
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var e = arr_1[_i];
            if (/^courses_/g.test(e)) {
                return "courses";
            }
            else if (/^rooms_/g.test(e)) {
                return "rooms";
            }
        }
    };
    InsightFacade.addCacheDataset = function (cache_id, that) {
        return new Promise(function (fulfill, reject) {
            IOProcessing_1.default.readFilePromise('./cache/' + cache_id, 'utf8').then(function (data) {
                var js = JSON.parse(data);
                that.putData(cache_id, js);
                fulfill(true);
            }).catch(function () {
                reject(false);
            });
        });
    };
    InsightFacade.prototype.addDataset = function (id, content) {
        var res;
        var fs = require('fs');
        var replyMsg = "";
        var code_number = 0;
        var that = this;
        return new Promise(function (fulfill, reject) {
            if (id == null || id == undefined || id == "") {
                replyMsg = 'id cannot be empty';
                res = { code: 400, body: { "error": replyMsg } };
                reject(res);
            }
            else if (content == null || content == undefined || content == "") {
                replyMsg = 'content cannot be empty';
                res = { code: 400, body: { "error": replyMsg } };
                reject(res);
            }
            else {
                if (that.db.isExistId(id)) {
                    code_number = 201;
                }
                else {
                    code_number = 204;
                }
                that.db.loadDataFromBuffer(id, content)
                    .then(function (response) {
                    that.universe[id] = response;
                    res = { code: code_number, body: {} };
                    fulfill(res);
                })
                    .catch(function (err) {
                    code_number = 400;
                    res = { code: 400, body: { "error": err.message } };
                    reject(res);
                });
            }
        });
    };
    InsightFacade.prototype.removeDataset = function (id) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            var replyMsg = "";
            var code = 0;
            var res;
            if (id == null || id == undefined || id == "") {
                replyMsg = 'id cannot be empty';
                res = { code: 404, body: { "error": replyMsg } };
                reject(res);
            }
            else if (!that.db.isExistId(id)) {
                code = 404;
                replyMsg = "Cannot delete, the id \"" + id + "\" does not exist";
                res = { code: 404, body: { "error": replyMsg } };
                reject(res);
            }
            else {
                code = 204;
                that.db.removeFileFromDisk(id)
                    .then(function () {
                    that.universe[id] = null;
                    res = { code: code, body: {} };
                    fulfill(res);
                });
            }
        });
    };
    return InsightFacade;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InsightFacade;
//# sourceMappingURL=InsightFacade.js.map