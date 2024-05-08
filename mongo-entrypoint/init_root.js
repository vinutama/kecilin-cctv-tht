const {MONGO_INITDB_DATABASE, INIT_DB_USER, INIT_DB_PASSWORD} = process.env;
db.createUser({
    user: INIT_DB_USER,
    pwd: INIT_DB_PASSWORD,
    roles: [ { role: "readWrite", db: MONGO_INITDB_DATABASE} ]
});