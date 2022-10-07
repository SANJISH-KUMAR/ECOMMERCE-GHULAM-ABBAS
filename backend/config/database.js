const mongoose = require('mongoose');

const connectDatabase = () => {
    // connect to mongoose database and pass url of database
    // from config.env file (DB_LOCAL_URI)

    // Using mongoose, a user can define the schema for the
    // documents in a particular collection.
    // ie you can create tables using mongoose inside mongodb
    // database
    // DB_LOCAL_URI is set in config.env
    //and is = mongodb://localhost:27017/shopit where shopit
    // is the name of our database
    //connect to mongodb database shopit using mongoose
    //mongoose.connect ("mongodb://localhost/shopit")
    mongoose
        .connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // not valid in version 6.0
            // useCreateIndex: true,
        })
        .then((con) => {
            console.log(
                `MongoDB database connected with HOST : ${con.connection.host}`
            );
        });
};

module.exports = connectDatabase;