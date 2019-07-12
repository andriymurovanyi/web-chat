const config = {
    app:{
        port: 3000
    },

    db:{
        host: "localhost",
        port: "27017",
        name: "test",
        connectionString: "mongodb://localhost:27017/",
        newUrlParser: true
    }
};

module.exports = config;
