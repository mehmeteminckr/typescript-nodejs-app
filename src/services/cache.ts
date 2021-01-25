const { Query }  = require("mongoose");
const redis = require("redis");
const { promisify } = require('util');

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient({
    host: redisUrl,
    port:6379
});
client.get = promisify(client.get);

const { exec } = Query.prototype;

Query.prototype.cache = function cache(options: any) {
    this.useCache = JSON.stringify(options.key || undefined);
    return this;
}

Query.prototype.exec = async function overrideExec(... params: any[]){
    if(this.useCache === undefined){
        return exec.apply(this, params);
    }

    try {
        const cacheValue = await client.get(this.useCache);
        if(cacheValue){
            const cacheObject = JSON.parse(cacheValue);
            return Array.isArray(cacheObject)
            ? cacheObject.map(doc => new this.model(doc))
            : new this.model(cacheObject);
        }

        const result = await exec.apply(this,params);
        client.set(this.useCache,JSON.stringify(result));
        return result;

    }
    catch (err) {
        return err;
    }

}

module.exports = {
    clearCache(key: any) {
        client.del(JSON.stringify(key));
    }
}