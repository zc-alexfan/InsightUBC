"use strict";
var Section = (function () {
    function Section(id, size, section_id, num_sections) {
        this.course_name = id;
        this.size = size;
        this.section_id = section_id;
        this.num_section = num_sections;
    }
    ;
    Section.prototype.getsize = function () {
        return this.size;
    };
    Section.prototype.getid = function () {
        return this.course_name + ' ['
            + this.section_id + '/' + this.num_section + ']<br/>size: ' + this.size;
    };
    Section.prototype.getidOnly = function () {
        return this.course_name + ' ('
            + this.section_id + '/' + this.num_section + ')[' + this.size + ']';
    };
    Section.prototype.getMySection = function () {
        return this.section_id;
    };
    Section.prototype.getNumSections = function () {
        return this.num_section;
    };
    Section.prototype.print = function () {
        console.log(this.getid() + " [" + this.getsize() + "]");
    };
    Section.sortBySize = function (items) {
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
    Section.constructVecSection = function (list) {
        var result = [];
        var s;
        list.forEach(function (courseJS) {
            var dept = courseJS['courses_dept'];
            var id = courseJS['courses_id'];
            var size = courseJS['maxsectionsize'];
            var num_sec = Math.ceil(parseInt(courseJS['numsection2014']) / 3);
            for (var i = 1; i <= num_sec; i++) {
                s = new Section(dept + id, parseInt(size), i, num_sec);
                result.push(s);
            }
        });
        return result;
    };
    return Section;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Section;
//# sourceMappingURL=Section.js.map