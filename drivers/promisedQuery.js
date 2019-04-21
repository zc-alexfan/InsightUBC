"use strict";
var Query_1 = require("../src/controller/Query");
var InsightFacade_1 = require("../src/controller/InsightFacade");
var facade = new InsightFacade_1.default();
var input = ' [ { "courses_dept":"cpsc", "courses_id":"340", "courses_avg":80, "courses_instructor":"Mark" , "courses_title":"Machine Learning", "courses_pass": 90, "courses_fail": 2, "courses_audit": 1 }, { "courses_dept":"math", "courses_id":"340", "courses_avg":60, "courses_instructor":"Pich Money" , "courses_title":"Linear Programming", "courses_pass": 44, "courses_fail": 4, "courses_audit": 2 }, { "courses_dept":"math", "courses_id":"320", "courses_avg":40, "courses_instructor":"Jack" , "courses_title":"Real Variable", "courses_pass": 2, "courses_fail": 99, "courses_audit": 0 }, { "courses_dept":"cpsc", "courses_id":"322", "courses_avg":82, "courses_instructor":"Jason" , "courses_title":"Artificial Intelligence", "courses_pass": 99, "courses_fail": 3, "courses_audit": 10 }, { "courses_dept":"cpsc", "courses_id":"340", "courses_avg":90, "courses_instructor":"Alex" , "courses_title":"Machine Learning", "courses_pass": 99, "courses_fail": 0, "courses_audit": 100 } ]';
var data = JSON.parse(input);
var id = 'courses';
facade.putData(id, data);
facade.showSomeData(7, id);
input = '{ "WHERE":{ "OR":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';
var query = JSON.parse(input);
console.log("Query:\n");
Query_1.default.prettyPrint(query);
var queryRequest = { body: input };
facade.performQuery(queryRequest).then(function (r) {
    var js = r.body;
    console.log("\n\n\nQuery Result:\n");
    Query_1.default.prettyPrint(js);
}).catch(function (r) {
    console.log(">>>>>>Calling Rejected: ");
    console.log(r);
    console.log("<<<<<<<");
});
//# sourceMappingURL=promisedQuery.js.map