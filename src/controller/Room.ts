/**
 * Created by zfan on 2017-03-25.
 */

import Query from "./Query";
export default class Room{
    static TYPE_MON:number = 0;
    static TYPE_TUE:number = 1;
    id:string;
    size:number;
    schedule:any[];
    static maxBlock:any[] = [9, 6];
    index:any[]; //pointing to the next block

    constructor(id:string, size:number){
        this.index = [];
        this.index[0] = 1;
        this.index[1] = 1;
        this.schedule = [{},{}];
        this.id = id;
        this.size = size;
    };

    isFull():boolean{
        return (this.index[Room.TYPE_MON] > Room.maxBlock[Room.TYPE_MON]
        && this.index[Room.TYPE_TUE] > Room.maxBlock[Room.TYPE_TUE]) ;
    }

    //insert course but make sure max is not reached
    //return the result of a insertion
    //if max is reached, return false
    insertSoft(course_id:string, type:number, demand_size:number):boolean{
        if(type != Room.TYPE_MON && type != Room.TYPE_TUE)return false;
        if(this.index[type] > Room.maxBlock[type])return false;
        if(demand_size > this.size)return false;
        this.insertHard(course_id, type);
        return true;
    }

    //forcing insert, even if the max is reached
    insertHard(course_id:string, type:number){
        this.schedule[type]["" + this.index[type]] = course_id;
        this.index[type]++;
    }

    printSchedule(){
        console.log("**>>>>>>" + this.getInfo());
        console.log("TYPE_MON");
        Query.prettyPrint(this.schedule[Room.TYPE_MON]);
        console.log("TYPE_TUE");
        Query.prettyPrint(this.schedule[Room.TYPE_TUE]);
        console.log("<<<<<<**\n");
    }

    getInfo():string{
        return (this.id+" [" +this.size + "]");
    }

    getName():string{
        return (this.id+" [" +this.size + "]");
        //return this.id;
    }

    //print in the form:
    //DMP310 [150]
    print(){
        console.log(this.getInfo());
    }

    getMonSchedule(){

        let js = this.schedule[0];
        //convert to the table indexing
        let keys = Object.keys(js);
        let result:any = {};
        keys.forEach(
            (k)=>{
                let val = js[k];
                let ind = (parseInt(k)-1)*2 + 1;
                result[''+ind] = val;
            }
        );
        return result;
    }

    getTuesSchedule(){
        let js = this.schedule[1];
        //convert to the table indexing
        let keys = Object.keys(js);
        let result:any = {};
        keys.forEach(
            (k)=>{
                let val = js[k];
                let ind = (parseInt(k)-1)*3 + 1;
                result[''+ind] = val;
            }
        );
        return result;
    }
    //get amount of courses scheduled outside of max sections
    getScore(){
        return Math.max(this.index[Room.TYPE_MON]- 1 - Room.maxBlock[Room.TYPE_MON], 0)+
         Math.max(this.index[Room.TYPE_TUE] - 1 - Room.maxBlock[Room.TYPE_TUE], 0);
    }

    getsize():number{
        return this.size;
    }


    static sortBySize(items:Room[]):Room[] {
        var length = items.length;
        for (var i = 0; i < length - 1; i++) {
            var max = i;
            for (var j = i + 1; j < length; j++) {
                if (items[j].getsize() > items[max].getsize()) {
                    max = j;
                }
            }
            if (max != i) {
                var tmp = items[i];
                items[i] = items[max];
                items[max] = tmp;
            }
        }
        return items;
    }

    static constructVecRoom(list:any[]):Room[] {
        let result:any[] = [];
        let s:Room;
        list.forEach(
            (roomJS)=>{
                let name = roomJS['rooms_name'];
                let size = roomJS['rooms_seats'];
                s = new Room(name, parseInt(size));
                result.push(s);
            }
        );
        return result;
    }
};