const	mysql = require('mysql');
const   util = require('util');

exports.init = () => {
    let db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'canditech',
        port: '3306'
    });
    db.queryAsync = util.promisify(db.query).bind(db);
    return db;
}

exports.query = (db,queryparams) => {
    return new Promise((resolve,reject)=>{

    });
}

exports.connect = (db) => {
    return new Promise((resolve,reject)=>{
        db.connect(function(err) {
            if (err) {
                reject('error: ' + err.message);
            } else {
                console.log('Database connected');
                resolve(db);
            }
        });
    })
}

exports.close = (db) => {
    return new Promise((resolve,reject)=>{
        db.end(function(err) {
            if (err) {
                reject('error: ' + err.message);
            } else {
                resolve(db);
            }
        });
    });
}