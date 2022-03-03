
export default class HelperFunctions {
    static isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    static getResponseData = (response) => {
        if (this.isEmpty(response)) return null;

        let result = {};

        if (response.data) {
            // const firstKey = Object.keys(data);
            // return data[firstKey];
            result = response.data;
        }

        if (response.data && response.data.errors) {
            result = response.data.errors[0].message;

        }

        return !this.isEmpty(result) ? result : null;
    };


    static isObject = (obj) => typeof obj === 'object';

    static unique = () => Math.random().toString().substr(2, 8);

    static empty = (value) => {
        return value || '-'
    };

    static emptyString(value) {
        return (typeof value === "undefined" || typeof value === 'undefined' || typeof value === undefined || value === null || value === '' || value === "" || value.length === 0 || value === 'undefined');
    }

}