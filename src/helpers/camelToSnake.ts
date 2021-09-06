export const camelToSnake = (key: string): string => {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export const camelToSnakeObj = <T = { [ key: string ]: any; }, R = { [ key: string ]: any; }>(data: T): R => {
    const newObject: R = {} as R;
    for (let key in data) {
        newObject[camelToSnake(key)] = data[key];
    }
    return newObject;
}
