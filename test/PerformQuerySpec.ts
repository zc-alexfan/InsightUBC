import {QueryRequest, InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import Query from "../src/controller/Query";
import {expect} from 'chai';
/**
 * Created by Nyanko on 2/1/2017.
 */
describe("PerformQuerySpec", function () {

    let facade: InsightFacade = null;

    before(function () {
        facade = new InsightFacade();
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        facade = null;
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("testid:[steven] Simple Query from D1 pass ", function () {
        let queryRequest:QueryRequest = {"WHERE": {"GT":{"courses_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        let ex:any = { render: 'TABLE',
            result:
                [ { courses_dept: 'epse', courses_avg: 97.09 },
                    { courses_dept: 'math', courses_avg: 97.09 },
                    { courses_dept: 'math', courses_avg: 97.09 },
                    { courses_dept: 'epse', courses_avg: 97.09 },
                    { courses_dept: 'math', courses_avg: 97.25 },
                    { courses_dept: 'math', courses_avg: 97.25 },
                    { courses_dept: 'epse', courses_avg: 97.29 },
                    { courses_dept: 'epse', courses_avg: 97.29 },
                    { courses_dept: 'nurs', courses_avg: 97.33 },
                    { courses_dept: 'nurs', courses_avg: 97.33 },
                    { courses_dept: 'epse', courses_avg: 97.41 },
                    { courses_dept: 'epse', courses_avg: 97.41 },
                    { courses_dept: 'cnps', courses_avg: 97.47 },
                    { courses_dept: 'cnps', courses_avg: 97.47 },
                    { courses_dept: 'math', courses_avg: 97.48 },
                    { courses_dept: 'math', courses_avg: 97.48 },
                    { courses_dept: 'educ', courses_avg: 97.5 },
                    { courses_dept: 'nurs', courses_avg: 97.53 },
                    { courses_dept: 'nurs', courses_avg: 97.53 },
                    { courses_dept: 'epse', courses_avg: 97.67 },
                    { courses_dept: 'epse', courses_avg: 97.69 },
                    { courses_dept: 'epse', courses_avg: 97.78 },
                    { courses_dept: 'crwr', courses_avg: 98 },
                    { courses_dept: 'crwr', courses_avg: 98 },
                    { courses_dept: 'epse', courses_avg: 98.08 },
                    { courses_dept: 'nurs', courses_avg: 98.21 },
                    { courses_dept: 'nurs', courses_avg: 98.21 },
                    { courses_dept: 'epse', courses_avg: 98.36 },
                    { courses_dept: 'epse', courses_avg: 98.45 },
                    { courses_dept: 'epse', courses_avg: 98.45 },
                    { courses_dept: 'nurs', courses_avg: 98.5 },
                    { courses_dept: 'nurs', courses_avg: 98.5 },
                    { courses_dept: 'epse', courses_avg: 98.58 },
                    { courses_dept: 'nurs', courses_avg: 98.58 },
                    { courses_dept: 'nurs', courses_avg: 98.58 },
                    { courses_dept: 'epse', courses_avg: 98.58 },
                    { courses_dept: 'epse', courses_avg: 98.7 },
                    { courses_dept: 'nurs', courses_avg: 98.71 },
                    { courses_dept: 'nurs', courses_avg: 98.71 },
                    { courses_dept: 'eece', courses_avg: 98.75 },
                    { courses_dept: 'eece', courses_avg: 98.75 },
                    { courses_dept: 'epse', courses_avg: 98.76 },
                    { courses_dept: 'epse', courses_avg: 98.76 },
                    { courses_dept: 'epse', courses_avg: 98.8 },
                    { courses_dept: 'spph', courses_avg: 98.98 },
                    { courses_dept: 'spph', courses_avg: 98.98 },
                    { courses_dept: 'cnps', courses_avg: 99.19 },
                    { courses_dept: 'math', courses_avg: 99.78 },
                    { courses_dept: 'math', courses_avg: 99.78 } ] };

        return facade.performQuery(queryRequest)
        .then(
            function(r:InsightResponse){
                    // // console.log("%O",r);
                    // // console.log(r);
                    expect(r.code).to.equal(200);
                    expect(r.body).to.deep.equal(ex);
                })
        .catch(function(r:any){
            // console.log(r);
            expect.fail();
        })
    });

    it("Simple Query from D1 fail 424 ", function () {
        let queryRequest:QueryRequest = {"WHERE": {"GT":{"course_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        return facade.performQuery(queryRequest)
            .then(
                function(){
                     expect.fail();
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect(r.code).to.equal(424);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query 400", function(){
        let queryRequest:QueryRequest = {
            "WHERE": {
                "GT": {
                    "courses_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "amazing_test"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query 400 one key in column that is invalid", function(){
        let queryRequest:QueryRequest = {
            "WHERE": {
                "GT": {
                    "courses_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_test"
                ],
                "ORDER": "courses_test",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(r:any){
                    Query.prettyPrint(r.body);
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query 200 valid keys with invalid keys in column should pass", function(){
        let queryRequest:QueryRequest = {
            "WHERE": {
                "GT": {
                    "courses_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "courses_test"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect.fail();
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query 424 amazing II", function(){
        let queryRequest:QueryRequest = {
            "WHERE": {
                "AND": [{
                    "GT": {
                        "courses_avg": 97
                    }
                }, {
                    "LT": {
                        "amazing_test": 12
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect(r.code).to.equal(424);
                // // console.log(r.body.missing);
            });
    });

    it("simple query 424, missing amazing", function(){
        let queryRequest:QueryRequest = {
            "WHERE": {
                "GT": {
                    "amazing_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "amazing_test"
                ],
                "ORDER": "amazing_test",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(JSON.stringify(r));
                expect(r.code).to.equal(424);
                // // console.log(r.body.missing);
            });
    });


    it("Simple Query from D1 fail 424 Apple", function () {
        let queryRequest:QueryRequest = {"WHERE": {"GT":{"courses_avg": 97}}, "OPTIONS":{"COLUMNS": ["apple_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query from D1 fail 424 Apple Pear", function () {
        let queryRequest:QueryRequest = {
            "WHERE": {
                "AND": [{
                    "GT": {
                        "amazing_test": 97
                    }
                }, {
                    "LT": {
                        "pear_pass": 12
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "ab_key",
                    "ab_avg"
                ],
                "ORDER": "ab_key",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(424);
                // // console.log(r.body.missing);
            });
    });


    it("Simple Query from D1 fail 400 amazing", function () {
        let queryRequest:QueryRequest = {
            "WHERE": {
                "GT": {
                    "courses_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "amazing_test"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query from D1 contradictory ", function () {
        let queryRequest:QueryRequest = {"WHERE": {"AND":[{"GT":{"courses_avg": 97}},{"LT":{"courses_avg": 10}}]}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};

        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // // console.log("%O",r);
                    // // console.log(r);
                    expect(r.code).to.equal(200);
                    // console.log(r);
                })
            .catch(function(r:any){
                // console.log(r);
                expect.fail();
            })
    });

    it("Complex Query from D1 ", function () {
        let queryRequest:QueryRequest = {
            "WHERE":{
                "OR":[
                    {
                        "AND":[
                            {
                                "GT":{
                                    "courses_avg":90
                                }
                            },
                            {
                                "IS":{
                                    "courses_dept":"adhe"
                                }
                            }
                        ]
                    },
                    {
                        "EQ":{
                            "courses_avg":95
                        }
                    }
                ]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        };
        let ex: any = { render: 'TABLE',
            result:
                [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                    { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                    { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                    { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                    { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                    { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                    { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                    { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
                    { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                    { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                    { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                    { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                    { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                    { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
                    { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                    { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                    { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                    { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
                    { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                    { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                    { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
                    { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                    { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                    { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                    { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                    { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                    { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                    { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
                    { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                    { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                    { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                    { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // // console.log("%O",r);
                    // // console.log(r);
                    expect(r.code).to.equal(200);
                    expect(r.body).to.deep.equal(ex);
                })
            .catch(function(r:any){
                // console.log(r);
                expect.fail();

            })
    });

    it("Complex Query IS specific instructor ", function () {
        let queryRequest:QueryRequest = {
            "WHERE": {
                "IS": {
                    "courses_instructor": "allen, meghan"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_instructor",
                    "courses_id",
                    "courses_uuid"
                ],
                "ORDER": "courses_dept",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    expect(list["result"].length).to.equal(28);
                })
            .catch(function(r:any){
                // console.log(r);
                expect.fail();

            })
    });

    it("Simple Query invalid key 400 ", function () {

        let queryRequest:QueryRequest = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "NOT":{ "GT":{ "courses_avg": 60 } } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';

        // let input = {"WHERE": {"GT":{"courses_me": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        return facade.performQuery(queryRequest)
            .then(
                function(){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    it("Simple Query invalid key 400 QQQQQQQQ ", function () {

        let queryRequest:QueryRequest ={
            "WHERE": {
                "AND":[
                    {"IS": {
                    "courses_id": "112"
                }},
                    {"IS": { "courses_dept" : "engl"}}
                ]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_id"
                ],
                "FORM": "TABLE"
            }
        };
        // let input = {"WHERE": {"GT":{"courses_me": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        return facade.performQuery(queryRequest)
            .then(
                function(r:any){
                    // console.log(facade.universe["courses"].length);
                    // console.log(r);
                    // expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });

    //note: typescript does not allow this test, will not compile, but, autobot runs similar test
/*    it("Simple Query empty and 400 ", function () {
        let input = {"WHERE": {"AND": []}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        let queryRequest:QueryRequest = input;
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);
                // // console.log(r.body.missing);
            });
    });*/

    it("show data", function(){
       facade.showSomeData(1,"courses");
    });

    it("NOT case valid", function(){
        let q: QueryRequest = {
            "WHERE":{
                "AND":[
                    {
                        "IS":{ "courses_dept":"math" }
                    },
                    {
                        "NOT":{
                            "GT":{ "courses_avg": 50 }
                        }
                    }
                ]
            },
            "OPTIONS":{
                "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        };

        let tripleNot: QueryRequest = {
            "WHERE":{
                "AND":[
                    {
                        "IS":{ "courses_dept":"math" }
                    },
                    {"NOT":
                        {"NOT":
                            {"NOT":{
                                "GT":{ "courses_avg": 50 }
                            }}}
                    }
                ]
            },
            "OPTIONS":{
                "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        };
        let rFirst : InsightFacade;
        return facade.performQuery(q)
            .then(function(r:any){
                expect(r.code).to.equal(200);
                expect(r.body["result"].length).to.equal(2);
                // console.log(r.body["result"]);
                // // console.log(r);
                rFirst = r;
                return facade.performQuery(tripleNot);
            })
            .then(function(r:any){
                // console.log(r);
                expect(r).to.deep.equal(rFirst);
            })
            .catch(function(){
                expect.fail();
            })
    })
});