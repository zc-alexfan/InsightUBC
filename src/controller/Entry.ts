import {EntryInterface} from "./IInsightFacade";
/**
 * Created by Nyanko on 1/22/2017.
 */

//TODO: refactor to CourseEntry
export default class Entry implements EntryInterface {
    courses_dept: string;
    courses_id: string;
    courses_avg: number;
    courses_instructor: string;
    courses_title: string;
    courses_pass: number;
    courses_fail: number;
    courses_audit: number;
    courses_section: string;
    // courses_year: number; This key represents the year the course was offered. If the "Section":"overall" property is set, the year should be 1900 (we will not be using these in D3 or D4 and this will help get these sections out of the way).
    courses_year: number;
    courses_uuid: string;
    courses_sectionSize: number;

    constructor(dept:string,id:string,avg:number,instr:string,
                title:string,pass:number,fail:number,
                audit:number,section:string,year:number,uuid:string,sectionSize:number){
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

    /**
     * Checks if the values are valid entries
     */
    isValid() {
        //check to see if each value has a "truthy" value
        //but "truthy" value return false if it is 0 so the numbers are special case
        let flag:boolean = false;
        if (
            this.courses_uuid && this.courses_dept && this.courses_id
            && (this.courses_avg || this.courses_avg === 0)
            && (this.courses_pass || this.courses_pass === 0)
            && (this.courses_fail || this.courses_fail === 0)
            && (this.courses_audit || this.courses_audit === 0)
            && (this.courses_instructor || this.courses_instructor === "")
            && (this.courses_title || this.courses_title === "")
            && this.courses_section ){
            // console.log("got here");
            if ((!isNaN(this.courses_avg) && this.courses_avg <= 100 && this.courses_avg >= 0)
                && (!isNaN(this.courses_audit) &&this.courses_audit >= 0)
                && (!isNaN(this.courses_fail) && this.courses_fail >= 0)
                && (!isNaN(this.courses_pass) && this.courses_pass >= 0)
                && (!isNaN(this.courses_year) && this.courses_year >= 1900)){
                    flag = true;
            }
        }
        return flag;
    }
}