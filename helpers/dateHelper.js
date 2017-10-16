export function convertMonthToWord(month) {
    if (month >= 1 && month <= 12) {
        let words = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return words[month - 1];
    }
    return '';
};

export function convertToString(date, option) {
    if (date) {
        option = checkDateOptions(option);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], option);
    }
    return '';
};

export function convertToDateString(date, option) {
    if (date) {
        return date.toLocaleDateString([], option);
    }
    return '';
};

export function convertToTimeString(date, option) {
    if (date) {
        option = checkDateOptions(option);
        return date.toLocaleTimeString([], option);
    }
    return '';
};

function checkDateOptions(option) {
    if (!option)
        option = {};
    if (!option.hour12)
        option.hour12 = false;

    return option;
};
