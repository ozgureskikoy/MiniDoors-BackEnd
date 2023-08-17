const Redis = require("ioredis");
const configuration = require('./redisOptions');

const redisClient = new Redis(configuration);
    
    redisClient.on("connect", () => {
        console.log("Connected to Redis");
    });



exports.redisSet = async (key, value, expirationTime) => {
    const redisClient = new Redis(configuration);
    
    redisClient.on("connect", () => {
        console.log("Connected to Redis");
    });
    redisClient.set(key, value, "EX", expirationTime, (err, reply) => {
        if (err) {
            console.error("Error:", err);
            return err;
        } else {
            console.log("Data saved:", reply);
            return reply;
        }

    });
}


exports.redisGet = async (key) => {
    return new Promise((resolve, reject) => {
        const redisClient = new Redis(configuration);
    
        redisClient.on("connect", () => {
            console.log("Connected to Redis");
        });

        redisClient.get(key, (err, value) => {
            if (err) {
                console.error("Error:", err);
                reject(err);
            } else {
                console.log("Retrieved value:", value);
                resolve(value);
            }

            redisClient.quit();
        });
    });
};

exports.redisDel = (key) => {
    const redisClient = new Redis(configuration);
    
    redisClient.on("connect", () => {
        console.log("Connected to Redis");
    });
    redisClient.del(key, (err, result) => {
        if (err) {
            console.error("Error:", err);
        } else {
            if (result === 1) {
                console.log("Key deleted successfully");
            } else if (result === 0) {
                console.log("Key not found");
            }
        }

    });
}

redisClient.quit();


redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});
