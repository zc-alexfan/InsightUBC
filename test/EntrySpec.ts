import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";
import Log from "../src/Util";
import Entry from "../src/controller/Entry";
/**
 * Created by Nyanko on 1/25/2017.
 */
import {expect} from 'chai';

describe("EntrySpec", function () {

    let facade: InsightFacade = null;
    let fs: any;

    before(function () {
        fs = require('fs');
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        facade = new InsightFacade();
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        facade = null;
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });
});