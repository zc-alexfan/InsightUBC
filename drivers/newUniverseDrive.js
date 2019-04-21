"use strict";
var InsightFacade_1 = require("../src/controller/InsightFacade");
var Query_1 = require("../src/controller/Query");
var facade = new InsightFacade_1.default();
var fs = require('fs');
var input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 50 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "FORM":"TABLE" } }';
input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"m*" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';
var query = JSON.parse(input);
console.log("Query:\n");
Query_1.default.prettyPrint(query);
var queryRequest = { body: input };
facade.performQuery(queryRequest).then(function (r) {
    facade.showSomeData(7, 'courses');
    var js = r.body;
    console.log("\n\n\nQuery Result:\n");
    Query_1.default.prettyPrint(js);
}).catch(function (err) { console.log(err); });
//# sourceMappingURL=newUniverseDrive.js.map