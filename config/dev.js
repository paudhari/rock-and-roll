// configuration file for dev env.
module.exports = {
    node : {
        port : 3000,
        domain_name : "127.0.0.1",
        proto : "http:"
    },
    logLevel : "info",
    db: {
        mongo: [{
            name: "rockAndRoll",
            database: "rockAndRoll",
            host: "127.0.0.1",
            port: "27017",
            mongoUri: "mongodb://localhost"
        }]
    }
}