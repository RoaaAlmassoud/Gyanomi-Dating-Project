
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

        if (response.data && response.status === 200 && response.data.code === 0) {
            // const firstKey = Object.keys(data);
            // return data[firstKey];
            result['data'] = response.data;
        }

        if (response.data && response.data.code !== 0) {
            result = response.data;

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

    static getMonthName(id) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        if(monthNames[id]){
            return monthNames[id]
        } else {
            return null
        }

    }

}