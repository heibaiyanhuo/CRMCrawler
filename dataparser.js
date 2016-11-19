'use strict'

let mysql = require('mysql');

let PropertiesReader = require('properties-reader');
let properties = PropertiesReader('properties.file');

let pool = mysql.createPool({
    host: properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.password').toString(),
    database: properties.get('db.database'),
    port: properties.get('db.port').toString()
});

module.exports = {
    insert: function(data, callback) {
        pool.getConnection(function (error, connection) {
            if (error) {
                callback(error);
            } else {
                let sql = 'INSERT INTO students (name, phone, school, major, degree_in_application, major_in_application, country_in_application, current_grade, basic_information, last_record, channels, level, stuid) VALUES("' + data[0] + '", "' + data[1] + '", "' + data[2] + '", "' + data[3] + '", "' + data[4] + '", "' + data[5] + '", "' + data[6] + '", "' + data[7] + '", "' + data[8].replace(new RegExp('"', "gm"), '\"') + '", "' + data[9].replace(new RegExp('"', "gm"), '\"') + '", "' + data[10] + '", "' + data[11] + '", ' + data[12] + ')' ;

                connection.query(sql, function (err, results) {
                    console.log('Writing data into database, stuid=' + data[12]);
                    if (err) {
                        console.log('Error!');
                        callback(err);
                    } else {
                        console.log('Completed!');
                        callback(null);
                    }
                });
            }
        })
    },
    end: function () {
        pool.end();
    } 
}