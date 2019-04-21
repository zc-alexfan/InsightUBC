/**
 * Created by zfan on 2017-03-25.
 */
import Room from "./Room";
import Section from "./Section";


export default class Schedule {
    public static vecPrint(vec: any[]) {
        vec.forEach(
            (s) => {
                s.print();
            }
        );
    }

    public static scheduleOneRoom(secs: any[], oneRoom: Room): any[] {
        let MAX_SECTIONS_OF_COURSE = 15;
        let remain = [];
        for (let i = 0; i < secs.length; i++) {
            if(secs[i].getMySection() > MAX_SECTIONS_OF_COURSE){
                remain.push(secs[i]);
                continue;
            }

            let good = oneRoom.insertSoft(secs[i].getid(), 0, secs[i].getsize());
            if (!good) good = oneRoom.insertSoft(secs[i].getid(), 1, secs[i].getsize());
            if (!good) {
                remain.push(secs[i]);
            }
        }
        return remain;
    }


    //########
    //assume there is no course with more than 15 sections,
    //under this reasonable assumption, no section of the same course can occur at the same time
    public static scheduleAllRooms(secs: any[], rooms: Room[]): Section[]{
        let num_secs = secs.length;
        rooms = Room.sortBySize(rooms);
        secs = Section.sortBySize(secs);

        console.log(">>>>>>>>**");
        Schedule.vecPrint(rooms);
        console.log("\n");
        Schedule.vecPrint(secs);
        console.log("**<<<<<<<<");

        for (let i = 0; i < rooms.length; i++) {
            //no more sections
            if (secs.length == 0)return [];
            secs = Schedule.scheduleOneRoom(secs, rooms[i]);
        }
        return secs;
    }


    public static cost(soln: Room[], numCourses: number): number {
        let count = 0;
        soln.forEach(
            (x: Room) => {
                count += x.getScore();
            }
        );
        return (count / numCourses);
    }


}






