const {
	MYSQL_HOST: HOST,
	MYSQL_HOST_FILE: HOST_FILE,
	MYSQL_USER: USER,
	MYSQL_USER_FILE: USER_FILE,
	MYSQL_PASSWORD: PASSWORD,
	MYSQL_PASSWORD_FILE: PASSWORD_FILE,
	MYSQL_DB: DB,
	MYSQL_DB_FILE: DB_FILE,
} = process.env;

const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
const db = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

module.exports = {
	host,
	user,
	password,
	db,
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
};

