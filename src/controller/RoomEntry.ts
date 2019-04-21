/**
 * Created by Nyanko on 2/7/2017.
 */
import {IRoomEntry} from "./IInsightFacade";
/**
 * A valid entry of room
 */
export default class RoomEntry implements IRoomEntry{
    rooms_fullname: string;
    rooms_shortname: string;
    rooms_number: string;
    rooms_name: string;
    rooms_address: string;
    rooms_lat: number;
    rooms_lon: number;
    rooms_seats: number;
    rooms_type: string;
    rooms_furniture: string;
    rooms_href: string;

}