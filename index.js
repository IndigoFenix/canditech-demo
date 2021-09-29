require('dotenv').config();

const 	express = require('express');
const 	cors = require('cors');
const 	bodyParser = require('body-parser');
const 	morgan = require('morgan');
const 	path = require('path');
const 	busboy = require('connect-busboy'); //Parse form data
const 	port = process.env.PORT || 8080;
const 	host = process.env.BASE_URL || 'http://127.0.0.1';
const	mysql = require('mysql');
//const	conn = require('./db/conn');

const app = express();

const server = require('http').createServer(app);

app.use(busboy());

app.use(bodyParser.json({limit: '10000000mb'}));
app.use(bodyParser.urlencoded({limit: '10000000mb', extended: true}));
app.set('appName', 'canditech');

//let c = conn.init();
//conn.connect(c);

const db = require("./models");
//db.sequelize.sync();
//Reload tables
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});
app.set('views', path.join(__dirname + '/HTML'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());

app.use('/', function (req, res, next) {
	req.db = db;
    next();
});

app.use("/api/test",require("./routes/test"));
app.use("/api/question",require("./routes/question"));
app.use("/api/answer",require("./routes/answer"));

server.listen(port, () => console.log(`listening on port ${port} + host ${host}`));
