"use strict";
var Room_1 = require("./Room");
var Section_1 = require("./Section");
var Schedule = (function () {
    function Schedule() {
    }
    Schedule.vecPrint = function (vec) {
        vec.forEach(function (s) {
            s.print();
        });
    };
    Schedule.scheduleOneRoom = function (secs, oneRoom) {
        var MAX_SECTIONS_OF_COURSE = 15;
        var remain = [];
        for (var i = 0; i < secs.length; i++) {
            if (secs[i].getMySection() > MAX_SECTIONS_OF_COURSE) {
                remain.push(secs[i]);
                continue;
            }
            var good = oneRoom.insertSoft(secs[i].getid(), 0, secs[i].getsize());
            if (!good)
                good = oneRoom.insertSoft(secs[i].getid(), 1, secs[i].getsize());
            if (!good) {
                remain.push(secs[i]);
            }
        }
        return remain;
    };
    Schedule.scheduleAllRooms = function (secs, rooms) {
        var num_secs = secs.length;
        rooms = Room_1.default.sortBySize(rooms);
        secs = Section_1.default.sortBySize(secs);
        console.log(">>>>>>>>**");
        Schedule.vecPrint(rooms);
        console.log("\n");
        Schedule.vecPrint(secs);
        console.log("**<<<<<<<<");
        for (var i = 0; i < rooms.length; i++) {
            if (secs.length == 0)
                return [];
            secs = Schedule.scheduleOneRoom(secs, rooms[i]);
        }
        return secs;
    };
    Schedule.cost = function (soln, numCourses) {
        var count = 0;
        soln.forEach(function (x) {
            count += x.getScore();
        });
        return (count / numCourses);
    };
    return Schedule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Schedule;
//# sourceMappingURL=Schedule.js.map