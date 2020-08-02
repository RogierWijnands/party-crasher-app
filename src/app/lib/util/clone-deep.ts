export const cloneDeep = (iterable: any[] | {[key: string]: any}) => {
    return JSON.parse(JSON.stringify(iterable));
}