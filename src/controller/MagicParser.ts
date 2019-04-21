

import {IRoomEntry, GeoResponse} from "./IInsightFacade";
import LocationIO from "./LocationIO";
export default class MagicParser {
    private docu:any;
    // private shortname:string;
    public static p:any = require("parse5");
    constructor(html:string){
        this.docu = MagicParser.p.parse(html);
        // this.shortname = shortName;
    }

    //recursively travsere the parse5 tree and push the element with the tag into the output array
    static traverser(doc:any, val:string, output:any[], getter:any):void{
        if(doc == undefined){ return ; }
        if(getter(doc) != undefined && getter(doc) == val){
            output.push(doc);
        }
        if(doc.childNodes != undefined && doc.childNodes.length > 0){
            for(let i = 0; i < doc.childNodes.length; i++){
                MagicParser.traverser(doc.childNodes[i], val, output, getter);
            }
        }
    }

    /*
    public print():void{
        console.log(this.docu);
    }
    */
    static getAttr(vec_attrs:any[], attrType:string):any{
        if(vec_attrs == undefined || vec_attrs.length == 0)return undefined;
        for(let i = 0;i < vec_attrs.length; i++){
            if( vec_attrs[i] != undefined &&
                vec_attrs[i].name != undefined &&
                vec_attrs[i].name == attrType){
                return vec_attrs[i].value;
            }
        }
        return undefined;
    }

    static getTagName:any = (doc:any)=>{
        if(doc == undefined)return doc;
        return doc.tagName
    };

    static getClassName:any = (doc:any)=>{
        if(doc.attrs == undefined)return undefined;
        return MagicParser.getAttr(doc.attrs, 'class');
    };

    /*
    static getId:any = (doc:any)=> {
        if(doc.attrs == undefined)return undefined;
        return MagicParser.getAttr(doc.attrs, 'id');
    };

    public findElementsById(id:string):any[]{
        let vec:any[] = [];
        MagicParser.traverser(this.docu, id, vec, MagicParser.getId);
        return vec;
    }
    */

    public findElementsByClassName(classname:string):any[]{
        let vec:any[] = [];
        MagicParser.traverser(this.docu, classname, vec, MagicParser.getClassName);
        return vec;
    }


    public findElementsByTagName(tag:string):any[]{
        let vec:any[] = [];
        MagicParser.traverser(this.docu, tag, vec, MagicParser.getTagName);
        return vec;
    }

    public static findHref (anchor: any):string{
        let keys : any = Object.keys(anchor);
        if (keys.indexOf("attrs") != -1){
            let arr : any [] = anchor["attrs"];
            // console.log(arr);
            for (let i = 0; i < arr.length; i++){
                let attr : any = arr[i];
                keys = Object.keys(attr);
                // console.log(keys);
                if (keys.indexOf("name") != -1 && keys.indexOf("value") != -1){
                    if (attr["name"] == "href"){
                        // console.log(attr["value"]);
                        return attr["value"];
                    }
                }
            }
        }
        //can't find it
        return "";
    }

    //normalize a string into required format
    public static normalize(str:string):string{
        let target = '&amp;'; return str.replace(target, '&');
    }

    public getBuildingName():string{
        let tmp = this.findElementsByTagName('h2');
        let s : string  = tmp[1].childNodes[0].childNodes[0].value.trim();
        return s;
    }

    public static getRoomNumber(tr:any):string{
        if(tr == undefined ||
            tr.childNodes == undefined ||
            tr.childNodes[1] == undefined ||
            tr.childNodes[1].childNodes == undefined ||
            tr.childNodes[1].childNodes[1] == undefined
        ){ return ''; }
        return MagicParser.p.serialize(tr.childNodes[1].childNodes[1]).trim();
    }

    //a vector of tr array, each tr is a Element type
    //return a list of IRoomEntry (type json[])
    public tableRealizer(shortname:string): Promise<IRoomEntry[]> {
        let that: any = this;
        return new Promise<IRoomEntry[]>(function (fulfill, reject) {
            let vec: any[] = that.findElementsByTagName('tr');
            vec = vec.splice(1, vec.length - 1);
            let addr: string = that.getRoomAddress();
            LocationIO.getGeoLocation(addr)
                .then(function(geo:GeoResponse) {
                    let pList: Promise<IRoomEntry>[] = [];
                    for (let i = 0; i < vec.length; i++) {
                        pList.push(that.tableRealizerForOneEntry(vec[i],shortname,addr,geo.lat,geo.lon));
                    }

                    return Promise.all(pList)
                })
                .then(function (rooms: IRoomEntry[]) {
                    fulfill(rooms);
                })
                .catch(function (e: any) {
                    reject(e);
                });
        });
    }

    private tableRealizerForOneEntry(vec: any,shortname:string, addr: string, lat: number, lon: number): IRoomEntry {
        let roomNum: string = MagicParser.getRoomNumber(vec);
        let entry: IRoomEntry = {
            rooms_fullname: MagicParser.normalize( this.getBuildingName() ) ,
            rooms_shortname: MagicParser.normalize(shortname) ,
            rooms_number: roomNum,
            rooms_name: shortname + "_" + roomNum,
            rooms_address: MagicParser.normalize( addr ) ,
            rooms_lat: lat,
            rooms_lon: lon,
            rooms_seats: MagicParser.getRoomSeats(vec),
            rooms_type: MagicParser.normalize( MagicParser.getRoomType(vec) ) ,
            rooms_furniture: MagicParser.normalize( MagicParser.getRoomFurniture(vec) ) ,
            rooms_href: MagicParser.getRoomHref(vec)
        };
        return entry;
    }

    public getRoomAddress():string{
        let tmp:any = this.findElementsByClassName('field-content');
        // console.log(tmp[1].childNodes[0].value.trim());
        tmp = tmp[1].childNodes[0].value.trim();
        return tmp;
    }

    public static getRoomSeats(tr:any):number{
        if(tr == undefined || tr.childNodes == undefined || tr.childNodes[3] == undefined){ return -1; }
        let tmp = tr.childNodes[3];
        tmp = MagicParser.p.serialize(tmp).trim();
        return parseInt(tmp);
    }

    public static getRoomType(tr:any):string{
        if(tr == undefined || tr.childNodes == undefined || tr.childNodes[7] == undefined){ return ''; }
        let tmp = tr.childNodes[7];
        tmp = MagicParser.p.serialize(tmp).trim();
        return tmp;
    }

    public static getRoomFurniture(tr:any):string{
        if(tr == undefined || tr.childNodes == undefined || tr.childNodes[5] == undefined){ return ''; }
        let tmp = tr.childNodes[5];
        tmp = MagicParser.p.serialize(tmp).trim();
        return tmp;
    }

    public static getRoomHref(tr:any):string{
        if(tr == undefined || tr.childNodes == undefined || tr.childNodes[6] == undefined
            ||tr.childNodes[9].childNodes == undefined
            ||tr.childNodes[9].childNodes[1] == undefined
            ||tr.childNodes[9].childNodes[1].attrs == undefined
            ||tr.childNodes[9].childNodes[1].attrs[0] == undefined
            ||tr.childNodes[9].childNodes[1].attrs[0].value == undefined
        ){ return ''; }
        return tr.childNodes[9].childNodes[1].attrs[0].value.trim();
    }

}