
const utils = {
    //used to change https -> http in image_urls
    removeFirstOccurrence: (str, searchstr) => {
        var index = str == null ? -1 : str.indexOf(searchstr);
        if (index === -1) {
            return str;
        }
        return str.slice(0, index) + str.slice(index + searchstr.length);
    },
    now: () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        console.log(`${(now.getMonth() + 1)}/${now.getDate()}/${now.getFullYear()} ${hours}:${minutes}${ampm}`);
        return {
            date: `${(now.getMonth() + 1)}/${(now.getDate() - 1)}/${now.getFullYear()}`,
            time: `${hours}:${minutes}${ampm}`
        };
    }
}


export default utils;