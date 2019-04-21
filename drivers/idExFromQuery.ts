/**
 * Created by zfan on 2017-01-30.
 */

import Query from "../src/controller/Query"
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";

let insight:InsightFacade = new InsightFacade();

//test cases with multiple ids in the query
//invalid query
let str = ' { "WHERE":{ "OR":[ { "AND":[ { "IS":{ "courses1_instructor":"ascher, uri michael" } }, { "OR":[ { "AND":[ { "GT":{ "courses2_avg":70 } }, { "GT":{"courses3_fail": 1} } ] }, { "GT":{ "courses4_avg":50 } } ] } ] }, { "IS":{ "courses5_instructor":"schmidt, mark"} } ] }, "OPTIONS":{ "COLUMNS":["courses6_title", "courses7_dept", "courses7_id", "courses8_instructor", "courses_avg8", "courses8_fail"], "ORDER":"courses9_something", "FORM":"TABLE" } }';


//test case with missing id
str = ' { "WHERE":{ "AND":[ { "IS":{ "thisiddoesnotexist_dept":"math" } }, { "GT":{ "thisiddoesnotexist_avg": 90 } } ] }, "OPTIONS":{ "COLUMNS": ["thisiddoesnotexist_dept", "thisiddoesnotexist_id", "thisiddoesnotexist_instructor", "thisiddoesnotexist_avg"], "ORDER":"thisiddoesnotexist_avg", "FORM":"TABLE" } }' ;
let query:QueryRequest = {'body': str};


insight.performQuery(query).then(
    function (r:InsightResponse) {
        let rs:any = r.body;
        Query.prettyPrint(rs);
    }
).catch(
    function(e){
        console.log(e);
    }
);






