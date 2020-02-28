export function memoize<CustomFunc extends (...args: any[]) => any>(func: CustomFunc) {
    let cache: { [key: string]: () => void } = {};

    return function (key: string, ...args: Parameters<CustomFunc>) {
        if (!cache[key]) {
            cache[key] = () => func(...args);
        }

        return cache[key];
    }
}