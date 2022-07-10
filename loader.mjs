export async function resolve(url, context, next) {
    console.log(`loader resolve(${url})`);
    return next(url, context);
}