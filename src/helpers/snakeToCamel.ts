export const snakeToCamel = (s: string) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export const snakeToCamelObj = (data: { [ key: string ]: any; }) => {
    const newObject: { [ key: string ]: any; } = {};
    for (let key in data) {
        newObject[snakeToCamel(key)] = data[key];
    }
    return newObject;
}