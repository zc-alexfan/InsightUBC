/**
 * Created by zfan on 2017-03-25.
 */

export default class Section{
    course_name:string;
    size:number;
    section_id:number;
    num_section: number; //number of sections of the same course

    constructor(id:string, size:number, section_id:number, num_sections:number){
        this.course_name = id;
        this.size = size;
        this.section_id  = section_id;
        this.num_section = num_sections;
    };

    getsize():number{
        return this.size;
    }

    getid():string{
        return this.course_name + ' ['
            + this.section_id + '/' + this.num_section+ ']<br/>size: ' + this.size;
    }

    getidOnly():string{
        return this.course_name + ' ('
            + this.section_id + '/' + this.num_section+ ')[' + this.size + ']';
    }

    getMySection():number{
        return this.section_id;
    }

    getNumSections():number{
        return this.num_section;
    }

    print(){
        console.log(this.getid()+" [" + this.getsize() + "]");
    }

    static sortBySize(items:Section[]):Section[] {
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

    static constructVecSection(list:any[]):Section[] {
        let result:any[] = [];
        let s:Section;
        list.forEach(
            (courseJS)=>{
                let dept = courseJS['courses_dept'];
                let id = courseJS['courses_id'];
                let size = courseJS['maxsectionsize'];
                let num_sec = Math.ceil(parseInt(courseJS['numsection2014'])/3);
                for(let i = 1 ; i<= num_sec; i++){
                    s = new Section(dept+id, parseInt(size), i, num_sec);
                    result.push(s);
                }
            }
        );
        return result;
    }

}

