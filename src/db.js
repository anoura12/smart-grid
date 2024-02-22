const sqlite3 = require('sqlite3').verbose();

const getDB = () => {
    return new sqlite3.Database(
       'src/database/data.db',
        (err) => {
            if (err) {
                console.error(err.message);
            }
        }
    );
};

export default getDB;

