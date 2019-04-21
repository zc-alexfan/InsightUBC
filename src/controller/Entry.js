"use strict";
var Entry = (function () {
    function Entry(dept, id, avg, instr, title, pass, fail, audit, section, year, uuid, sectionSize) {
        this.courses_dept = dept;
        this.courses_id = id;
        this.courses_avg = avg;
        this.courses_instructor = instr;
        this.courses_title = title;
        this.courses_pass = pass;
        this.courses_fail = fail;
        this.courses_audit = audit;
        this.courses_section = section;
        this.courses_year = year;
        this.courses_uuid = uuid;
        this.courses_sectionSize = sectionSize;
    }
    Entry.prototype.isValid = function () {
        var flag = false;
        if (this.courses_uuid && this.courses_dept && this.courses_id
            && (this.courses_avg || this.courses_avg === 0)
            && (this.courses_pass || this.courses_pass === 0)
            && (this.courses_fail || this.courses_fail === 0)
            && (this.courses_audit || this.courses_audit === 0)
            && (this.courses_instructor || this.courses_instructor === "")
            && (this.courses_title || this.courses_title === "")
            && this.courses_section) {
            if ((!isNaN(this.courses_avg) && this.courses_avg <= 100 && this.courses_avg >= 0)
                && (!isNaN(this.courses_audit) && this.courses_audit >= 0)
                && (!isNaN(this.courses_fail) && this.courses_fail >= 0)
                && (!isNaN(this.courses_pass) && this.courses_pass >= 0)
                && (!isNaN(this.courses_year) && this.courses_year >= 1900)) {
                flag = true;
            }
        }
        return flag;
    };
    return Entry;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entry;
//# sourceMappingURL=Entry.js.map