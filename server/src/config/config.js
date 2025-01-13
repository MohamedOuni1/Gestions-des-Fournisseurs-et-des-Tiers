require ("dotenv").config();

const config={
    DB_URL: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'

}

module.exports=config;