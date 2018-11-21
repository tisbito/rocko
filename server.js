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
var Moment = require('moment-timezone');
Moment().tz('America/Bogota').format();
//app.use(morgan('dev'));//Debug
// const sequelize = new Sequelize(application.database, application.username, application.password, {
//     host: application.host,
//     dialect: 'mysql'
// });

app.use(morgan('dev')); //Debug
morgan.format('logFormat', ':date, :resource, :remote-addr, :status, :response-time ms');
var db_config = {
    host: "10.1.109.15",
    user: "db_reportes",
    password: "6uHsCIhZlaxc",
    database: "db_reportes"
}
var con;

function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.
    con.connect(function (err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            console.log('Error en la conexión a la base de datos:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            console.log("MySQL Conectado.");
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            //throw err;                                  // server variable configures this)
            console.log("Error en conexión");
        }
    });
}

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
                [null, usuario, pagina, an_ip],
                function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                    } else if (result.affectedRows == 1) {} else {}
                });
        } else {
            console.log(req.user);
        }
    } catch (error) {
        console.log("Error en registrarUso");
        console.log(error);
    }
}
handleDisconnect();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'rpyc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000 * 8
    }
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
app.get('/transferirActividades', (req, res) => {
    registrarUso(req.session.user, '/transferirActividades');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/transferirActividades.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/registrarReporteOtro', (req, res) => {
    registrarUso(req.session.user, '/registrarReporteOtro');
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/registrarReporteOtro.html');
    } else {
        res.redirect('/login');
    }
});
app.get('/registrarActividad', (req, res) => {
    registrarUso(req.session.user, '/registrarActividad');
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
app.get('/get/rol', function (req, res) {
    registrarUso(req.session.user, '/get/rol');
    try {
        res.json(req.session.padre);
    } catch (error) {
        console.log("Error en /get/rol");
        console.log(error);
    }
});
app.get('/get/miActividad', function (req, res) {
    registrarUso(req.session.user, '/get/miActividad');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT id_actividad, nombre_cliente, nombre_frecuencia,";
        consulta += " analista_responsable_red, nombre_actividad, tiempo_ejecucion, ans_hora, ans_dias,";
        consulta += " CAST(fecha_hora as char) as fecha_hora,";
        consulta += " CAST(fecha_hora_eliminacion as char) as fecha_hora_eliminacion,";
        consulta += " analista_elimina_red, estado";
        consulta += " FROM vw_informacionactividad";
        if (req.session.padre == 0) {
            consulta += " WHERE analista_responsable_id = ?";
            consulta += " ORDER BY estado, id_actividad";
            con.query(consulta, [id_usuario], function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else if (req.session.padre == 1) {
            consulta += " ORDER BY estado, id_actividad";
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
app.get('/get/cliente', function (req, res) {
    registrarUso(req.session.user, '/get/cliente');
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
app.get('/get/frecuencia', function (req, res) {
    registrarUso(req.session.user, '/get/frecuencia');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT id_frecuencia, nombre FROM frecuencia";
        con.query(consulta, function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /get/frecuencia");
        console.log(error);
    }
});
app.get('/get/analistas', function (req, res) {
    registrarUso(req.session.user, '/get/analistas');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "SELECT id_analista, usuario_red, nombres_completos FROM analista";
        consulta += " ORDER BY 3 ASC";
        con.query(consulta, function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /get/analistas");
        console.log(error);
    }
});
app.get('/get/actividades', function (req, res) {
    registrarUso(req.session.user, '/get/actividades');
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
        console.log("Error en /get/actividades");
        console.log(error);
    }
});
app.get('/get/actividades/idusuario/:idusuario', function (req, res) {
    var idusuario = req.params.idusuario;
    registrarUso(req.session.user, '/get/actividades/idusuario/:idusuario');
    try {
        var consulta = "SELECT a.id_actividad, c.nombre as cliente, a.nombre as actividad";
        consulta += " FROM actividad a inner join cliente c on c.id_cliente = a.id_cliente";
        consulta += " inner join analista an on an.id_analista = a.id_analista";
        consulta += " where a.estado = 1 AND an.id_analista = ? ORDER BY c.nombre ASC;";
        con.query(consulta, [idusuario], function (err, result, fields) {
            console.log(con.query);
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log("Error en /get/actividades/idusuario/:idusuario");
        console.log(error);
    }
});
app.get('/get/actividades/:otroUsername', function (req, res) {
    var otroUsername = req.params.otroUsername;
    registrarUso(req.session.user, '/get/actividades/:otroUsername');
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
        console.log("Error en /get/actividades/:otroUsername");
        console.log(error);
    }
});
app.get('/get/registroActividad', function (req, res) {
    registrarUso(req.session.user, '/get/registroActividad');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = "select";
        consulta += " ra.id_registro, cl.nombre as nombre_cliente, ac.nombre as nombre_actividad, ac.tiempo_ejecucion, ac.ans_hora, ac.ans_dias,";
        consulta += " fr.nombre as frecuencia_nombre, an.usuario_red as responsable, ra.observaciones, CAST(ra.fecha_hora as char) as fecha_hora, an_r.usuario_red as reporte";
        consulta += " from registro_actividad ra";
        consulta += " inner join actividad ac on ra.id_actividad = ac.id_actividad";
        consulta += " inner join cliente cl on ac.id_cliente = cl.id_cliente";
        consulta += " inner join analista an on ra.id_usuario = an.id_analista";
        consulta += " inner join analista an_r on ac.id_analista = an_r.id_analista";
        consulta += " inner join frecuencia fr on fr.id_frecuencia = ac.id_frecuencia";
        if (req.session.padre == 0) {
            consulta += " where ra.id_usuario = ? or ac.id_analista = ? or ac.id_analista_respaldo = ?";
            consulta += " order by ra.id_registro desc;";
            con.query(consulta, [id_usuario, id_usuario, id_usuario], function (err, result, fields) {
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
app.get('/get/fullname', function (req, res) {
    registrarUso(req.session.user, '/get/fullname');
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
        console.log("Error en /get/fullname");
        console.log(error);
    }
});
app.get('/get/actividadActiva', function (req, res) {
    registrarUso(req.session.user, '/get/actividadActiva');
    try {
        var id_usuario = req.session.idUsuario;
        var consulta = " SELECT id_actividad, nombre_cliente, nombre_actividad, tiempo_ejecucion, ans_hora, ans_dias, nombre_frecuencia, analista_responsable_red";
        consulta += " FROM vw_informacionactividad";
        consulta += " WHERE estado = 1";
        if (req.session.padre == 0) {
            consulta += " AND analista_responsable_id = ?";
            con.query(consulta, [id_usuario], function (err, result, fields) {
                console.log(con.query);
                if (err) throw err;
                res.json(result);
            });
        } else if (req.session.padre == 1) {
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
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            var username_ = req.body.username,
                password_ = req.body.password;
            needle.post('http://10.1.1.243:8888/login', {
                user: username_,
                password: password_
            }, function (err, resp, body) {
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
app.route('/actividad/crear')
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
            var consulta = "INSERT INTO actividad (id_analista, id_analista_respaldo, id_cliente, id_frecuencia, nombre, tiempo_ejecucion, ans_hora, ans_dias, fecha_hora)";
            consulta += " VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);";
            con.query(consulta,
                [req.session.idUsuario, req.session.idUsuario, id_cliente, id_frecuencia, nombre, duracion, hora_ans, dia_ans],
                function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({
                            resultado: -1
                        });
                    } else if (result.affectedRows == 1) {
                        res.json({
                            resultado: 1
                        });
                    } else {
                        res.json({
                            resultado: 0
                        });
                    }
                });
        } catch (error) {
            console.log("Error en /crear/actividad");
            console.log(error);
        }
    });
app.route('/actividad/eliminar')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/eliminar/actividad');
            var id_actividad = req.body.id_actividad;
            var consulta = "UPDATE actividad SET estado = 2, usuario_eliminacion = ?, fecha_hora_eliminacion = CURRENT_TIMESTAMP WHERE id_actividad = ?;";
            con.query(consulta,
                [req.session.idUsuario, id_actividad],
                function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({
                            resultado: -1
                        });
                    } else if (result.affectedRows == 1) {
                        res.json({
                            resultado: 1
                        });
                    } else {
                        res.json({
                            resultado: 0
                        });
                    }
                });
        } catch (error) {
            console.log("Error en /eliminar/actividad");
            console.log(error);
        }
    });
app.route('/actividad/registro')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/registro/actividad');
            var id_actividad = req.body.id_actividad,
                observaciones = req.body.observaciones;
            con.query("INSERT INTO registro_actividad (id_registro, id_actividad, observaciones, fecha_hora, id_usuario) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?);",
                [null, id_actividad, observaciones, req.session.idUsuario],
                function (err, result, fields) {
                    if (err) {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({
                            resultado: -1
                        });
                    } else if (result.affectedRows == 1) {
                        res.json({
                            resultado: 1
                        });
                    } else {
                        res.json({
                            resultado: 0
                        });
                    }
                });
        } catch (error) {
            console.log("Error en /registro/actividad");
            console.log(error);
        }
    });
app.route('/actividad/transferir')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        try {
            registrarUso(req.session.user, '/actividad/transferir');
            var id_actividad = req.body.id_actividad,
                analista_origen = req.body.analista_origen,
                analista_destino = req.body.analista_destino;
            var consulta = "INSERT INTO actividad (id_analista, id_analista_respaldo, id_cliente, id_frecuencia, nombre, tiempo_ejecucion, ans_hora, ans_dias, fecha_hora)";
            consulta += " SELECT ?, ?, id_cliente, id_frecuencia, nombre, tiempo_ejecucion, ans_hora, ans_dias, CURRENT_TIMESTAMP FROM actividad WHERE id_actividad = ?;";
            con.beginTransaction(function (err) {
                if (err) {
                    con.rollback(function () {
                        console.log('query ', this.sql);
                        console.log("ERROR");
                        console.log(err);
                        res.json({
                            resultado: -1
                        });
                    });
                }
                con.query(consulta, [analista_destino, analista_destino, id_actividad], function (err, result) {
                    if (err) {
                        con.rollback(function () {
                            console.log('query ', this.sql);
                            console.log("ERROR");
                            console.log(err);
                            res.json({
                                resultado: -1
                            });
                        });
                    }
                    //var log = result.insertId;
                    consulta = "UPDATE actividad SET estado = 3, usuario_eliminacion = ?, fecha_hora_eliminacion = CURRENT_TIMESTAMP WHERE id_actividad = ?";
                    con.query(consulta, [req.session.idUsuario, id_actividad], function (err, result) {
                        if (err) {
                            con.rollback(function () {
                                if (err) {
                                    con.rollback(function () {
                                        console.log('query ', this.sql);
                                        console.log("ERROR");
                                        console.log(err);
                                        res.json({
                                            resultado: -1
                                        });
                                    });
                                }
                            });
                        }
                        con.commit(function (err) {
                            if (err) {
                                con.rollback(function () {
                                    if (err) {
                                        con.rollback(function () {
                                            console.log('query ', this.sql);
                                            console.log("ERROR");
                                            console.log(err);
                                            res.json({
                                                resultado: -1
                                            });
                                        });
                                    }
                                });
                            }
                            res.json({
                                resultado: 1
                            });
                        });
                    });
                });
            });
        } catch (error) {
            console.log("Error en /actividad/transferir");
            console.log(error);
        }
    });


app.listen(4000, function () {
    console.log("Funciona puerto 4000");
});