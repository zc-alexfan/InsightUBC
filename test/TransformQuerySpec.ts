import Log from "../src/Util";
import {expect} from 'chai';
import InsightFacade from "../src/controller/InsightFacade";
import {QueryRequest, InsightResponse} from "../src/controller/IInsightFacade";
import Query from "../src/controller/Query";

/**
 * Created by Nyanko on 3/5/2017.
 */
describe("TransformQuerySpec", function () {

    let facade: InsightFacade = null;

    before(function () {
        // Log.test('Before: ' + (<any>this).test.parent.title);
        facade = new InsightFacade();
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        // Log.test('After: ' + (<any>this).test.parent.title);
        facade = null;
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("SORT with ORDER: key", function () {
        let queryRequest:QueryRequest =
        {
            "WHERE": {
                "AND": [
                    {"IS": {"courses_instructor": "allen, meghan"}},
                    {"IS": {"courses_id": "*10"}}
                ]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_instructor",
                    "courses_id",
                    "courses_uuid"
                ],
                "ORDER": "courses_id",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    expect(list["result"].length).to.equal(20);
                    //Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("SORT with ORDER: {dir: UP,keys:[string]}", function () {
        let queryRequest:QueryRequest =
        {
            "WHERE": {
                "AND": [
                    {"IS": {"courses_instructor": "allen, meghan"}},
                    {"IS": {"courses_id": "*10"}}
                ]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_instructor",
                    "courses_id",
                    "courses_uuid"
                ],
                "ORDER": {"dir": "DOWN", "keys": ["courses_id"]},
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    expect(list["result"].length).to.equal(20);
                    //Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("SORT with ORDER: {dir: UP,keys:[string,string]}", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [
                        {"IS": {"courses_instructor": "allen, meghan"}},
                        {"IS": {"courses_id": "*10"}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_instructor",
                        "courses_id",
                        "courses_uuid"
                    ],
                    "ORDER": {"dir": "DOWN", "keys": ["courses_id","courses_uuid"]},
                    "FORM": "TABLE"
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    expect(list["result"].length).to.equal(20);
                    //Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("SORT with GROUP", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [
                        {"IS": {"courses_instructor": "allen, meghan"}},
                        {"IS": {"courses_id": "*10"}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id"
                    ],
                    "ORDER": {"dir": "DOWN", "keys": ["courses_id"]},
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS" : {
                    "GROUP": ["courses_dept","courses_id"],
                    "APPLY":[]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    console.log("hee");
                    console.log(JSON.stringify(r));
                    expect(list["result"].length).to.equal(3);
                    //Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("two APPLY", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats",
                        "seatsNum"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["seatsNum","maxSeats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    },
                        {
                            "seatsNum": {
                                "COUNT": "rooms_seats"
                            }
                        }]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    // expect(list["result"].length).to.equal(20);
                    Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Stratos I", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE":{
                    "IS":{"courses_dept":"eng*"}
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "max",
                        "courses_year",
                        "min & passing"
                    ],
                    "ORDER": {
                        "dir":"DOWN",
                        "keys":["max"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_year"],
                    "APPLY": [
                        {"max":{"MAX":"courses_avg"}},
                        {"min & passing":{"MIN":"courses_pass"}}]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    // expect(list["result"].length).to.equal(20);
                    Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });


    it("Apply key not in columns valid", function () {
        //TODO : should not add more columns to response than what I really need
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "GT": {
                        "courses_pass": 100
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_pass"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["courses_pass"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_pass"],
                    "APPLY": [
                    ]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    // expect(list["result"].length).to.equal(20);
                    Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Sample Query B", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_furniture"
                    ],
                    "ORDER": "rooms_furniture",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_furniture"],
                    "APPLY": []
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    //Query.prettyPrint(r);
                    let expected: any = {
                        "render": "TABLE",
                        "result": [{
                            "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                        }, {
                            "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                        }, {
                            "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                        }, {
                            "rooms_furniture": "Classroom-Fixed Tablets"
                        }, {
                            "rooms_furniture": "Classroom-Hybrid Furniture"
                        }, {
                            "rooms_furniture": "Classroom-Learn Lab"
                        }, {
                            "rooms_furniture": "Classroom-Movable Tables & Chairs"
                        }, {
                            "rooms_furniture": "Classroom-Movable Tablets"
                        }, {
                            "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                        }, {
                            "rooms_furniture": "Classroom-Moveable Tablets"
                        }]
                    };
                    expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Sample Query A", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["maxSeats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                    let expected: any = {
                        "render": "TABLE",
                        "result": [{
                            "rooms_shortname": "OSBO",
                            "maxSeats": 442
                        }, {
                            "rooms_shortname": "HEBB",
                            "maxSeats": 375
                        }, {
                            "rooms_shortname": "LSC",
                            "maxSeats": 350
                        }]
                    };
                    expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("APPLY MAX with more entries", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "GT": {
                        "rooms_seats": 300
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["maxSeats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Taurus D1/D2 style", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [
                        {"IS": {"courses_dept":"cpsc"}},
                        {"GT": {"courses_avg": 93}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg",
                    "FORM": "TABLE"
                }
                ,
                "TRANSFORMATIONS":{
                    "GROUP":["courses_avg"],
                    "APPLY":[]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                    let expected: any =
                        { render: 'TABLE',
                            result:
                                [ { courses_avg: 93.38 },
                                    { courses_avg: 93.5 },
                                    { courses_avg: 94 },
                                    { courses_avg: 94.5 },
                                    { courses_avg: 95 } ] };
                    expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect(r.body).to.equal("abc");

            })
    });

    it("Sirius mixed with APPLY D1/D2 style", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": "maxSeats",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                })
            .catch(function(r:any){
                console.log(r);
                expect(r.body).to.equal("abc");

            })
    });


    it("Taurus D3 style", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND":[
                        {"IS": {"courses_dept":"cpsc"}},
                        {"GT":{"courses_avg":93}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "avg"
                    ],
                    "ORDER":{
                        "dir":"DOWN",
                        "keys":["avg"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS":{
                    "GROUP":["courses_dept"],
                    "APPLY":[{"avg":{"AVG":"courses_avg"}}]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                    // expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect(r.body).to.equal("abc");

            })
    });

    it("Quicksilver II", function () {
        let queryRequest:QueryRequest =
                {"WHERE":{"GT":{"courses_sectionSize":300}},"OPTIONS":{"COLUMNS":["courses_dept","courses_id","courses_sectionSize"],"ORDER":"courses_dept","FORM":"TABLE"},"TRANSFORMATIONS":{"GROUP":["courses_dept","courses_id","courses_sectionSize"],"APPLY":[]}}
            ;
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                    // expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Quicksilver III", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_avg",
                        "courses_instructor",
                        "courses_title",
                        "courses_pass",
                        "courses_fail",
                        "courses_audit",
                        "courses_uuid",
                        "courses_year",
                        "pass"
                    ],
                    "ORDER":{
                        "dir":"UP",
                        "keys":["pass"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS":{
                    "GROUP":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg",
                        "courses_instructor",
                        "courses_title",
                        "courses_pass",
                        "courses_fail",
                        "courses_audit",
                        "courses_uuid",
                        "courses_year"
                    ],
                    "APPLY":[{"pass":{"SUM":"courses_pass"}}]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    // Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                    // expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("Radium", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname"
                    ],
                    "FORM": "TABLE"
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    //Query.prettyPrint(r);
                    let result : any = r.body;
                    console.log(result.result.length);
                    // expect(r.body).to.deep.equal(expected);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("invalid COLUMN key with GROUP", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [
                        {"IS": {"courses_instructor": "allen, meghan"}},
                        {"IS": {"courses_id": "*10"}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_uuid"
                    ],
                    "ORDER": {"dir": "DOWN", "keys": ["courses_id"]},
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS" : {
                    "GROUP": ["courses_id"],
                    "APPLY":[]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);

            })
    });

    it("two APPLY D2 format ", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "rooms_seats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["rooms_shortname"]
                    },
                    "FORM": "TABLE"
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect(r.code).to.equal(200);
                    let list:any = r.body;
                    // expect(list["result"].length).to.equal(20);
                    //Query.prettyPrint(list["result"]);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });

    it("invalid GROUP key with APPLY", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [
                        {"IS": {"courses_instructor": "allen, meghan"}},
                        {"IS": {"courses_id": "*10"}}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id"
                    ],
                    "ORDER": {"dir": "DOWN", "keys": ["courses_id"]},
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS" : {
                    "GROUP": ["courses_id","abc"],
                    "APPLY":[]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);

            })
    });

    it("wrong apply key", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "rooms_seats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["rooms_seats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "rooms_seats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect.fail();
                })
            .catch(function(r:any){
                // console.log(r);
                expect(r.code).to.equal(400);

            })
    });

    it("wrong apply key II", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["maxSeats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["foo"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }}]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    expect.fail();
                })
            .catch(function(r:any){
                console.log(r);
                expect(r.code).to.equal(400);

            })
    });

    it("valid query with less columns", function () {
        let queryRequest:QueryRequest =
            {
                "WHERE": {
                    "IS":{"courses_dept":"adhe"}
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "avg"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["avg"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id"],
                    "APPLY": [{
                        "avg": {
                            "MAX": "courses_avg"
                        }}]
                }
            };
        return facade.performQuery(queryRequest)
            .then(
                function(r:InsightResponse){
                    Query.prettyPrint(r);
                })
            .catch(function(r:any){
                console.log(r);
                expect.fail();

            })
    });
});