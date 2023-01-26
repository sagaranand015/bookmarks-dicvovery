//Helper function to parse callback
export const getQueryStringParams = (query: any) => {
    console.log("======= query is: ", query);
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split(/[\?\&]/)
            .reduce((params: any, param: any) => {
                let [key, value] = param.split("=");
                params[key] = value
                    ? decodeURIComponent(value.replace(/\+/g, " "))
                    : "";
                return params;
            }, {})
        : {};
};