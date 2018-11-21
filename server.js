//console.log("Console test");
//codepen
//node server.js ->Para correr
//npm cache clean --force
var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
//const application = require('./application.json')
//var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var needle = require('needle');

var Moment = require('moment-timezone'); Moment().tz('America/Bogota').format();
//app.use(morgan('dev'));//Debug
// const sequelize = new Sequelize(application.database, application.username, application.password, {
//     host: application.host,
//     dialect: 'mysql'
// });
app.use(morgan('dev'));//Debug
var db_config = {
    host: "10.1.109.15",
    user: "db_reportes",
    password: "6uHsCIhZlaxc",
    database: "db_reportes"
}
var con;
function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.
    con.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else { console.log("MySQL Connected."); }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            //throw err;                                  // server variable configures this)
            console.log("Error en con");
        }
    });
}
//con.on('error', function() {});
handleDisconnect();
// var con = mysql.createConnection({
//     host: "10.1.109.15",
//     user: "db_reportes",
//     password: "6uHsCIhZlaxc",
//     database: "db_reportes"
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'programacionycontrol',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 3600000 * 8 }
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
app.get('/inicio', (req, res) => {
    registrarUso(req.session.user, '/inicio');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/inicio.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/registrarReporte', (req, res) => {
    registrarUso(req.session.user, '/registrarReporte');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/registrarReporte.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/misActividades', (req, res) => {
    registrarUso(req.session.user, '/misActividades');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/misActividades.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/registrarReporteOtro', (req, res) => {
    registrarUso(req.session.user, '/registrarReporte');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/registrarReporteOtro.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/registrarActividad', (req, res) => {
    registrarUso(req.session.user, '/registrarReporte');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/registrarActividad.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/revisarDatos', (req, res) => {
    registrarUso(req.session.user, '/revisarDatos');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/revisarDatos.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/logout', (req, res) => {
    registrarUso(req.session.user, '/logout');
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            var username_ = req.body.username, password_ = req.body.password;
            needle.post('http://10.1.1.243:8888/login', { user: username_, password: password_ }, function (err, resp, body) {
                if (err) throw err;
                if (resp.statusCode == 200) {
                    var jsonResponse = (body);
                    req.session.user = jsonResponse.epersonal.user;
                    req.session.first_name = jsonResponse.epersonal.first_name;
                    req.session.last_name = jsonResponse.epersonal.last_name;
                    req.session.full_name = jsonResponse.ldap.full_name;
                    if (req.session.user == 'dgomezh' || req.session.user == 'jrestrch' || req.session.user == 'rvelezv' || req.session.user == 'ncastane') {
                        req.session.padre = 1;
                    } else {
                        req.session.padre = 0;
                    }
                    req.session.idUsuario = 0;
                    res.redirect('/inicio');
                    registrarUso(req.body.username, '/login:200');
                } else if (resp.statusCode == 403) {
                    res.redirect('/loginError');
                    registrarUso(req.body.username, '/login:403');
                } else {
                    res.redirect('/loginError');
                    registrarUso(req.body.username, '/login:0');
                }
            });
        } catch (error) {
            console.log("Error en /login");
            console.log(error);
        }
    });

app.route('/crear/actividad')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/crear/actividad');
            var id_cliente = req.body.id_cliente,
                id_frecuencia = req.body.id_frecuencia,
                nombre = req.body.nombre,
                duracion = req.body.duracion,
                hora_ans = req.body.hora_ans,
                dia_ans = req.body.dia_ans;
            var consulta = "INSERT INTO db_reportes.actividad (id_analista, id_cliente, id_frecuencia, nombre, tiempo_ejecucion, ans_hora, ans_dias, fecha_hora)";
            consulta += " VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);";
            con.query(consulta,
                [req.session.idUsuario, id_cliente, id_frecuencia, nombre, duracion, hora_ans, dia_ans], function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({ resultado: -1 });
                    } else if (result.affectedRows == 1) {
                        res.json({ resultado: 1 });
                    } else {
                        res.json({ resultado: 0 });
                    }
                });
        } catch (error) {
            console.log("Error en /crear/actividad");
            console.log(error);
        }
    });

app.route('/eliminar/actividad')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/eliminar/actividad');
            var id_actividad = req.body.id_actividad;
            var consulta = "UPDATE actividad SET estado = 2, usuario_eliminacion = ?, fecha_hora_eliminacion = CURRENT_TIMESTAMP WHERE id_actividad = ?;";
            con.query(consulta,
                [req.session.idUsuario, id_actividad], function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({ resultado: -1 });
                    } else if (result.affectedRows == 1) {
                        res.json({ resultado: 1 });
                    } else {
                        res.json({ resultado: 0 });
                    }
                });
        } catch (error) {
            console.log("Error en /eliminar/actividad");
            console.log(error);
        }
    });

app.route('/registro/actividad')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/registro/actividad');
            var id_actividad = req.body.id_actividad, observaciones = req.body.observaciones;
            con.query("INSERT INTO registro_actividad (id_registro, id_actividad, observaciones, fecha_hora, id_usuario) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?);",
                [null, id_actividad, observaciones, req.session.idUsuario], function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({ resultado: -1 });
                    } else if (result.affectedRows == 1) {
                        res.json({ resultado: 1 });
                    } else {
                        res.json({ resultado: 0 });
                    }
                });
        } catch (error) {
            console.log("Error en /registro/actividad");
            console.log(error);
        }
    });

app.get('/get/miActividad', function (req, res) {
    registrarUso(req.session.user, '/get/registroActividad');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT a.id_actividad, c.nombre as nombre_cliente, f.nombre as nombre_frecuencia,";
        consulta += " an.usuario_red, a.nombre, a.tiempo_ejecucion, a.ans_hora,";
        consulta += " a.ans_dias, CAST(a.fecha_hora as char) as fecha_hora,";
        consulta += " CAST(a.fecha_hora_eliminacion as char) as fecha_hora_eliminacion, ann.usuario_red as usuario_eliminacion,";
        consulta += " a.estado";
        consulta += " FROM actividad a";
        consulta += " INNER JOIN cliente c ON a.id_cliente = c.id_cliente";
        consulta += " INNER JOIN frecuencia f ON a.id_frecuencia = f.id_frecuencia";
        consulta += " INNER JOIN analista an ON an.id_analista = a.id_analista";
        consulta += " LEFT JOIN analista ann ON ann.id_analista = a.usuario_eliminacion";
        if (req.session.padre == 0) {
            consulta += " WHERE an.id_analista = ?";
            consulta += " ORDER BY a.estado, a.id_actividad";
            con.query(consulta, [id_usuario], function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else if (req.session.padre == 1) {
            consulta += " ORDER BY a.estado, a.id_actividad";
            con.query(consulta, function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else {
            res.json(0);
        }
    } catch (error) {
        console.log("Error en /get/registroActividad");
        console.log(error);
    }
});

app.get('/cliente/get', function (req, res) {
    registrarUso(req.session.user, '/actividades/get');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT id_cliente, nombre FROM cliente";
        con.query(consulta, function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /cliente/get");
        console.log(error);
    }
});

app.get('/frecuencia/get', function (req, res) {
    registrarUso(req.session.user, '/actividades/get');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT id_frecuencia, nombre FROM frecuencia";
        con.query(consulta, function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /clientes/get");
        console.log(error);
    }
});

app.get('/actividades/get', function (req, res) {
    registrarUso(req.session.user, '/actividades/get');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT a.id_actividad, c.nombre as cliente, a.nombre as actividad";
        consulta += " FROM actividad a inner join cliente c on c.id_cliente = a.id_cliente";
        consulta += " WHERE a.estado = 1";
        if (req.session.padre == 0) {
            consulta += " AND a.id_analista = ? ORDER BY c.nombre, a.nombre";
            con.query(consulta, [id_usuario], function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else if (req.session.padre == 1) {
			consulta += " ORDER BY c.nombre, a.nombre";
            con.query(consulta, function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else {
            res.json(0);
        }
    } catch (error) {
        console.log("Error en /actividades/get");
        console.log(error);
    }
});
app.get('/actividades/get/:otroUsername', function (req, res) {
    var otroUsername = req.params.otroUsername;
    registrarUso(req.session.user, '/actividades/get');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT a.id_actividad, c.nombre as cliente, a.nombre as actividad";
        consulta += " FROM actividad a inner join cliente c on c.id_cliente = a.id_cliente";
        consulta += " inner join analista an on an.id_analista = a.id_analista";
        consulta += " where a.estado = 1 AND an.usuario_red = ? ORDER BY c.nombre ASC;";
        con.query(consulta, [otroUsername], function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /actividades/get");
        console.log(error);
    }
});
app.get('/get/registroActividad', function (req, res) {
    registrarUso(req.session.user, '/get/registroActividad');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "select ra.id_registro, cl.nombre as Cliente, ac.nombre, ac.tiempo_ejecucion, ac.ans_hora, ac.ans_dias, an.usuario_red as analista, fr.nombre as frecuencia, ra.Observaciones, CAST(ra.fecha_hora as char) as fecha_hora, ann.usuario_red as analistareporte";
        consulta += " from registro_actividad ra";
        consulta += " inner join actividad ac on ra.id_actividad = ac.id_actividad";
        consulta += " inner join analista an on an.id_analista = ac.id_analista";
        consulta += " inner join cliente cl on cl.id_cliente = ac.id_cliente";
        consulta += " inner join frecuencia fr on fr.id_frecuencia = ac.id_frecuencia";
        consulta += " inner join analista ann on ann.id_analista = ra.id_usuario ";

        if (req.session.padre == 0) {
            consulta += " where ann.id_analista = ?";
            consulta += " order by ra.id_registro desc;";
            con.query(consulta, [id_usuario], function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else if (req.session.padre == 1) {
            consulta += " order by ra.id_registro desc;";
            con.query(consulta, function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else {
            res.json(0);
        }
    } catch (error) {
        console.log("Error en /get/registroActividad");
        console.log(error);
    }
});
app.get('/get/registroActividad/excel', function (req, res) {
    try {
        var consulta = "select cl.nombre as Cliente, ac.nombre, ac.tiempo_ejecucion, ac.ans_hora, ac.ans_dias, an.usuario_red as analista, fr.nombre as frecuencia, ra.Observaciones, CAST(ra.fecha_hora as char) as fecha_hora";
        consulta += " from registro_actividad ra";
        consulta += " inner join actividad ac on ra.id_actividad = ac.id_actividad";
        consulta += " inner join analista an on an.id_analista = ac.id_analista";
        consulta += " inner join cliente cl on cl.id_cliente = ac.id_cliente";
        consulta += " inner join frecuencia fr on fr.id_frecuencia = ac.id_frecuencia;";
        con.query(consulta, function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /get/registroActividad/excel");
        console.log(error);
    }
});
app.get('/fullname/get', function (req, res) {
    registrarUso(req.session.user, '/fullname/get');
    try {
        var username = req.session.user;
        var consulta = "SELECT id_analista FROM analista where usuario_red = ?;"
        con.query(consulta, [username], function (err, result, fields) {
            if (err) throw err;
            if (result.length == 1) {
                req.session.idUsuario = result[0].id_analista;
                res.send(req.session.full_name + "(" + result[0].id_analista + ")");
            } else {
                res.send(req.session.full_name);
            }
        });
    } catch (error) {
        console.log("Error en /fullname/get");
        console.log(error);
    }
});
function registrarUso(usuario, pagina, an_ip) {
    if (an_ip == undefined) {
        an_ip = "No definida";
    }
    if (usuario == undefined) {
        usuario = "No definido";
    }
    //req.connection.remoteAddress
    try {
        if (usuario !== undefined) {
            con.query("INSERT INTO uso (id_uso, usuario, pagina, fecha_hora, ip) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?);",
                [null, usuario, pagina, an_ip], function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                    } else if (result.affectedRows == 1) {
                    } else {
                    }
                });
        } else {
            console.log(req.user);
        }
    } catch (error) {
        console.log("Error en registrarUso");
        console.log(error);
    }
}
app.listen(4000, function () {
    console.log("Funciona puerto 4000");
});
