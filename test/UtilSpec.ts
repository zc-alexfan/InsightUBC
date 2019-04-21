import Log from "../src/Util";
/**
 * Created by Nyanko on 2/4/2017.
 */

describe("UtilSpec", function(){
   before(function(){

   }) ;

   beforeEach(function(){

   });

   after(function(){

   });

   afterEach(function(){

   });

   it("Log info: ", function(){
      Log.info("HelloWorld");
   });

   it("Log warn: ", function(){
       Log.warn("HelloWorld");
    });

   it("Log error: ", function(){
       Log.error("HelloWorld");
   });

   it("Log deBugPrint: ", function(){
      Log.debugPrint("hello");
   });
});