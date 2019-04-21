/**
 * Created by zfan on 2017-01-22.
 */

import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import Query from "../src/controller/Query"


let facade:InsightFacade = new InsightFacade();
let fs: any = require('fs');

/**
 * The following method will display 204 (new and succssful), 201 (old and successful), and 400 (error add)
 * in sequential order
 */
let input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 50 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "FORM":"TABLE" } }';
input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"m*" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';
let query:any = JSON.parse(input);
console.log("Query:\n");
Query.prettyPrint(query);
let queryRequest:QueryRequest = {body:input};

facade.performQuery(queryRequest).then(
    function(r:InsightResponse) {
        facade.showSomeData(7,'courses');
        let js:any = r.body;
        console.log("\n\n\nQuery Result:\n");
        Query.prettyPrint(js);

    }
).catch(
    function(err:any){ console.log(err); }
);
