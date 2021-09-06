export const snakeToCamel = (s: string): string => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export const snakeToCamelObj = <T = { [ key: string ]: any; }, R = { [ key: string ]: any; }>(data: T): R => {
    const newObject: R = {} as R;
    for (let key in data) {
        newObject[snakeToCamel(key)] = data[key];
    }
    return newObject;
}