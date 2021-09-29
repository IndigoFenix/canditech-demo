const queries = [
    `CREATE TABLE IF NOT EXISTS tests (
        id INT AUTO_INCREMENT,
        PRIMARY KEY (id)
)`,
`CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT,
    test_id INT,
    text VARCHAR(255) NOT NULL,
    points FLOAT NOT NULL DEFAULT 0,
    data JSON,
    PRIMARY KEY (id),
    FOREIGN KEY (test_id)
        REFERENCES tests (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
)`]

exports.reset = async(db) => {
    try {
        let tables = ['questions','tests'];
        for (let i=0;i<tables.length;i++){
            await db.query('DROP TABLE IF EXISTS '+tables[i]);
        }
    } catch (error) {
        console.error(error);
    }
}

exports.init = async(db) => {
    try {
        for (let i=0;i<queries.length;i++){
            await db.query(queries[i]);
        }
    } catch (error) {
        console.error(error);
    }
}