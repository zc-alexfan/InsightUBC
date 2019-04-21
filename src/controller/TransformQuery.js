"use strict";
var Query_1 = require("./Query");
var TransformQuery = (function () {
    function TransformQuery() {
    }
    TransformQuery.transform = function (json, transformation, options) {
        if (!(transformation)) {
            return json;
        }
        var columns = options["COLUMNS"];
        var newEntries;
        var diffSet = Query_1.default.difference(new Set(columns), new Set(transformation["GROUP"]));
        newEntries = TransformQuery.group(json["result"], transformation["GROUP"], Array.from(diffSet));
        var new_applies = [];
        for (var _i = 0, _a = transformation["APPLY"]; _i < _a.length; _i++) {
            var i = _a[_i];
            var key = Object.keys(i)[0];
            if (columns.indexOf(key) != -1) {
                new_applies.push(i);
            }
        }
        console.log("apply in transform:" + JSON.stringify(new_applies));
        newEntries = TransformQuery.apply(newEntries, new_applies);
        var new_columns = TransformQuery.reorder(transformation["GROUP"], transformation["APPLY"]);
        new_columns = Query_1.default.intersect(new Set(new_columns), new Set(columns));
        newEntries = TransformQuery.pickColumns(newEntries, Array.from(new_columns));
        json["result"] = newEntries;
        return json;
    };
    TransformQuery.reorder = function (groups, apply) {
        var new_cols = [];
        new_cols = new_cols.concat(groups);
        for (var _i = 0, apply_1 = apply; _i < apply_1.length; _i++) {
            var i = apply_1[_i];
            var k = Object.keys(i)[0];
            new_cols.push(k);
        }
        return new_cols;
    };
    TransformQuery.group = function (json, groupKeys, diffSet) {
        var groups = new Set();
        var count = 0;
        var map = new Map();
        var grouped_entries = [];
        for (var i in json) {
            var unique_key = "";
            for (var _i = 0, groupKeys_1 = groupKeys; _i < groupKeys_1.length; _i++) {
                var k = groupKeys_1[_i];
                unique_key += String(json[i][k]);
            }
            if (groups.has(unique_key)) {
                var index = map.get(unique_key);
                if (diffSet && diffSet.length > 0) {
                    for (var _a = 0, diffSet_1 = diffSet; _a < diffSet_1.length; _a++) {
                        var j = diffSet_1[_a];
                        var original = grouped_entries[index][j];
                        if (original) {
                            if (!(original instanceof Array)) {
                                var tmp = [];
                                tmp.push(original);
                                grouped_entries[index][j] = tmp;
                            }
                            grouped_entries[index][j].push(json[i][j]);
                        }
                    }
                }
            }
            else {
                map.set(unique_key, count);
                count++;
                groups.add(unique_key);
                grouped_entries.push(json[i]);
            }
        }
        return grouped_entries;
    };
    TransformQuery.apply = function (json, applyKeys) {
        var key = applyKeys[0];
        if (key == undefined) {
            return json;
        }
        var outer_key = Object.keys(key)[0];
        var tokenKeyPair = key[outer_key];
        var token = Object.keys(tokenKeyPair)[0];
        var inner_key = tokenKeyPair[token];
        var column = [];
        for (var i in json) {
            var inner_array = [];
            if (json[i][outer_key] instanceof Array) {
                for (var _i = 0, _a = json[i][outer_key]; _i < _a.length; _i++) {
                    var value = _a[_i];
                    inner_array.push(value[inner_key]);
                }
            }
            else {
                inner_array.push(json[i][outer_key][inner_key]);
            }
            json[i][outer_key] = TransformQuery.APPLY[token](inner_array);
        }
        return TransformQuery.apply(json, applyKeys.slice(1));
    };
    TransformQuery.pickColumns = function (list, columns) {
        var new_entries = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            var new_item = {};
            for (var _a = 0, columns_1 = columns; _a < columns_1.length; _a++) {
                var c = columns_1[_a];
                new_item[c] = item[c];
            }
            new_entries.push(new_item);
        }
        return new_entries;
    };
    return TransformQuery;
}());
TransformQuery.APPLY = {
    "MAX": function (list) {
        var max = list[0];
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var n = list_2[_i];
            if (n > max) {
                max = n;
            }
        }
        return max;
    },
    "MIN": function (list) {
        var min = list[0];
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var n = list_3[_i];
            if (n < min) {
                min = n;
            }
        }
        return min;
    },
    "AVG": function (list) {
        var sum = 0;
        for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
            var n = list_4[_i];
            n = n * 10;
            n = Number(n.toFixed(0));
            sum += n;
        }
        var avg = sum / list.length;
        avg = avg / 10;
        avg = Number(avg.toFixed(2));
        return avg;
    },
    "COUNT": function (list) {
        var set = new Set(list);
        return set.size;
    },
    "SUM": function (list) {
        var total = 0;
        for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
            var n = list_5[_i];
            total += n;
        }
        return total;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TransformQuery;
//# sourceMappingURL=TransformQuery.js.map