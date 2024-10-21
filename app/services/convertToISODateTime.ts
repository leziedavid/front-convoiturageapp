export const convertToISODateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    if(dateTimeStr){
        return date.toISOString();
    }else{
        return null;
    }
};