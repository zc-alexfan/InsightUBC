
import {expect} from 'chai';
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import App from "../src/App";
import Log from "../src/Util";
import {Response} from "restify";



var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe("ZRESTSpec", function () {
    let facade: InsightFacade = null;
    let fs:any;
    let url:string;
    let port:number = 4321;
    let app:any;

    before(function () {
        fs = require('fs');
        app = new App();
        app.initServer(port);
        url = 'http://localhost:' + port;

        //clear cache
        chai.request(url).del('/dataset/'+ "courses").then(function (res: Response){}).catch(function (err:any) { });
        chai.request(url).del('/dataset/'+ "rooms").then(function (res: Response){}).catch(function (err:any) { });

    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        facade = null;
        app.stopServer();
        //Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("PUT room 202", function (done) {
        this.timeout(10000);
        let dataset:string = "rooms";
        try{
        let content = fs.readFileSync("./"+dataset + ".zip");
        chai.request(url)
            .put('/dataset/'+dataset)
            .attach("body", content, dataset+".zip")
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(204);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });

    it("PUT rooms 201", function (done) {
        this.timeout(10000);
        let dataset:string = "rooms";
        try{
        let content = fs.readFileSync("./"+dataset + ".zip");
        chai.request(url)
            .put('/dataset/'+dataset)
            .attach("body", content, dataset+".zip")
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(201);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });


    it("PUT courses 202", function (done) {
        this.timeout(10000);
        let dataset:string = "courses";
        try{
        let content = fs.readFileSync("./"+dataset + ".zip");
        chai.request(url)
            .put('/dataset/'+dataset)
            .attach("body", content, dataset+".zip")
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(204);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });

    it("PUT courses 201", function (done) {
        this.timeout(10000);
        let dataset:string = "courses";
        try{
        let content = fs.readFileSync("./"+dataset + ".zip");
        chai.request(url)
            .put('/dataset/'+dataset)
            .attach("body", content, dataset+".zip")
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(201);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });


    it("POST [steven]", function(done){
        try{
        let queryJSON:QueryRequest = {"WHERE": {"GT":{"courses_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
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
        chai.request(url)
        .post("/query")
        .send(queryJSON)
        .then(
            function(res:any){
                Log.trace("then");
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(ex);
                done();
        }).catch(
            function(err:any){
                Log.trace("catch");

                expect.fail();

                done(err);
        });

        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });



    it("POST 400", function(done){
        try{
        let queryJSON:QueryRequest = {"WHERE": {"GT":{"courses_avg": 97}}};
        chai.request(url)
        .post("/query")
        .send(queryJSON)
        .then(
            function(res:any){
                Log.trace("then");
                expect.fail();
                done();
        }).catch(
            function(err:any){
                Log.trace("catch");
                expect(err.status).to.equal(400);
                done();
        });

        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });

    it("POST 424", function(done){
        try{
        let queryJSON:QueryRequest = {"WHERE": {"GT":{"amazing_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_dept","courses_avg"],"ORDER": "courses_avg","FORM":"TABLE"}};
        chai.request(url)
        .post("/query")
        .send(queryJSON)
        .then(
            function(res:any){
                Log.trace("then");
                expect.fail();
                done();
        }).catch(
            function(err:any){
                Log.trace("catch");
                expect(err.status).to.equal(424);
                done();
        });

        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });



    it("DEL /dataset/courses 204", function (done) {
        this.timeout(4000);
        let dataset = "courses";
        try{
        chai.request(url)
            .del('/dataset/'+ dataset)
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(204);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });


    it("DEL /dataset/courses 404", function (done) {
        this.timeout(4000);
        let dataset = "courses";
        try{
        chai.request(url)
            .del('/dataset/'+ dataset)
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect.fail();
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err.status);
                expect(err.status).to.equal(404);
                done();
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });

    it("DEL /dataset/rooms 204", function (done) {
        this.timeout(4000);
        let dataset = "rooms";
        try{
        chai.request(url)
            .del('/dataset/'+ dataset)
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(204);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });


    it("DEL /dataset/rooms 404", function (done) {
        this.timeout(4000);
        let dataset = "rooms";
        try{
        chai.request(url)
            .del('/dataset/'+ dataset)
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect.fail();
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err.status);
                expect(err.status).to.equal(404);
                done();
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });




    it("GET /", function (done) {
        this.timeout(2000);
        try{
        chai.request(url)
            .get('/')
            .then(function (res: Response) {
                Log.trace('then:');
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                console.log(err);
                expect.fail();
                done(err);
            });
        }catch(err2){
            console.log(err2);
            done(err2);
        }
    });



});