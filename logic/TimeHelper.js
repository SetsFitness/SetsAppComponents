/**
 * TODO
 *
 * @param dateTime
 * @return {string}
 */
export function convertFromISO(dateTime) {
    let dateTimeString = String(dateTime);
    let date = new Date(dateTimeString);
    const hourInt = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes().toString().length === 1 ? '0'+ date.getMinutes() : date.getMinutes(),
        hours = hourInt.toString().length === 1 ? '0'+ hourInt : hourInt,
        ampm = date.getHours() >= 12 ? 'PM' : 'AM',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[date.getDay()]+', '+months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()+' '+hours+':'+minutes+ampm;
}

/**
 * TODO
 *
 * @param dateTime
 * @return {string}
 */
export function convertFromIntervalISO(dateTime) {
    let dateTimeString = String(dateTime);
    let dateTimes = String(dateTimeString).split("_");
    let fromDateString = dateTimes[0];
    let toDateString = dateTimes[1];
    let fromDate = new Date(fromDateString);
    let toDate = new Date(toDateString);

    // Display time logic came from stack over flow
    // https://stackoverflow.com/a/18537115
    const fromHourInt = fromDate.getHours() > 12 ? fromDate.getHours() - 12 : fromDate.getHours();
    const toHourInt = toDate.getHours() > 12 ? toDate.getHours() - 12 : toDate.getHours();
    const fromminutes = fromDate.getMinutes().toString().length === 1 ? '0'+ fromDate.getMinutes() : fromDate.getMinutes(),
        fromhours = fromHourInt.toString().length === 1 ? '0'+ fromHourInt : fromHourInt,
        fromampm = fromDate.getHours() >= 12 ? 'PM' : 'AM',
        tominutes = toDate.getMinutes().toString().length === 1 ? '0'+ toDate.getMinutes() : toDate.getMinutes(),
        tohours = toHourInt.toString().length === 1 ? '0'+ toHourInt : toHourInt,
        toampm = toDate.getHours() >= 12 ? 'PM' : 'AM',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[fromDate.getDay()]+', '+months[fromDate.getMonth()]+' '+fromDate.getDate()+', '+fromDate.getFullYear()+' '+fromhours+':'+fromminutes+fromampm + ' - '+tohours+':'+tominutes+toampm;
}

/**
 * TODO
 *
 * @param s
 * @return {Date}
 */
export function parseISOString(s) {
    return new Date(String(s));
}

/**
 * TODO
 *
 * @param date
 * @return {string}
 */
export function convertToISOString(date) {
    const tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            const norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

/**
 * TODO
 *
 * @return {string}
 */
export function getNowISO() {
    return convertToISOString(new Date());
}

/**
 * TODO
 *
 * @param birthday
 * @return {*}
 */
export function calculateAge(birthday) {
    // TODO Use more libraries to calculate this way better
    if (birthday) {
        const now = new Date();
        const birthdayDate = parseISOString(birthday);
        let one_year = 1000 * 60 * 60 * 24 * 365;                       // Convert both dates to milliseconds
        let date1_ms = birthdayDate.getTime();
        let date2_ms = now.getTime();                   // Calculate the difference in milliseconds
        let difference_ms = date1_ms - date2_ms;        // Convert back to days and return
        return Math.round(difference_ms / one_year);
    }
    return null;
}

/**
 * TODO
 *
 * @param fromDate
 * @param toDate
 * @return {string}
 */
export function convertToISOIntervalString(fromDate, toDate) {
    return convertToISOString(fromDate) + "_" + convertToISOString(toDate);
}

/**
 * TODO
 *
 * @param dateTime
 * @return {number}
 */
export function daysLeft(dateTime) {
    const now = new Date();
    let one_day=1000*60*60*24;                       // Convert both dates to milliseconds
    let date1_ms = dateTime.getTime();
    let date2_ms = now.getTime();                   // Calculate the difference in milliseconds
    // console.log("1: " + date1_ms + ", 2: " + date2_ms);
    let difference_ms = date1_ms - date2_ms;        // Convert back to days and return
    // console.log("difference = " + difference_ms);
    return Math.round(difference_ms/one_day);
}

/**
 * TODO
 *
 * @param dateTime
 * @return {number}
 */
export function timeLeft(dateTime) {
    const now = new Date();
    return dateTime.getTime() - now.getTime();
}

/**
 * TODO
 *
 * @param time
 * @return {string}
 */
function convertTime(time) {
    if (parseInt(time, 10) > 12) {
        return "0" + (parseInt(time, 10) - 12) + time.substr(2, 3) + "pm";
    }
    else if (parseInt(time, 10) === 12) {
        return time + "pm";
    }
    else if (parseInt(time, 10) === 0) {
        return "0" + (parseInt(time, 10) + 12) + time.substr(2, 3) + "am"
    }
    else {
        return time + "am"
    }
}

/**
 * TODO
 *
 * @param date
 * @return {string}
 */
function convertDate(date) {
    let dateString = String(date);
    let year = dateString.substr(0, 4);
    let month = dateString.substr(5, 2);
    let day = dateString.substr(8, 2);

    return month + "/" + day + "/" + year;
}

/**
 * Returns the number of midnights that have passed between the two dates.
 *
 * @param from The from {@link Date} object.
 * @param to The from {@link Date} object.
 * @return {number} The number of midnights that have passed between the two dates.
 */
export const midnightsBetween = (from, to) => {
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    let one_day=1000*60*60*24;                       // Convert both dates to milliseconds
    let date1_ms = to.getTime();
    let date2_ms = from.getTime();                   // Calculate the difference in milliseconds
    // console.log("1: " + date1_ms + ", 2: " + date2_ms);
    let difference_ms = date1_ms - date2_ms;        // Convert back to days and return
    // console.log("difference = " + difference_ms);
    return Math.round(difference_ms/one_day);
};

/**
 * Calculates the number of midnights that have passed between today and the day of the date that is passed in.
 *
 * @param dateTime The {@link Date} object to reference from today.
 * @return {number} The number of midnights between now and the given date.
 */
export const midnightsPassed = (dateTime) => {
    return midnightsBetween(dateTime, new Date())
};

/**
 * Gets the now date-time string, rounded up to the nearest five minutes interval.
 *
 * @return {string} The today datetime string.
 * @return {*}
 */
export const getTodayDateTimeString = () => {
    // This is annoying just because we need to work with time zones :(
    // Sneaking some modular arithmetic in this ;) This is so that the time shown is always a nice looking number
    const shortestTimeInterval = 5;
    const date = new Date();
    date.setMinutes(date.getMinutes() + (shortestTimeInterval - (date.getMinutes() % shortestTimeInterval)));
    return convertToISOString(date);
};

/**
 * Gets the today date string, rounded up to the nearest five minutes interval.
 *
 * @return {string} The today date string.
 */
export const getTodayDateString = () => {
    return getTodayDateTimeString().substr(0, 10);
};

/**
 * Gets the now time string, rounded up to the next five minutes.
 *
 * @return {string} The string of the time.
 */
export const getNowTimeString = () => {
    return getTodayDateTimeString().substr(11, 5);
};
