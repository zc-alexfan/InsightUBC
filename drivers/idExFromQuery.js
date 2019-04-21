"use strict";
var Query_1 = require("../src/controller/Query");
var InsightFacade_1 = require("../src/controller/InsightFacade");
var insight = new InsightFacade_1.default();
var str = ' { "WHERE":{ "OR":[ { "AND":[ { "IS":{ "courses1_instructor":"ascher, uri michael" } }, { "OR":[ { "AND":[ { "GT":{ "courses2_avg":70 } }, { "GT":{"courses3_fail": 1} } ] }, { "GT":{ "courses4_avg":50 } } ] } ] }, { "IS":{ "courses5_instructor":"schmidt, mark"} } ] }, "OPTIONS":{ "COLUMNS":["courses6_title", "courses7_dept", "courses7_id", "courses8_instructor", "courses_avg8", "courses8_fail"], "ORDER":"courses9_something", "FORM":"TABLE" } }';
str = ' { "WHERE":{ "AND":[ { "IS":{ "thisiddoesnotexist_dept":"math" } }, { "GT":{ "thisiddoesnotexist_avg": 90 } } ] }, "OPTIONS":{ "COLUMNS": ["thisiddoesnotexist_dept", "thisiddoesnotexist_id", "thisiddoesnotexist_instructor", "thisiddoesnotexist_avg"], "ORDER":"thisiddoesnotexist_avg", "FORM":"TABLE" } }';
var query = { 'body': str };
insight.performQuery(query).then(function (r) {
    var rs = r.body;
    Query_1.default.prettyPrint(rs);
}).catch(function (e) {
    console.log(e);
});
//# sourceMappingURL=idExFromQuery.js.map