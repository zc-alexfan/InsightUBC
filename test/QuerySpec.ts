/**
 * Created by Nyanko on 1/30/2017.
 */
import {expect} from 'chai';
import Query from "../src/controller/Query";
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";

describe("QuerySpec", function () {

    let q : Query;

    before(function () {
        q = new Query();
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        q = null;
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("reading valid room zip", function (done) {
        let fs : any = require("fs");
        let filename: string = "rooms";
        let facade: InsightFacade = new InsightFacade();
        this.timeout(10000);
        //aa
        fs.readFile('rooms.zip', 'base64', function (err: Error, data: string) {
            if (err) {
                console.log(err);
                done(err);
            }
            // console.log(data);
            else {
                facade.addDataset(filename, data)
                    .then(function (res: InsightResponse) {
                        try {
                            // expect(res.code).to.equal(204);
                            // console.log('AddDataset 204 case')
                            // facade.showSomeData(4, "courses");
                            // facade.showSomeData(4, "DoesNotExist");
                            console.log(res);
                            // console.log(facade.universe[filename].length);
                            done();
                        }
                        catch (err) {
                            throw err;
                        }
                    })
                    .catch(function (err: any) {
                        console.log(err);
                        done(err);
                    })
            }
        });
    });

    it("Empty string should be false ", function () {
        let qString :string = "";
        expect(q.isValid(qString )).to.equal("Invalid JSON");
    });

    it("Null should be false ", function () {
        let qString :string = null;
        expect(q.isValid(qString )).to.equal("Query cannot be null");
    });

    it("Undefined should be false ", function () {
        let qString :string = undefined;
        expect(q.isValid(qString )).to.equal("Query cannot be null");
    });

    it("Invalid JSON should be false", function(){
        let qString : string = "[}";
        expect(q.isValid(qString )).to.equal("Invalid JSON");
    });

    it("Valid JSON should be false", function(){
        let qString : string = "{}";
        expect(q.isValid(qString )).to.equal("Query must have only two keys 'WHERE' and 'OPTIONS' ");
    });

    it("Empty BODY and empty OPTIONS should be false", function(){
        let qString : string = '{"WHERE":{}, "OPTIONS":{}}';
        expect(q.isValid(qString )).to.equal("OPTIONS can only have certain keys");
    });

    it("{Missing OPTIONS should be false", function(){
        let qString : string = '{"WHERE":{}}';
        expect(q.isValid(qString )).to.equal("Query must have only two keys 'WHERE' and 'OPTIONS' ");
    });

    it("Valid simple q FORM D1 spec", function(){
        let qString : string = '{"WHERE": {"GT":{"courses_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal(null);
    });

    it("Invalid simple qString : MCOMPARISON wrong key", function(){
        let qString : string = '{"WHERE": {"AT":{"courses_avg": 97}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Unexpected key in Filter");
    });

    it("Invalid simple qString : MCOMPARISON wrong key value", function(){
        let qString : string = '{"WHERE": {"EQ":{"courses_avg": "abc"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("MCOMPARISON must be against a number");
    });

    it("Invalid simple qString : MCOMPARISON too many keys", function(){
        let qString : string = '{"WHERE": {"EQ":{"courses_avg": 90, "courses_pass": 9}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Filter MCOMPARISON should contain 1 key");
    });

    it("Invalid simple qString : SCOMPARISON 2 star", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "*holmes*"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON end star", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "holmes*"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON start star", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "*holmes"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON no star", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "holmes"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON star in middle", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "hol*mes"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON blanks should be valid", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "*hol mes"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("String Comparator requires a string key");
    });

    it("Invalid simple qString : SCOMPARISON wrong key", function(){
        let qString : string = '{"WHERE": {"IS":{"coursesavg": "holmes"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("SCOMPARISON should be against a valid key");
    });

    it("Invalid simple qString : SCOMPARISON wrong key value", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": 90}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("SCOMPARISON expecting a string to compare with");
    });

    it("Invalid simple qString : SCOMPARISON too many keys", function(){
        let qString : string = '{"WHERE": {"IS":{"courses_avg": "holmes", "courses_dept": "cpsc"}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Filter SCOMPARISON should contain 1 key");
    });

    it("Valid simple q NOT ", function(){
        let qString : string = '{"WHERE": {"NOT": {"GT":{"courses_avg": 97}}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal(null);
    });

    it("Invalid simple q NOT not a filter inside", function(){
        let qString : string = '{"WHERE": {"NOT": {"AT":{"courses_avg": 97}}}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Unexpected key in Filter");
    });

    it("Valid complex q FORM D1 spec", function(){
        let qString : string = '{"WHERE":{"OR":[{"AND":[{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}}]},{"EQ":{"courses_avg":95}}]},"OPTIONS":{"COLUMNS":["courses_dept","courses_id","courses_avg"],"ORDER":"courses_avg","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal(null);
    });

    it("Invalid complex qString : wrong key", function(){
        let qString : string = '{"WHERE":{"OR":[{"SAND":[{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}}]},{"EQ":{"courses_avg":95}}]},"OPTIONS":{"COLUMNS":["courses_dept","courses_id","courses_avg"],"ORDER":"courses_avg","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Unexpected key in Filter");
    });

    it("Invalid complex qString : EQ with string as input", function(){
        let qString : string = '{"WHERE":{"OR":[{"AND":[{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}}]},{"EQ":{"courses_avg":"high"}}]},"OPTIONS":{"COLUMNS":["courses_dept","courses_id","courses_avg"],"ORDER":"courses_avg","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("MCOMPARISON must be against a number");
    });

    it("Extra keys should be false", function(){
        let qString : string = '{"APPLE": "fruit", "WHERE":{}, "OPTIONS":{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}}';
        expect(q.isValid(qString )).to.equal("Query must have only two keys 'WHERE' and 'OPTIONS' ");
    });

    it("OPTIONS false: empty", function(){
        let qString : string = '{}';
        expect(q.isValidOptions(qString)).to.equal("OPTIONS can only have certain keys");
    });

    it("OPTIONS true", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "courses_avg"],"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal(null);
    });

    it("OPTIONS false multiple datasets", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("Cannot query from multiple datasets at once");
    });

    it("OPTIONS false ORDER D3", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"ORDER":{"dir":"LEFT","keys":["courses_id"]},"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER dir must be UP or DOWN");
    });

    it("OPTIONS false ORDER D3 II", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"ORDER":{"dir":"UP","keys":"a"},"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER keys must be an array");
    });

    it("OPTIONS false ORDER D3 III", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"ORDER":{"dir":"UP","keys":[]},"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER keys must contain 1 key at least");
    });

    it("OPTIONS false ORDER D3 IV", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"ORDER":{"dir":"DOWN","keys":["a"]},"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER keys must be from columns");
    });

    it("OPTIONS false ORDER D3 V", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "rooms_avg"],"ORDER":{"dirs":"DOWN","keys":["a"]},"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER must contain a valid key");
    });

    it("OPTIONS false: wrong optional key", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "courses_avg"],"HEY":"you","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("ORDER is the only optional key in OPTIONS");
    });

    it("OPTIONS true", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "courses_avg"],"ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal(null);
    });

    it("OPTIONS false: extra keys", function(){
        let qString : string = '{"APPLE": "fruit", "COLUMNS": ["courses_id", "courses_avg"],"ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("OPTIONS can only have certain keys");
    });

    it("OPTIONS true", function(){
        let qString : string = '{"COLUMNS": ["courses_id"],"ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal(null);
    });

    it("OPTIONS false: missing [] in COLUMNS", function(){
        let qString : string = '{"COLUMNS": "courses_id","ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("COLUMNS must be an array of keys");
    });

    it("OPTIONS false: invalid JSON", function(){
        let qString : string = '{"COLUMNS": "courses_id", "courses_avg","ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("Invalid JSON ORDER");
    });

    it("OPTIONS false: invalid JSON", function(){
        let qString : string = '{"COLUMNS": {"courses_id", "courses_avg"},"ORDER": "courses_id","FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("Invalid JSON ORDER");
    });

    it("OPTIONS false: invalid ORDER", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "courses_avg"],"ORDER": "courses_pass","FORM":"TABLE"}';
        expect(q.isValidOptions(qString)).to.equal("ORDER key must be in columns");
    });

    it("OPTIONS false: invalid key", function(){
        let qString : string = '{"COLUMNS": ["cour_ses_id", "courses_avg"],"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("cour_ses_id is an invalid key");
    });

    it("OPTIONS false: invalid key", function(){
        let qString : string = '{"COLUMNS": ["courses_id", "coursesavg"],"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("coursesavg is an invalid key");
    });

    it("OPTIONS false: invalid COLUMNS", function(){
        let qString : string = '{"COLUMNS": [],"FORM":"TABLE"}';
        expect(q.isValidOptions(qString )).to.equal("COLUMNS must contain something keys");
    });

    it("Regular Expression for IS: *pen", function(){
        let functor = Query.NODES["IS"];
        let pattern = "*math";
        let current = "abcmath";
        try{
        expect(functor(current, pattern)).to.equal(true);

        current = "cmath";
        expect(functor(current, pattern)).to.equal(true);

        current = "math";
        expect(functor(current, pattern)).to.equal(true);

        current = "hahaha, you are so funny! math";
        expect(functor(current, pattern)).to.equal(true);

        current = "matha";
        expect(functor(current, pattern)).to.equal(false);

        current = "mathbc";
        expect(functor(current, pattern)).to.equal(false);

        current = null;
        expect(functor(current, pattern)).to.equal(false);

        current = undefined;
        expect(functor(current, pattern)).to.equal(false);

        }catch(e){
            console.log("equals(" + current + ", " + pattern + ") fails");
            throw e;
        }
    });

    it("Regular Expression for IS: pen*", function(){
        let functor = Query.NODES["IS"];
        let pattern = "math*";
        let current = "abcmath";
        try{
        expect(functor(current, pattern)).to.equal(false);

        current = "cmath";
        expect(functor(current, pattern)).to.equal(false);

        current = "math";
        expect(functor(current, pattern)).to.equal(true);

        current = "matha";
        expect(functor(current, pattern)).to.equal(true);

        current = "math, hahaha, I am so funny!";
        expect(functor(current, pattern)).to.equal(true);

        current = "mathbc";
        expect(functor(current, pattern)).to.equal(true);

        current = null;
        expect(functor(current, pattern)).to.equal(false);

        pattern = null;
        expect(functor(current, pattern)).to.equal(true);

        current = null;
        pattern = undefined;
        expect(functor(current, pattern)).to.equal(true);

        current = undefined;
        pattern = null;
        expect(functor(current, pattern)).to.equal(true);

        expect(functor(undefined, undefined)).to.equal(true);
        expect(functor(undefined, pattern)).to.equal(true);

        }catch(e){
            console.log("equals(" + current + ", " + pattern + ") fails");
            throw e;
        }
    });

    it("Regular Expression for IS: *pen*", function(){
        let functor = Query.NODES["IS"];
        let pattern = "*math*";
        let current = "abcmath";
        try{
        expect(functor(current, pattern)).to.equal(true);

        current = "cmath";
        expect(functor(current, pattern)).to.equal(true);

        current = "math";
        expect(functor(current, pattern)).to.equal(true);

        current = "matha";
        expect(functor(current, pattern)).to.equal(true);

        current = "mathbc";
        expect(functor(current, pattern)).to.equal(true);

        current = null;
        expect(functor(current, pattern)).to.equal(false);

        current = undefined;
        expect(functor(current, pattern)).to.equal(false);

        }catch(e){
            console.log("equals(" + current + ", " + pattern + ") fails");
            throw e;
        }
    });

    it("Set subtraction", function(){
        let A = new Set<number>();
        A.add(1); A.add(2); A.add(3); A.add(4);
        let B = new Set<number>();
        B.add(3); B.add(5);
        let C = Query.minus(A, B);
        let vector = Query.setToArray(C);
        expect(vector).to.deep.equal([1, 2, 4]);
    });


    it("debuPrint", function(){
        Query.debugPrint("hello");
    });

    it("OPTIONS null", function(){
        expect(q.isValidOptions(null)).to.equal("Query OPTIONS cannot be null");
    });

    it("OPTIONS false: invalid FORM", function(){
        let qString : string = '{"COLUMNS": ["courses_id"],"FORM":"APPLE"}';
        expect(q.isValidOptions(qString )).to.equal("Must contain phrase: FORM: TABLE");
    });

    it("IsMComparison null", function(){
        expect(q.isMComparison(null)).to.equal("Query filter cannot be null");
    });

    it("IsMComparison nested", function(){
        expect(q.isMComparison([{"courses_avg":{"courses_avg": 98}}])).to.equal("MCOMPARISON must be against a number");
    });

    it("IsMComparison invalid key", function(){
        expect(q.isMComparison({"courses_foo": 98})).to.equal("MCOMPARISON should be against a valid key");
    });

    it("IsSComparison null", function(){
        expect(q.isSComparison(null)).to.equal("Query filter cannot be null");
    });

    it("IsSComparison nested", function(){
        expect(q.isSComparison([{"courses_instructor": {"courses_dept": "ABC"}}])).to.equal("Filter SCOMPARISON key's content should not be nested");
    });

    it("IsValidFilter null", function(){
        expect(q.isValidFilter(null)).to.equal("Query filter cannot be null");
    });

    it("IsValidFilter Logic array", function(){
        expect(q.isValidFilter('{"AND":"hello"}')).to.equal("LOGICCOMPARISON should contain an array of filters");
    });

    it("IsValidFilter Logic array", function(){
        expect(q.isValidFilter('{"AND":[]}')).to.equal("LOGICCOMPARISON should contain an array of filters");
    });

    it("IsValidFilter invalid JSON", function(){
        expect(q.isValidFilter('a')).to.equal("Invalid JSON");
    });

    it("IS valid", function(){
        expect(q.isSComparison({
            "courses_instructor": "allen, meghan"
        })).to.equal(null);
    })

    //TODO search for all the cases of 400 errors
    it("400 invalud number comparison", function(){
       let query = {
           "WHERE": {
               "GT": {
                   "rooms_lat": "49.26478"
               }
           },
           "OPTIONS": {
               "COLUMNS": [
                   "rooms_shortname",
                   "rooms_type",
                   "rooms_lat",
                   "rooms_lon"
               ],
               "FORM": "TABLE"
           }
       };
       expect(q.isValid(JSON.stringify(query))).to.equal("MCOMPARISON must be against a number");
    });

    it("400 invalud number comparison II", function(){
        let query = {
            "WHERE": {
                "LT": {
                    "courses_year": "2008"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_id",
                    "courses_year"
                ],
                "FORM": "TABLE"
            }
        };
        expect(q.isValid(JSON.stringify(query))).to.equal("MCOMPARISON must be against a number");
    });

    it("400 invalud number comparison III", function(){
        let query =
        {
            "WHERE": {
                "GT": {
                    "courses_instructor": 49
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_instructor"
                ],
                "FORM": "TABLE"
            }
        }
        ;
        expect(q.isValid(JSON.stringify(query))).to.equal("Math Comparator requires a number key");
    });

    it("400 invalid number comparison IV", function(){
        let query =
                {
                    "WHERE": {
                        "IS": {
                            "courses_pass": "40"
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "courses_instructor"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;
        expect(q.isValid(JSON.stringify(query))).to.equal("String Comparator requires a string key");
    });

    it("400 invalid number comparison V", function(){
        let query =
                {
                    "WHERE": {
                        "IS": {
                            "rooms_seats": "*112"
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_href"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;
        expect(q.isValid(JSON.stringify(query))).to.equal("String Comparator requires a string key");
    });

    it("sortByMultipleKey empty error", function(){
        let a: any = [{"a":"b"}];
        let tmp : any = Query.sortByMultipleKey(a,[],true);
        expect(tmp).to.be.a.instanceof(Array);
    });

    it("sortByKey undefined key", function(){
        let a: any = [{"a":"b"}];
        let tmp : any = Query.sortByKey(a,undefined,true)
        expect(tmp).to.be.a.instanceof(Array);
    });
});