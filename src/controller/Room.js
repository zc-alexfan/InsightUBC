"use strict";
var Query_1 = require("./Query");
var Room = (function () {
    function Room(id, size) {
        this.index = [];
        this.index[0] = 1;
        this.index[1] = 1;
        this.schedule = [{}, {}];
        this.id = id;
        this.size = size;
    }
    ;
    Room.prototype.isFull = function () {
        return (this.index[Room.TYPE_MON] > Room.maxBlock[Room.TYPE_MON]
            && this.index[Room.TYPE_TUE] > Room.maxBlock[Room.TYPE_TUE]);
    };
    Room.prototype.insertSoft = function (course_id, type, demand_size) {
        if (type != Room.TYPE_MON && type != Room.TYPE_TUE)
            return false;
        if (this.index[type] > Room.maxBlock[type])
            return false;
        if (demand_size > this.size)
            return false;
        this.insertHard(course_id, type);
        return true;
    };
    Room.prototype.insertHard = function (course_id, type) {
        this.schedule[type]["" + this.index[type]] = course_id;
        this.index[type]++;
    };
    Room.prototype.printSchedule = function () {
        console.log("**>>>>>>" + this.getInfo());
        console.log("TYPE_MON");
        Query_1.default.prettyPrint(this.schedule[Room.TYPE_MON]);
        console.log("TYPE_TUE");
        Query_1.default.prettyPrint(this.schedule[Room.TYPE_TUE]);
        console.log("<<<<<<**\n");
    };
    Room.prototype.getInfo = function () {
        return (this.id + " [" + this.size + "]");
    };
    Room.prototype.getName = function () {
        return (this.id + " [" + this.size + "]");
    };
    Room.prototype.print = function () {
        console.log(this.getInfo());
    };
    Room.prototype.getMonSchedule = function () {
        var js = this.schedule[0];
        var keys = Object.keys(js);
        var result = {};
        keys.forEach(function (k) {
            var val = js[k];
            var ind = (parseInt(k) - 1) * 2 + 1;
            result['' + ind] = val;
        });
        return result;
    };
    Room.prototype.getTuesSchedule = function () {
        var js = this.schedule[1];
        var keys = Object.keys(js);
        var result = {};
        keys.forEach(function (k) {
            var val = js[k];
            var ind = (parseInt(k) - 1) * 3 + 1;
            result['' + ind] = val;
        });
        return result;
    };
    Room.prototype.getScore = function () {
        return Math.max(this.index[Room.TYPE_MON] - 1 - Room.maxBlock[Room.TYPE_MON], 0) +
            Math.max(this.index[Room.TYPE_TUE] - 1 - Room.maxBlock[Room.TYPE_TUE], 0);
    };
    Room.prototype.getsize = function () {
        return this.size;
    };
    Room.sortBySize = function (items) {
        var length = items.length;
        for (var i = 0; i < length - 1; i++) {
            var max = i;
            for (var j = i + 1; j < length; j++) {
                if (items[j].getsize() > items[max].getsize()) {
                    max = j;
                }
            }
            if (max != i) {
                var tmp = items[i];
                items[i] = items[max];
                items[max] = tmp;
            }
        }
        return items;
    };
    Room.constructVecRoom = function (list) {
        var result = [];
        var s;
        list.forEach(function (roomJS) {
            var name = roomJS['rooms_name'];
            var size = roomJS['rooms_seats'];
            s = new Room(name, parseInt(size));
            result.push(s);
        });
        return result;
    };
    return Room;
}());
Room.TYPE_MON = 0;
Room.TYPE_TUE = 1;
Room.maxBlock = [9, 6];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Room;
;
//# sourceMappingURL=Room.js.map