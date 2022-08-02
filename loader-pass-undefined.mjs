export function resolve(url, context, next) {
    return next(url, context, undefined);
}