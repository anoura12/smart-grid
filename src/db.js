const sqlite3 = require('sqlite3').verbose();

const getDB = () => {
    return new sqlite3.Database(
        'src/data.db',
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error(err.message);
            }
        }
    );
};

export default getDB;