var helper = {};


helper.generateRandomString = (stringLength) => {
    stringLength = typeof(stringLength) === 'number' ? stringLength : 20;
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';
    for (i = 0; i < stringLength; i++) {
        var randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str += randomChar;
    }
    return str;
}

helper.formatObject = (oldObject = {}, newObject = {}) => {
    let tempObj = {}
    Object.keys(newObject).map(key => {
        if (oldObject.hasOwnProperty(key)) {
            tempObj[key] = newObject[key];
        }
    })
    return {...oldObject, ...tempObj };
}

helper.fullNameRegexp = /^([a-zA-Z\s]+){2,}$/g;

//This email regexp also accepts custom domain emails like joshua.com.ng
helper.emailRegexp = /^([a-zA-Z0-9\.\-_]+)@([a-zA-z]+)\.([a-z]{2,6}(.[a-z]{2})?)$/g;

// Phone Number Regexp Validation
helper.phoneRegexp = /^[0-9+]{11}$/g;

//Regexp validates dob for valide dd-mm-yyyy
helper.dobRegexp = /(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/g;

//Website url Validate website with any domain extension
helper.websiteRegexp = /^(https?:\/\/+)([a-z0-9]+)\.([a-z]{2,6}(.[a-z]{2})?)$/g;

//Validate street address in this format No 1, my address, state, country.
helper.streetAddressRegexp = /^([N|n]o\s\d+),\s?([\w+\s?\w?]+),\s?([\w+\s?\w?]+),\s?([\w+\s?\w?]+?)\.?$/g;


module.exports = helper;