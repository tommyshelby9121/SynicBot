import date from "date-and-time";

export function formatDate(object:any, format:string) {
    date.format(object, format);
}