/**
 * Created by Nyanko on 2/2/2017.
 */

import {expect} from 'chai';
import IOProcessing from "../src/controller/IOProcessing";

describe("IOSpec", function () {

    let db: IOProcessing;

    before(function () {
        db = new IOProcessing();
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        db = null;
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("Fail readFilePromise ", function () {
        return IOProcessing.readFilePromise("","utf-8")
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                expect(err).to.not.be.null;
            })
    });

    it("processData reject ", function() {
       return db.processData("courses","abc")
           .then(function(){
               expect.fail();
           })
           .catch(function(err:any){
               expect(err).to.not.be.null;
           })
    });

    // it("processData reject 1", function(done) {
    //     let fs : any = require("fs");
    //     fs.readFile("fake.zip","base64", function(err:Error, data:string){
    //         if (err) done(err);
    //         db.processData("fake",data)
    //             .then(function(){
    //                 expect.fail();
    //                 done();
    //             })
    //             .catch(function(err:any){
    //                 expect(err).to.not.be.null;
    //                 done();
    //             });
    //     })
    // });

    it("normalizeOneJSON error", function(){
        return IOProcessing.normalizeOneJson(undefined)
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                expect(err).to.not.be.null;
            })
    });

    it("normalize error", function(){
        return db.normalize("abc")
            .then(function(){
                expect.fail();
            })
            .catch(function(err:any){
                expect(err).to.not.be.null;
            })
    });

    it("removeFromDisk error", function(){
        return db.removeFileFromDisk("apple")
            .then(function() {
                    expect.fail();
            })
            .catch(function(err:any){
                expect(err).to.not.be.null;
            })
    });

    it("processRooms error", function(){
       return db.processRooms(null)
           .then(function(){
               expect.fail();
           })
           .catch(function(r:any){
               expect(r).to.not.be.null;
           })
    });

    it("getBuildings error", function(){
        return db.getBuildings(null)
            .then(function(){
                expect.fail();
            })
            .catch(function(r:any){
                expect(r).to.not.be.null;
            })
    });

    it("processData error", function(done){
        let fs: any = require("fs");
        fs.readFile('rooms.zip', 'base64', function (err: Error, data: string) {
            if (err) {
                // console.log(err);
                done(err);
            }
            // // console.log(data);
            else {
                db.processData("abc",data)
                    .then(function(){
                        expect.fail();
                        done("should not suceed");
                    })
                    .catch(function(r:any){
                        expect(r).to.not.be.null;
                        done();
                    })
            }
        });
    });
    it("readAndParse error", function(){
        db.readAndParseRoom(null,null)
            .then(function(){
                expect.fail();
            })
            .catch(function(r:any){
                expect(r).to.not.be.null;
            })
    });
    it("processCourses error", function(){
        db.processCourses(null,null)
            .then(function(){
                expect.fail();
            })
            .catch(function(r:any){
                expect(r).to.not.be.null;
            })
    });

    it("savaDataToDisk error", function(){
        db.saveDataToDisk(null,null)
            .then(function(){
                expect.fail();
            })
            .catch(function(r:any){
                expect(r).to.not.be.null;
            })
    });
    it("savaDataToDisk error II", function(){
        db.saveDataToDisk("abc",null)
            .then(function(){
                expect.fail();
            })
            .catch(function(r:any){
                expect(r).to.not.be.null;
            })
    });
});