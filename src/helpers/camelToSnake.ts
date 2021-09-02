export const camelToSnake = (key: string) => {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export const camelToSnakeObj = (data: { [ key: string ]: any; }) => {
    const newObject: { [ key: string ]: any; } = {};
    for (let key in data) {
        newObject[camelToSnake(key)] = data[key];
    }
    return newObject;
}
