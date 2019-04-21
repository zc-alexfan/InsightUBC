/**
 * Created by zfan on 2017-01-30.
 */
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import Query from "../src/controller/Query"
let facade:InsightFacade = new InsightFacade();
let fs: any = require('fs');


let input = '{ "WHERE":{ "OR":[ { "IS":{ "courses_dept":"*th" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';

//print query
let query:any = JSON.parse(input); console.log("Query:\n"); Query.prettyPrint(query);

let queryRequest:QueryRequest = {body:input};

facade.performQuery(queryRequest).then(
    (r:InsightResponse)=> {
        let js: any = r.body;
        console.log("\n\n\nQuery Result:\n");
        Query.prettyPrint(js);
    }
).catch(
    (err:any)=>{
        console.log(err);
    }
);










