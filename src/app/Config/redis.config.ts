import { createClient } from 'redis';
import { envVars } from './env';

export const redisClient = createClient({
    username: envVars.REDIS.USERNAME,
    password: envVars.REDIS.PASSWORD,
    socket: {
        host: envVars.REDIS.REDIS_HOST,
        port: Number(envVars.REDIS.REDIS_PORT)
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));


// await redis_client.set('foo', 'bar');
// const result = await redis_client.get('foo');
// console.log(result)  // >>> bar

export const redisConnect=async()=>
{
    if (!redisClient.isOpen)
    {
        await redisClient.connect();
        console.log("Redis Connected")
    }
}