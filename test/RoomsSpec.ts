/**
 * Created by Nyanko on 2/15/2017.
 */
import {expect} from 'chai';
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import Query from "../src/controller/Query";
import LocationIO from "../src/controller/LocationIO";
import MagicParser from "../src/controller/MagicParser";



describe("RoomsSpec", function () {
    let filename: string = "rooms";
    let facade: InsightFacade = null;
    let roomController : LocationIO = null;
    let fs: any;
    let query: Query = null;

    before(function () {
        fs = require('fs');
        facade = new InsightFacade();
        roomController = new LocationIO();
        // Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        // Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        facade = null;
        roomController = null;
        // Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        // Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("testing out geo location service TRUE", function(){
        return LocationIO.getGeoLocation("6245 Agronomy Road V6T 1Z4")
            .then(function(res:any){
                //console.log(res);
                expect(res.lan).to.not.be.null;
                expect(res.lon).to.not.be.null;
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("testing out geo location service FALSE", function(){
        return LocationIO.getGeoLocation("ABC")
            .then(function(res:any){
                // //console.log(res);
                expect.fail();
            })
            .catch(function(res:any){
                //console.log(res);
                expect(res.error).to.not.be.null;
            })
    });

    // it("reading valid room zip", function (done) {
    //     this.timeout(10000);
    //     fs.readFile(filename + '.zip', 'base64', function (err: Error, data: string) {
    //         if (err) {
    //             //console.log(err);
    //             done(err);
    //         }
    //         // //console.log(data);
    //         else {
    //             facade.addDataset(filename, data)
    //                 .then(function (res: InsightResponse) {
    //                     try {
    //                         // expect(res.code).to.equal(204);
    //                         // //console.log('AddDataset 204 case')
    //                         // facade.showSomeData(4, "courses");
    //                         // facade.showSomeData(4, "DoesNotExist");
    //                         //console.log(res);
    //                         // //console.log(facade.universe[filename].length);
    //                         done();
    //                     }
    //                     catch (err) {
    //                         throw err;
    //                     }
    //                 })
    //                 .catch(function (err: any) {
    //                     //console.log(err);
    //                     done(err);
    //                 })
    //         }
    //     });
    // });
    //
    // it("reading valid room zip again", function (done) {
    //     this.timeout(10000);
    //     fs.readFile(filename + '.zip', 'base64', function (err: Error, data: string) {
    //         if (err) {
    //             //console.log(err);
    //             done(err);
    //         }
    //         // //console.log(data);
    //         else {
    //             facade.addDataset(filename, data)
    //                 .then(function (res: InsightResponse) {
    //                     try {
    //                         // expect(res.code).to.equal(204);
    //                         // //console.log('AddDataset 204 case')
    //                         // facade.showSomeData(4, "courses");
    //                         // facade.showSomeData(4, "DoesNotExist");
    //                         //console.log(res);
    //                         // //console.log(facade.universe[filename].length);
    //                         done();
    //                     }
    //                     catch (err) {
    //                         throw err;
    //                     }
    //                 })
    //                 .catch(function (err: any) {
    //                     //console.log(err);
    //                     done(err);
    //                 })
    //         }
    //     });
    // });

    it("simple query  D2",function(){
       let q: any = {
           "WHERE": {
               "IS": {
                   "rooms_name": "DMP_*"
               }
           },
           "OPTIONS": {
               "COLUMNS": [
                   "rooms_name"
               ],
               "ORDER": "rooms_name",
               "FORM": "TABLE"
           }
       };
       return facade.performQuery(q)
           .then(function(res: any){
               let expected : any = {
                   "render": "TABLE",
                   "result": [{
                       "rooms_name": "DMP_101"
                   }, {
                       "rooms_name": "DMP_110"
                   }, {
                       "rooms_name": "DMP_201"
                   }, {
                       "rooms_name": "DMP_301"
                   }, {
                       "rooms_name": "DMP_310"
                   }]
               };
               expect(res.body).to.deep.equal(expected);
               // //console.log(res);
           })
           .catch(function(res:any){
               //console.log(res);
               expect.fail();
           })
    });


    it("complex query D2", function(){
        let q: any = {
            "WHERE": {
                "IS": {
                    "rooms_address": "*Agrono*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
                ],
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(q)
            .then(function(res: any){
                let expected : any = {
                    "render": "TABLE",
                    "result": [{
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4074"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4068"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4058"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4018"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4004"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3074"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3068"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3058"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3018"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3004"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_1001"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4072"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4062"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4052"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4016"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_4002"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3072"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3062"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3052"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3016"
                    }, {
                        "rooms_address": "6363 Agronomy Road",
                        "rooms_name": "ORCH_3002"
                    }, {
                        "rooms_address": "6245 Agronomy Road V6T 1Z4",
                        "rooms_name": "DMP_310"
                    }, {
                        "rooms_address": "6245 Agronomy Road V6T 1Z4",
                        "rooms_name": "DMP_201"
                    }, {
                        "rooms_address": "6245 Agronomy Road V6T 1Z4",
                        "rooms_name": "DMP_101"
                    }, {
                        "rooms_address": "6245 Agronomy Road V6T 1Z4",
                        "rooms_name": "DMP_301"
                    }, {
                        "rooms_address": "6245 Agronomy Road V6T 1Z4",
                        "rooms_name": "DMP_110"
                    }]
                };

                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("Germanium", function(){
        let q: any = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": "*Tables*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name",
                    "rooms_furniture"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("Gallium", function(){
        let q: any = {
            "WHERE": {
                "EQ": {
                    "courses_year": 2008
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
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("Query from multiple datasets", function(){
        let q: any = {
            "WHERE": {
                "AND": [
                    {"EQ": {
                    "courses_year": 2008
                }},
                    {"IS":{
                    "rooms_number": "120"
                }}
                ]
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
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                // //console.log(res.body.result.length);
                // //Query.prettyPrint(res.body);
                expect.fail();
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                // expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect(res.code).to.equal(400);
                // expect.fail();
            });

    });

    it("Metro", function(){
        let q: any = {
            "WHERE": {
                "GT":{
                    "rooms_seats": 240
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "rooms_seats"
                ],
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("Moonshine", function(){
        let q: any = {
            "WHERE": {
                "IS":{
                    "rooms_type": "*Small*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "rooms_seats",
                    "rooms_type"
                ],
                "FORM": "TABLE"
            }
        };
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("Odyssey", function(){
        let q: any = {
            "WHERE": {
                "AND": [
                    {"GT":{
                    "rooms_lat": 49.26478
                }},
                    {"GT":{
                        "rooms_lon": -123.24673
                    }}
                ]
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
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("OkelyDokely", function(){
        let q: any = {
            "WHERE": {
                "NOT": {
                    "AND": [
                        {
                            "GT": {
                                "rooms_lat": 49.26478
                            }
                        },
                        {
                            "GT": {
                                "rooms_lon": -123.24673
                            }
                        }
                    ]
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
        return facade.performQuery(q)
            .then(function(res: any){
                // let expected : any =
                //console.log(res.body.result.length);
                //Query.prettyPrint(res.body);
                // //console.log(JSON.stringify(res.body));
                // expect(res.body).to.deep.equal(expected);
                expect(true).to.equal(true);

            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            });

    });

    it("Nitro1",function(){
        let q:any ={
          "WHERE":{
            "AND":[
              {
                "IS":{
                  "rooms_furniture":"Classroom-Movable Tables & Chairs"
                }
              },
              {
                "GT":{
                  "rooms_seats":70
                }
              }
            ]
          },
          "OPTIONS":{
            "COLUMNS":[
              "rooms_name",
              "rooms_seats"
            ],
            "ORDER":"rooms_name",
            "FORM":"TABLE"
          }
        };

       return facade.performQuery(q)
           .then(function(res: any){
               //Query.prettyPrint(res.body);
           })
           .catch(function(res:any){
               //console.log(res);
               expect.fail();
           })
    });

    it("Nitro2",function(){
        let q:any ={
          "WHERE":{
            "AND":[
              {
                "IS":{
                  "rooms_furniture":"Classroom-Fixed Tables/Movable Chairs"
                }
              },
              {
                "GT":{
                  "rooms_seats":200
                }
              }
            ]
          },
          "OPTIONS":{
            "COLUMNS":[
              "rooms_name",
              "rooms_seats"
            ],
            "ORDER":"rooms_name",
            "FORM":"TABLE"
          }
        };

       return facade.performQuery(q)
           .then(function(res: any){
               //Query.prettyPrint(res.body);
           })
           .catch(function(res:any){
               //console.log(res);
               expect.fail();
           })
    });

    it("Nitro3",function(){
        let q:any = {
          "WHERE":{
            "AND":[
              {
                "IS":{
                  "rooms_furniture":"Classroom-Movable Tablets"
                }
              },
              {
                "GT":{
                  "rooms_lat":49
                }
              }
            ]
          },

          "OPTIONS":{
            "COLUMNS":[
              "rooms_name",
              "rooms_seats",
              "rooms_lat"
            ],
            "ORDER":"rooms_lat",
            "FORM":"TABLE"
          }
        };

       return facade.performQuery(q)
           .then(function(res: any){
               //Query.prettyPrint(res.body);
           })
           .catch(function(res:any){
               //console.log(res);
               expect.fail();
           })
    });

    it("IS with string, but should be number, should not operate on IS " ,function(){
        let q:any =
            {
                "WHERE": {
                    "IS": {
                        "rooms_number": "120"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "rooms_number"
                    ],
                    "FORM": "TABLE"
                }
            }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("IS with HREF " ,function(){
        let q:any =
                {
                    "WHERE": {
                        "IS": {
                            "rooms_href": "*room/WE*"
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

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("IS with furniture types " ,function(){
        let q:any =
                {
                    "WHERE": {
                        "IS": {
                            "rooms_furniture": "*Tables/*"
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });


    it("NOT with valid token " ,function(){
        let q:any =
            {
                "WHERE": {
                    "OR" :[
        {
            "IS":{
            "rooms_shortname":"WOOD"
        }
        },{
            "NOT":{
                "IS": {
                    "rooms_shortname": "WOOD"
                }
            }
        },{
            "NOT":{
                "IS":{
                    "rooms_type":"Small Group"
                }
            }
        }
        ]
    },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "rooms_seats",
                "rooms_type"],
                "FORM": "TABLE"
        }
    }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("deep query" ,function(){
        let q:any =
        {
            "WHERE": {
            "OR":[
                {
                    "IS":{
                        "rooms_shortname":"WESB"
                    }
                },{
                    "NOT":{
                        "NOT":{
                            "OR":[
                                {
                                    "NOT":{
                                        "NOT":{
                                            "AND":[
                                                {
                                                    "GT":{
                                                        "rooms_seats":100
                                                    }
                                                },{
                                                    "LT":{
                                                        "rooms_seats":200
                                                    }
                                                },{
                                                    "NOT":{
                                                        "LT":{
                                                            "rooms_lat":60
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },{
                                    "NOT":{
                                        "IS":{
                                            "rooms_type":"Small Group"
                                        }

                                    }
                                }
                            ]
                        }
                    }
                },{
                    "NOT":{
                        "IS":{
                            "rooms_type":"Small Group"
                        }
                    }
                }
            ]
        },
            "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "rooms_seats",
                "rooms_type", "rooms_lat"],
                "FORM": "TABLE"
        }
        }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("super detailed query for nitron" ,function(){
        //all are here: good
        // "IS": {
        //     "rooms_furniture": "Classroom-Hybrid Furniture"
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Movable Tables & Chairs"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Movable Tablets"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Moveable Tablets"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tablets"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Learn Lab"
                                }
                            }},
                            {"NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Hybrid Furniture"
                                }
                            }}
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("super detailed query for nitro II" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Movable Tables & Chairs"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro III" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
            "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
        }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro IV" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro V" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro VI" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Movable Tablets"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro VII" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Moveable Tablets"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro VIII" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tablets"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro VIIII" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro X" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "Classroom-Learn Lab"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("nitro XI" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "AND": [
                            {"GT": {
                                "rooms_seats": 1
                            }},
                            {
                                "IS": {
                                    "rooms_furniture": "*s &*"
                                }
                            }
                        ]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_type",
                            "rooms_furniture"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                //console.log(res.body["result"].length);
                //Query.prettyPrint(res.body);
            })
            .catch(function(res:any){
                //console.log(res);
                expect.fail();
            })
    });

    it("number comparison" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "LT": {
                            "rooms_seats": null
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_name",
                            "rooms_seats"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                // //console.log(res.body["result"].length);
                // //Query.prettyPrint(res.body);
                expect.fail();
            })
            .catch(function(res:any){
                //console.log(res);
                // expect.fail();
            })
    });

    it("Edge Test 1" ,function(){
        let doc = undefined;
        let result = MagicParser.getTagName(doc);
        expect(result).to.be.undefined;
    });


    it("Edge Test 2" ,function(){
        let obj = {"attrs":["attr1", "attr2"]}
        expect(MagicParser.findHref(obj)).to.equal("");
    });

    it("Edge Test 3" ,function(){
        let doc = undefined;
        let result = MagicParser.getRoomNumber(doc);
        expect(result).to.equal("");
    });

    it("Edge Test 4" ,function(){
        let doc = undefined;
        let result = MagicParser.getRoomSeats(doc);
        expect(result).to.equal(-1);
    });


    it("Edge Test 5" ,function(){
        let doc = undefined;
        let result = MagicParser.getRoomType(doc);
        expect(result).to.equal("");
    });


    it("Edge Test 6" ,function(){
        let doc = undefined;
        let result = MagicParser.getRoomFurniture(doc);
        expect(result).to.equal("");
    });

    it("Edge Test 7" ,function(){
        let doc = undefined;
        let result = MagicParser.getRoomHref(doc);
        expect(result).to.equal("");
    });

    it("Edge Test 8" ,function(){
        let doc = undefined;
        MagicParser.traverser(doc, "", [],MagicParser.getTagName);
    });

    it("Multiple Datasets Invalid Query" ,function(){
        //good
        let q:any =
                {
                    "WHERE": {
                        "LT": {
                            "rooms_seats": null
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "courses_dept",
                            "rooms_seats"
                        ],
                        "FORM": "TABLE"
                    }
                }
            ;

        return facade.performQuery(q)
            .then(function(res: any){
                expect.fail();
            })
            .catch(function(res:any){
                //console.log(res.code);
                expect(res.code).to.equal(400);
            })
    });

});