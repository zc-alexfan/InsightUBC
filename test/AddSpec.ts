/**
 * Created by Robin
 */

import {expect} from 'chai';
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import Query from "../src/controller/Query";



describe("AddSpec", function () {
    let filename: string = "courses";
    let facade: InsightFacade = null;
    let fs:any;

    before(function () {
        fs = require('fs');
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


    it("reading valid zip", function (done) {
    this.timeout(10000);

    fs.readFile(filename + '.zip', 'base64', function (err: Error, data: string) {
        if (err) {
            // console.log(err);
            done(err);
        }
        // // console.log(data);
        else {
            facade.addDataset(filename, data)
                .then(function (res: InsightResponse) {
                    try {
                        // expect(res.code).to.equal(204);
                        // // console.log('AddDataset 204 case')
                        facade.showSomeData(4, "courses");
                        facade.showSomeData(4, "DoesNotExist");
                        // console.log(res);
                        // console.log(facade.universe[filename].length);
                        done();
                    }
                    catch(err){
                        throw err;
                    }
                })
                .catch(function (err: any) {
                    // console.log(err);
                    done(err);
                })
        }
    });
    });

    it("reading valid zip again", function (done) {
        this.timeout(10000);
        fs.readFile(filename+".zip", 'base64', function (err: Error, data: string) {
            if (err) {
                // console.log(err);
                done(err);
            }
            // // console.log(data);
            else {
                facade.addDataset(filename,data)
                    .then(function(res:InsightResponse){
                        try {
                            expect(res.code).to.equal(201);
                            // // console.log('AddDataset 204 case')
                            // console.log(res);
                            // // console.log(facade.universe.length)
                            done();
                        }
                        catch(err){
                            throw err;
                        }
                    })
                    .catch(function(err:any){
                        // console.log(err);
                        expect.fail();
                        done(err);
                    })}
        });
    });

    // it("reading invalid zip", function (done) {
    //     // this.timeout(10000);
    //     fs.readFile('fake.zip', 'base64', function (err: Error, data: string) {
    //         if (err) {
    //             // console.log(err);
    //             done(err);
    //         }
    //         // // console.log(data);
    //         else {
    //             facade.addDataset('fake',data)
    //                 .then(function(res:InsightResponse){
    //                     // expect(res.code).to.equal(204);
    //                     // // console.log('AddDataset 204 case')
    //                     // console.log(res);
    //                     expect.fail();
    //                     done();
    //                 })
    //                 .catch(function(err:any){
    //                     // console.log(err);
    //                     expect(err.code).to.equal(400);
    //                     done();
    //                 })}
    //     });
    // });
    //
    // it("reading invalid zip", function (done) {
    //     // this.timeout(10000);
    //     fs.readFile('validjson_invaliddata.zip', 'base64', function (err: Error, data: string) {
    //         if (err) {
    //             // console.log(err);
    //             done(err);
    //         }
    //         // // console.log(data);
    //         else {
    //             facade.addDataset('validjson_invaliddata',data)
    //                 .then(function(res:InsightResponse){
    //                     // expect(res.code).to.equal(204);
    //                     // // console.log('AddDataset 204 case')
    //                     // console.log(res);
    //                     expect.fail();
    //                     done();
    //                 })
    //                 .catch(function(err:any){
    //                     // console.log(err);
    //                     expect(err.code).to.equal(400);
    //                     done();
    //                 })}
    //     });
    // });

    it("delete existing id", function () {
        // this.timeout(10000);
        return facade.removeDataset(filename)
            .then(function(res:InsightResponse){
                try {
                    expect(res.code).to.equal(204);
                    // // console.log('AddDataset 204 case')
                    // console.log(res);
                    // console.log(facade.universe);
                    // expect(facade.universe[filename]).to.equal(null);
                }catch(err){
                    throw err;
                }
            })
            .catch(function(err:any){
                // console.log(err);
                expect.fail();
            });
    });

    it("delete non-existing id", function () {
        // this.timeout(10000);
        return facade.removeDataset(filename)
            .then(function(res:InsightResponse){
                // console.log(res);
                expect.fail();
            })
            .catch(function(err:any){
                // console.log(err);
                expect(err.code).to.equal(404);
            });
    });

    it("reading valid zip again for performQuery", function (done) {
        this.timeout(10000);
        //TODO why it is reading valid_invalid folder path in the end?
        fs.readFile(filename + '.zip', 'base64', function (err: Error, data: string) {
            if (err) {
                // console.log(err);
                done(err);
            }
            // // console.log(data);
            else {
                facade.addDataset(filename, data)
                    .then(function (res: InsightResponse) {
                        try {
                            expect(res.code).to.equal(204);
                            // // console.log('AddDataset 204 case')
                            // console.log(res);
                            // console.log(facade.universe[filename].length);
                            done();
                        }
                        catch(err){
                            throw err;
                        }
                    })
                    .catch(function (err: any) {
                        // console.log(err);
                        // expect.fail();
                        done(err);
                    })
            }
        });
    });

    it("integrate with performQuery", function(){
        // this.timeout(10000);
        // facade.showSomeData(7, filename, true);
        let input:any;
        //input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 50 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "FORM":"TABLE" } }';

        input = '{ "WHERE":{ "OR":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';


        console.time('someFunction');
        // let query:any = JSON.parse(input);
        // // console.log("Query:\n");
        // Query.prettyPrint(query);

        let queryRequest:QueryRequest = {body:input};

        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    let js:any = r.body;
                    // console.log("\n\n\nQuery Result:\n");
                    Query.prettyPrint(js);
                    Query.debugPrint(js);
                }

            )
            .catch(function(err:any){
                // console.log(err);
            })
    });

    it("Query with a NOT", function(){
        // console.log("Only running This");

        let input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "NOT":{ "GT":{ "courses_avg": 60 } } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';

        let queryRequest:QueryRequest = {body:input};

        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    let js:any = r.body;
                    // console.log("\n\n\nQuery Result:\n");
                    Query.prettyPrint(js);
                    Query.debugPrint(js);
                }

            )
            .catch(function(err:any){
                // console.log(err);
            })
    });

    it("addDataset null id ", function(){
        return facade.addDataset(null,"abc")
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                // console.log(err);
                expect(err.body["error"]).to.not.be.null;
            })
    });


    it("addDataset null content ", function(){
        return facade.addDataset("courses",null)
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                // console.log(err);
                expect(err.body["error"]).to.not.be.null;
            })
    });

    it("removeDataset null id ", function(){
        return facade.removeDataset(null)
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                // console.log(err);
                expect(err.body["error"]).to.not.be.null;
            })
    });

});