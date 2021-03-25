
const utils = {
    //used to change https -> http in image_urls
    removeFirstOccurrence: (str, searchstr) => {
        var index = str == null ? -1 : str.indexOf(searchstr);
        if (index === -1) {
            return str;
        }
        return str.slice(0, index) + str.slice(index + searchstr.length);
    }
}

export default utils;