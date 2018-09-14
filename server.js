//console.log("Console test");
//codepen
//node server.js ->Para correr
//npm cache clean --force
var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
const application = require('./application.json')
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var needle = require('needle');

app.use(morgan('dev'));//Debug
const sequelize = new Sequelize(application.database, application.username, application.password, {
    host: application.host,
    dialect: 'mysql'
});
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_reporteria"
});
//Configuramos la aplicacion
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'programacionycontrol',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/inicio');
    } else {
        next();
    }
};
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});
app.route('/guardarReporte')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var nombreEmpresa = req.body.nombreEmpresa,
            nitEmpresa = req.body.nitEmpresa;
        con.query("INSERT INTO empresa (id, nombre, nit) VALUES (?, ?, ?);", [null, nombreEmpresa, nitEmpresa], function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows == 1) {
                res.sendFile(__dirname + '/public/reporteGuardado.html');
            } else {
                res.sendFile(__dirname + '/public/reporteNoGuardado.html');
            }
        });
    });
app.get('/inicio', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log("A");
        console.log(req.session.user);
        res.sendFile(__dirname + '/public/inicio.html');
    } else {
        console.log("B");
        res.redirect('/login');
    }
});
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username_ = req.body.username,
            password_ = req.body.password;
        // console.log(username_);
        // console.log(password_);
        needle.post('http://10.1.1.243:8888/login', { user: username_, password: password_ }, function (err, resp, body) {
            if (err) throw err;
            if (resp.statusCode == 200) {
                var jsonResponse = (body);
                console.log(jsonResponse.epersonal.user);
                console.log(jsonResponse.epersonal.first_name);
                console.log(jsonResponse.epersonal.last_name);
                console.log(jsonResponse.ldap.full_name);
                var user = User.create(jsonResponse.epersonal.user, jsonResponse.epersonal.first_name, jsonResponse.epersonal.last_name, jsonResponse.epersonal.position, jsonResponse.ldap.full_name);
                req.session.user = user.dataValues;
                res.redirect('/inicio');
            } else if (resp.statusCode == 403) {
                res.redirect('/loginError');
            } else {
                res.redirect('/loginError');
            }
        });
    });
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
app.post('/auditoria/crear', function (req, res) {
    var empresa = req.body.empresa;
    var fecha = req.body.fecha;
    var norma = req.body.norma;
    console.log(empresa);
    console.log(fecha);
    console.log(norma);
    app.get('/norma/get', function (req, res) {
        res.json(result);
    });
    // con.query("INSERT INTO auditoria (id, empresa, norma, fecha, auditor) VALUES (?, ?, ?, ?, ?);",
    //     [null, empresa, norma, fecha, req.session.user.id], function (err, result, fields) {
    //         if (err) throw err;
    //         if (result.affectedRows >= 1) {
    //             res.json({ insertID: result.insertId });
    //         } else {
    //             res.json({ insertID: -1 });
    //         }
    //     });
});
app.get('/id_usuario/get', function (req, res) {
    console.log(req.session.user.id);
});
app.listen(4000, function () {
    console.log("Funciona puerto 4000");
});
