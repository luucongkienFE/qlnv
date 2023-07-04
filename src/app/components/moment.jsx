import moment from "moment";
export const formatData = (data)=>{
    return moment(data).format("YYYY-MM-DD");
}
export const formatDataDate = (data)=>{
    return moment(data).format("DD-MM-YYYY");
}
