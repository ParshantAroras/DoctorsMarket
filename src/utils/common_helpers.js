/*
Capitalize Letters
*/
export const capitalizeFirstLetter=(str)=> {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

/*
Appending Zeros to number
*/

export const leftPad=(number, targetLength)=> {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}