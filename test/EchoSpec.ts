/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

describe("EchoSpec", function () {


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("Should be able to echo", function () {
        let out = Server.performEcho('echo');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: 'echo...echo'});
    });

    it("Should be able to echo silence", function () {
        let out = Server.performEcho('');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: '...'});
    });

    it("Should be able to handle a missing echo message sensibly", function () {
        let out = Server.performEcho(undefined);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it("Should be able to handle a null echo message sensibly", function () {
        let out = Server.performEcho(null);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.have.property('error');
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it("Test for Server.ts", function () {
        let server = new Server(4321);
        server.start().then(
            (x:boolean)=>{
                expect(x).to.equal(true);
            }
        ).catch(
            (err:any)=>{
                expect(err).to.have.property('error');
            }
        );
        server.stop().then(
            (x:boolean)=>{ expect(x).to.equal(true); }
        ).catch(
            (err:any)=>{ expect(err).to.have.property('error'); }
        );

        try{
            //let rest= require("restify");
            let req:any = {params:{msg:"Hello"}};
            Server.echo(req, null, null);

            //Server.echo(null, null, null);
        }catch(e){

        }

    });

});
