import date from "date-and-time";

export function formatDate(object:any, format:string) {
    return date.format(object, format);
}