"use strict";
var IOProcessing_1 = require("./IOProcessing");
var Query = (function () {
    function Query() {
        this.missingDependencies = [];
        this.isUniqueID = true;
        this.uniqueID = "";
        this.validNumberKey = ["rooms_lat", "rooms_lon", "rooms_seats", "courses_avg", "courses_pass", "courses_fail", "courses_audit", "courses_year", "courses_sectionSize"];
        this.validStringKey = ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_name", "rooms_address", "rooms_type", "rooms_furniture", "rooms_href", "courses_dept", "courses_id", "courses_instructor", "courses_title", "courses_uuid"];
        this.columnKeys = new Set([]);
    }
    Query.prettyPrint = function (json) {
        var js = JSON.stringify(json, null, 2);
        console.log("***" + js + "***");
    };
    Query.grab = function (key, val, list, satisfyCond) {
        var valList = list.map(function (js) {
            return js[key];
        });
        var ids = new Set();
        for (var i = 0; i < list.length; i++) {
            if (satisfyCond(valList[i], val))
                ids.add(i);
        }
        return ids;
    };
    Query.queryFormalizer = function (ids, universe, options, transformation) {
        var entries = [];
        ids.forEach(function (x) {
            entries.push(universe[x]);
        });
        var cols = options["COLUMNS"];
        if (transformation) {
            cols = cols.concat(transformation["GROUP"]);
        }
        var columnizedEntries = [];
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var x = entries_1[_i];
            var tmp = {};
            for (var _a = 0, cols_1 = cols; _a < cols_1.length; _a++) {
                var k = cols_1[_a];
                if (x.hasOwnProperty(k)) {
                    tmp[k] = x[k];
                }
                else {
                    tmp[k] = x;
                }
            }
            columnizedEntries.push(tmp);
        }
        var renderVar = options["FORM"];
        var r;
        r = { render: renderVar, result: columnizedEntries };
        return r;
    };
    Query.sortByMultipleKey = function (columnizedEntries, order, dir) {
        var sortedEntries;
        var sets = new Set();
        var index = 0;
        var map = new Map();
        var key = order[index];
        if (order && order instanceof Array && order.length == 0) {
            return columnizedEntries;
        }
        sortedEntries = Query.sortByKey(columnizedEntries, key, dir);
        order = order.slice(1);
        if (order.length == 0) {
            return sortedEntries;
        }
        for (var _i = 0, sortedEntries_1 = sortedEntries; _i < sortedEntries_1.length; _i++) {
            var item = sortedEntries_1[_i];
            if (sets.has(item[key])) {
                var arr = map.get(item[key]);
                arr.push(item);
                map.set(item[key], arr);
            }
            else {
                sets.add(item[key]);
                var arr = [];
                arr.push(item);
                map.set(item[key], arr);
            }
        }
        var new_sorted = [];
        var ite = map.values();
        var chunk = ite.next().value;
        while (chunk != undefined) {
            chunk = Query.sortByMultipleKey(chunk, order, dir);
            new_sorted = new_sorted.concat(chunk);
            chunk = ite.next().value;
        }
        return new_sorted;
    };
    ;
    Query.debugPrint = function (str) {
    };
    Query.sortByKey = function (array, key, ascend) {
        if (key === undefined) {
            return array;
        }
        var lower = -1;
        var upper = 1;
        if (!ascend) {
            lower = 1;
            upper = -1;
        }
        var result = array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? lower : ((x > y) ? upper : 0));
        });
        return result;
    };
    Query.queryIDs = function (filter, currentDataset) {
        if (JSON.stringify(filter).trim() === "{}") {
            var universeIDs = Array.from(Array(currentDataset.length).keys());
            var universeSet = new Set(universeIDs);
            return universeSet;
        }
        var new_set = new Set();
        var keys = Object.keys(filter);
        var k = keys[0];
        var opened = filter[k];
        if (k == "IS" || k == "GT" || k == "LT" || k == "EQ") {
            var cond_key = Object.keys(opened)[0];
            var cond_val = opened[cond_key];
            new_set = Query.grab(cond_key, cond_val, currentDataset, Query.NODES[k]);
        }
        if (k == "AND" || k == "OR") {
            var set = Query.queryIDs(opened[0], currentDataset);
            for (var i = 1; i < opened.length; i++) {
                if (Object.keys(opened[i]).length > 0) {
                    set = Query.NODES[k](set, Query.queryIDs(opened[i], currentDataset));
                }
            }
            new_set = set;
        }
        if (k == "NOT") {
            var set = Query.queryIDs(opened, currentDataset);
            var universeIDs = Array.from(Array(currentDataset.length).keys());
            var universeSet = new Set(universeIDs);
            new_set = Query.minus(universeSet, set);
        }
        return new_set;
    };
    Query.prototype.isValid = function (query) {
        var msg = null;
        this.uniqueID = "";
        this.isUniqueID = true;
        if (query == null) {
            return "Query cannot be null";
        }
        try {
            var q = JSON.parse(query);
            if ((Object.keys(q).length == 2 && q.hasOwnProperty('WHERE') && q.hasOwnProperty('OPTIONS'))
                || (Object.keys(q).length == 3 && q.hasOwnProperty('WHERE') && q.hasOwnProperty('OPTIONS')
                    && q.hasOwnProperty("TRANSFORMATIONS"))) {
                var filter = JSON.stringify(q['WHERE']);
                var options = JSON.stringify(q['OPTIONS']);
                var transformation = q['TRANSFORMATIONS'];
                if (transformation) {
                    msg = this.isValidTransformation(transformation, q["OPTIONS"]);
                }
                else {
                    msg = this.isValidFilter(filter) || this.isValidOptions(options);
                }
            }
            else {
                msg = "Query must have only two keys 'WHERE' and 'OPTIONS' ";
            }
        }
        catch (err) {
            msg = "Invalid JSON";
        }
        finally {
            if (this.missingDependencies.length != 0) {
                var js = { "missing": this.missingDependencies };
                msg = JSON.stringify(js);
                this.missingDependencies = [];
            }
            return msg;
        }
    };
    Query.prototype.isValidOptions = function (options) {
        var msg = null;
        if (options == null) {
            return "Query OPTIONS cannot be null";
        }
        try {
            var q = JSON.parse(options);
            var len = Object.keys(q).length;
            if (len >= 2 && len <= 3 && (q.hasOwnProperty('COLUMNS') && q.hasOwnProperty('FORM'))) {
                var columns = q['COLUMNS'];
                var view = q['FORM'];
                if (!(columns instanceof Array)) {
                    msg = "COLUMNS must be an array of keys";
                }
                else if (columns.length == 0) {
                    console.log(columns);
                    msg = "COLUMNS must contain something keys";
                }
                else if (columns.length == 1) {
                    if (!Query.isValidKey(columns[0]) || this.isValidKeyFilter(columns[0], true) == 400) {
                        if (this.isUniqueID) {
                            msg = "COLUMNS must contain at least 1 valid key";
                        }
                    }
                }
                else {
                    for (var i in columns) {
                        if (columns.hasOwnProperty(i)) {
                            var s = columns[i];
                            if (!Query.isValidKey(s)) {
                                return s + " is an invalid key";
                            }
                        }
                    }
                    if (columns.length > 0) {
                        var j = columns[0].indexOf('_');
                        var id = columns[0].substring(0, j);
                        for (var i in columns) {
                            if (columns.hasOwnProperty(i)) {
                                var nextId = columns[i].substring(0, j);
                                if (id != nextId) {
                                    msg = "Cannot query from multiple datasets at once";
                                    break;
                                }
                            }
                        }
                    }
                }
                if (view !== 'TABLE') {
                    msg = "Must contain phrase: FORM: TABLE";
                }
                if (len == 3) {
                    if (q.hasOwnProperty('ORDER')) {
                        var key = q['ORDER'];
                        if (key["dir"] && key["keys"]) {
                            if (!(key["dir"] == "UP" || key["dir"] == "DOWN")) {
                                return "ORDER dir must be UP or DOWN";
                            }
                            if (!(key["keys"] instanceof Array)) {
                                return "ORDER keys must be an array";
                            }
                            if (key["keys"].length == 0) {
                                return "ORDER keys must contain 1 key at least";
                            }
                            for (var _i = 0, _a = key["keys"]; _i < _a.length; _i++) {
                                var i = _a[_i];
                                if (columns.indexOf(i) == -1) {
                                    return "ORDER keys must be from columns";
                                }
                            }
                        }
                        else if (typeof key == "string") {
                            if (columns.indexOf(key) == -1) {
                                msg = "ORDER key must be in columns";
                            }
                        }
                        else {
                            console.log(columns);
                            console.log(key);
                            msg = "ORDER must contain a valid key";
                        }
                    }
                    else {
                        msg = "ORDER is the only optional key in OPTIONS";
                    }
                }
            }
            else {
                msg = "OPTIONS can only have certain keys";
            }
        }
        catch (err) {
            msg = "Invalid JSON ORDER";
        }
        return msg;
    };
    Query.prototype.isMComparison = function (innerQ) {
        var msg = null;
        if (innerQ == null) {
            return "Query filter cannot be null";
        }
        var key = Object.keys(innerQ)[0];
        if (Object.keys(innerQ).length !== 1) {
            msg = "Filter MCOMPARISON should contain 1 key";
        }
        else if (innerQ.length != undefined) {
            msg = "Filter MCOMPARISON key's content should not be nested";
        }
        else if (!Query.isValidKey(key) || this.isValidKeyFilter(key, true) == 400) {
            if (this.isUniqueID) {
                msg = "MCOMPARISON should be against a valid key";
            }
            else {
                msg = "Cannot query from multiple datasets";
            }
        }
        else if (this.validNumberKey.indexOf(key) == -1) {
            msg = "Math Comparator requires a number key";
        }
        if (isNaN(innerQ[key]) || typeof innerQ[key] == "string") {
            msg = "MCOMPARISON must be against a number";
        }
        if (innerQ[key] == null) {
            msg = "MCOMPARISON must have content, cannot be null, or undefined";
        }
        return msg;
    };
    Query.prototype.isSComparison = function (innerQ) {
        var msg = null;
        if (innerQ == null) {
            return "Query filter cannot be null";
        }
        var key = Object.keys(innerQ)[0];
        if (Object.keys(innerQ).length !== 1) {
            msg = "Filter SCOMPARISON should contain 1 key";
        }
        else if (innerQ.length != undefined) {
            msg = "Filter SCOMPARISON key's content should not be nested";
        }
        else if (!Query.isValidKey(key) || this.isValidKeyFilter(key, true) == 400) {
            if (this.isUniqueID) {
                msg = "SCOMPARISON should be against a valid key";
            }
            else {
                msg = "Cannot query from multiple datasets";
            }
        }
        else if (typeof innerQ[key] !== 'string') {
            msg = "SCOMPARISON expecting a string to compare with";
        }
        else if (this.validStringKey.indexOf(key) == -1) {
            msg = "String Comparator requires a string key";
        }
        else if (!innerQ[key]) {
            msg = "SCOMPARISON must have content, cannot be null, or undefined";
        }
        else {
            var pattern = innerQ[key];
            var numAstericks = (pattern.match(/\*/g) || []).length;
            if ((numAstericks == 0)
                || (numAstericks == 1 && (/^\*[\S|\s]*/g.test(pattern) || /[\S|\s]*\*$/g.test(pattern)))
                || (numAstericks == 2 && (/^\*[\S|\s]*\*$/g.test(pattern)))) {
                msg = null;
            }
            else {
                msg = "SCOMPARISON string can only be of format [*]?string[*]?";
            }
        }
        return msg;
    };
    Query.isValidKey = function (s) {
        return (s.length > 2 && s.indexOf('_') > 1 && s.indexOf('_') < s.length - 1)
            && (s.match(/_/g) || []).length == 1;
    };
    Query.prototype.isValidKeyFilter = function (s, needDependency) {
        var i = s.indexOf('_');
        var key = s.substring(i + 1);
        var id = s.substring(0, i);
        var io = new IOProcessing_1.default();
        if (!io.isExistId(id) && needDependency) {
            if (this.missingDependencies.indexOf(id) == -1) {
                this.missingDependencies.push(id);
            }
            return 424;
        }
        if (this.uniqueID == "") {
            this.uniqueID = id;
        }
        else {
            if (this.uniqueID != id) {
                this.isUniqueID = false;
                return 400;
            }
        }
        if (id == "courses" && (key == 'dept' || key == 'id' || key == 'avg' || key == 'instructor'
            || key == 'title' || key == 'pass' || key == 'fail' || key == 'audit'
            || key == 'uuid' || key == 'year' || key == "sectionSize")) {
            return 0;
        }
        else if (id == "rooms" && ((key == "fullname") || (key == "shortname") || (key == "number")
            || (key == "name") || (key == "address") || (key == "lat") || (key == "lon")
            || (key == "seats") || (key == "type") || (key == "furniture") || (key == "href"))) {
            return 0;
        }
        else {
            return 400;
        }
    };
    Query.prototype.isValidFilter = function (filter) {
        var msg = null;
        if (filter == null) {
            return "Query filter cannot be null";
        }
        if (filter === "{}") {
            return null;
        }
        try {
            var q = JSON.parse(filter);
            var keys = Object.keys(q);
            if (keys.length === 1) {
                if (q.hasOwnProperty('LT') || q.hasOwnProperty('GT') || q.hasOwnProperty('EQ')) {
                    msg = this.isMComparison(q[keys[0]]);
                }
                else if (q.hasOwnProperty('AND') || q.hasOwnProperty('OR')) {
                    var filterList = q[keys[0]];
                    if (!(filterList instanceof Array)) {
                        msg = "LOGICCOMPARISON should contain an array of filters";
                    }
                    else if (filterList instanceof Array && filterList.length == 0) {
                        msg = "LOGICCOMPARISON should contain an array of filters";
                    }
                    else {
                        for (var i in filterList) {
                            if (filterList.hasOwnProperty(i)) {
                                if (msg != null) {
                                    break;
                                }
                                msg = msg || this.isValidFilter(JSON.stringify(filterList[i]));
                            }
                        }
                    }
                }
                else if (q.hasOwnProperty('NOT')) {
                    msg = this.isValidFilter(JSON.stringify(q[keys[0]]));
                }
                else if (q.hasOwnProperty('IS')) {
                    msg = this.isSComparison(q[keys[0]]);
                }
                else {
                    msg = "Unexpected key in Filter";
                }
            }
            else {
                msg = "FILTER should have 1 key";
            }
        }
        catch (err) {
            msg = "Invalid JSON";
        }
        return msg;
    };
    Query.prototype.checkListOfValidNumberKey = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            if (this.validNumberKey.indexOf(i) == -1) {
                return false;
            }
        }
        return true;
    };
    Query.prototype.isValidTransformation = function (trans, options) {
        if (!options) {
            return "there must be OPTIONS";
        }
        else if (!options.COLUMNS || !options.FORM
            || options.FORM != "TABLE") {
            return "options must have columns and view";
        }
        if (!(options.COLUMNS instanceof Array)) {
            return "options columns must be an array";
        }
        else {
            if (options.COLUMNS.length == 0) {
                return "columns cannot be empty";
            }
            for (var _i = 0, _a = options.COLUMNS; _i < _a.length; _i++) {
                var e = _a[_i];
                if (typeof e != "string") {
                    return "options columns must be string type";
                }
            }
        }
        var orderKeys = options.ORDER;
        if (orderKeys && typeof orderKeys === "string") {
            if (options.COLUMNS.indexOf(orderKeys) == -1) {
                return "ORDER keys need to be included in columns";
            }
        }
        else if (orderKeys) {
            if (orderKeys.dir && orderKeys.keys) {
                if (orderKeys.dir != "DOWN" && orderKeys.dir != "UP") {
                    return "ORDER dir can only be UP or DOWN";
                }
                if (!(orderKeys.keys instanceof Array)) {
                    return "ORDER keys must be instance of array";
                }
                if (orderKeys.keys.length == 0) {
                    return "ORDER keys must have at least 1 entry";
                }
                for (var _b = 0, _c = orderKeys.keys; _b < _c.length; _b++) {
                    var i = _c[_b];
                    if (options.COLUMNS.indexOf(i) == -1) {
                        return "ORDER keys need to be included in columns";
                    }
                }
            }
            else {
                return "ORDER keys D3 style must contain dir and keys";
            }
        }
        if (options.FORM != "TABLE") {
            return "FORM:TABLE must be present";
        }
        var columns = options["COLUMNS"];
        this.columnKeys = new Set(columns);
        var setGroupKeys = new Set();
        var setApplyKeys = new Set();
        var setApplyTokenKeys = new Set();
        if (!(Object.keys(trans).length == 2 && trans.hasOwnProperty("GROUP") && trans.hasOwnProperty("APPLY"))) {
            return "TRANSFORMATIONS must contain GROUP and APPLY";
        }
        var groupKeys = trans["GROUP"];
        if (!(groupKeys instanceof Array && groupKeys.length >= 1)) {
            return "GROUP must have 1 or more keys";
        }
        else {
            for (var i in groupKeys) {
                if (!Query.isValidKey(groupKeys[i])
                    || this.isValidKeyFilter(groupKeys[i], false) == 400) {
                    return "GROUP should only contain keys";
                }
                else {
                    setGroupKeys.add(groupKeys[i]);
                }
            }
        }
        var applykeyList = trans["APPLY"];
        if (!(applykeyList instanceof Array)) {
            return "APPLY must be an array";
        }
        else {
            for (var i in applykeyList) {
                var applyKey = applykeyList[i];
                var key = Object.keys(applyKey);
                if (key.length != 1) {
                    return "applykey should have 1 key only";
                }
                if (/_/g.test(key[0])) {
                    return "applykey cannot contain _ ";
                }
                if (setApplyKeys.has(key[0])) {
                    return "no two APPLY targets should have the same name";
                }
                else {
                    setApplyKeys.add(key[0]);
                }
                var applyTokenObject = applyKey[key[0]];
                key = Object.keys(applyTokenObject);
                if (key && key.length != 1) {
                    return "every applykey can only contain 1 applytoken";
                }
                var applyToken = key[0];
                if (!((applyToken === "MAX" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                    || (applyToken === "MIN" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                    || (applyToken === "AVG" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                    || (applyToken === "COUNT"
                        && (this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1
                            || this.validStringKey.indexOf(applyTokenObject[applyToken]) != -1))
                    || (applyToken === "SUM" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1))) {
                    return "applyToken must be one of 'MAX','MIN','AVG','COUNT','SUM','ADD', and the keys must be certain keys";
                }
                if (typeof applyTokenObject[applyToken] != "object") {
                    if (!Query.isValidKey(applyTokenObject[applyToken])
                        || this.isValidKeyFilter(applyTokenObject[applyToken], false) == 400) {
                        return "key in applyToken is invalid";
                    }
                    else {
                        setApplyTokenKeys.add(applyTokenObject[applyToken]);
                    }
                }
            }
            if (Query.intersect(setGroupKeys, setApplyKeys).size > 0) {
                return "keys in GROUP cannot be in APPLY";
            }
            var keysInGroupButNotInColumns = Query.difference(setGroupKeys, this.columnKeys);
            var first_diff = Query.difference(this.columnKeys, setGroupKeys);
            var diff = Query.difference(first_diff, setApplyKeys);
            if (diff.size != 0) {
                return "column keys must be in either group or apply";
            }
            return null;
        }
    };
    return Query;
}());
Query.union = function (set1, set2) {
    var set = new Set(set1);
    set2.forEach(function (x) {
        set.add(x);
    });
    return set;
};
Query.setToArray = function (set) {
    var A = [];
    set.forEach(function (x) {
        A.push(x);
    });
    return A;
};
Query.intersect = function (set1, set2) {
    var set = new Set();
    set1.forEach(function (x) {
        if (set2.has(x))
            set.add(x);
    });
    return set;
};
Query.difference = function (set1, set2) {
    var set = new Set();
    set1.forEach(function (x) {
        if (!set2.has(x))
            set.add(x);
    });
    return set;
};
Query.NODES = {
    "GT": function (x, y) {
        return x > y;
    },
    "EQ": function (x, y) {
        return x == y;
    },
    "LT": function (x, y) {
        return x < y;
    },
    "IS": function (x, pattern) {
        if (x == pattern)
            return true;
        if (x == undefined || pattern == undefined)
            return false;
        if (pattern[0] == '*' && pattern[pattern.length - 1] == '*') {
            pattern = '.' + pattern;
            pattern = pattern.substr(0, pattern.length - 1);
            pattern = pattern + '.*';
        }
        else if (pattern[0] == '*' && pattern[pattern.length - 1] != '*') {
            pattern = '.' + pattern;
            pattern = pattern + '$';
        }
        else if (pattern[0] != '*' && pattern[pattern.length - 1] == '*') {
            pattern = '^' + pattern;
            pattern = pattern.substr(0, pattern.length - 1);
            pattern = pattern + '.*';
        }
        else {
            return pattern == x;
        }
        var reg = new RegExp(pattern);
        var result = x.match(reg);
        return result != null;
    },
    "AND": function (set1, set2) {
        return Query.intersect(set1, set2);
    },
    "OR": function (set1, set2) {
        return Query.union(set1, set2);
    }
};
Query.minus = function (set1, set2) {
    var set = new Set();
    set1.forEach(function (x) {
        if (!set2.has(x)) {
            set.add(x);
        }
    });
    return set;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Query;
//# sourceMappingURL=Query.js.map