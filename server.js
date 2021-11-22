// ----------------------------------------------------------------------
// Require the functionality we need to use:
// ----------------------------------------------------------------------
let users = {};
let open_games = {};
let closed_games = {};
let http = require('http'),
    url = require('url'),
    path = require('path'),
    mime = require('mime'),
    fs = require('fs')

// ----------------------------------------------------------------------
// Make a simple fileserver for all of our static content.
// Everything underneath <STATIC DIRECTORY NAME> will be served.
// ----------------------------------------------------------------------
let app = http.createServer(function(req, resp) {
    let filename = path.join(__dirname, "src", url.parse(req.url).pathname);
    (fs.exists || path.exists)(filename, function(exists) {
        if (exists) {
            fs.readFile(filename, function(err, data) {
                if (err) {
                    // File exists but is not readable (permissions issue?)
                    resp.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    resp.write("Internal server error: could not read file");
                    resp.end();
                    return;
                }
// ----------------------------------------------------------------------
// File exists and is readable
// ----------------------------------------------------------------------
                let mimetype = mime.getType(filename);
                resp.writeHead(200, {
                    "Content-Type": mimetype
                });
                resp.write(data);
                resp.end();
                return;
            });
        } else {
// ----------------------------------------------------------------------
// File does not exist
// ----------------------------------------------------------------------
            resp.writeHead(404, {
                "Content-Type": "text/plain"
            });
            resp.write("Requested file not found: " + filename);
            resp.end();
            return;
        }
    });
});
app.listen(3456);


const mysql = require('mysql');
const bcrypt = require("bcryptjs");

const socketio = require("socket.io")(http, {
    wsEngine: 'ws'
});

const io = socketio.listen(app);

let con = mysql.createConnection({
    host: "localhost",
    user: "mod7",
    password: "pass",
    database: "mod7"
  });
con.connect(function(err){
    if (err) throw err;
})
io.sockets.on("connection", function(socket) {
    username = "";
    current_room= "";
    socket.on("login", function(data){

            let sql = "SELECT COUNT(username), username, password FROM users WHERE username = \"" + data["username"] + "\"";
            let res = ""
            con.query(sql, function (err, result, fields) {
              if (err) throw err;
              const cnt = result[0]['COUNT(username)'];
              if (cnt < 1){
                  res = "Username and Password Don't Match";
                  socket.emit("login_ver", {"result": res, "username": data["username"]});
              }
              else{
              bcrypt.compare(data["password"], result[0].password, function(err, isMatch) { // https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js
                if (err) {
                  throw err
                } else if (!isMatch) {
                    res = "Username and Password Don't Match";
                    socket.emit("login_ver", {"result": res, "username": data["username"]});
                } else {
                    res = 1;
                    users[data["username"]] = socket.id;
                    username = data["username"];
                    socket.emit("login_ver", {"result": res, "username": data["username"]});
                }
              
            });
              }


            })
        

    })
    socket.on("register", function(data){
        let username = data["username"];
        let password = data["password"];
        
            let sql = "SELECT COUNT(username) FROM users WHERE username = \"" + username + "\"";
        let res = "";
            con.query(sql, function (err, result, fields) {
              if (err) throw err;
              const cnt = result[0]['COUNT(username)'];
              if (cnt > 0 ){
                   res = "Username already exists";
                   socket.emit("register_ver", {"result": res, "username": username});

              }
              else{

                bcrypt.genSalt(10, function (err, salt) { //https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js
                    if (err) {
                      throw err
                    } else {
                      bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                          throw err
                        } else {
                            sql = "insert into users (username, password, rating) values (\"" + username + "\", \"" + hash + "\", \"0\")"
                            con.query(sql, function (err, result){
                                if (err) throw err;
                                res = 1;
                                socket.emit("register_ver", {"result": res, "username": username});


                            })
                        }
                      })
                    }
                
              }) 
            
              }

            })
        
            
    })

    socket.on("logout", function(data){
        username = "";
        current_room = ""
        delete users[data["username"]];
    })

    socket.on("disconnecting", function(){
        delete users[username];
        if (current_room != undefined && current_room != "" && username != undefined && username != "" && open_games[current_room] && open_games[current_room][username]){
            delete open_games[current_room][username]
        }
        if (current_room != undefined && current_room != "" && username != undefined && username != "" && closed_games[current_room] && closed_games[current_room][username]){
            socket.emit("disconnect_leave", {})
        }

    })

    socket.on("create_room", function(data) {
        if (open_games[data["room_name"]] === undefined) {
            const arr = {
                "owner": data["owner"],
                "users": {},
            };
            open_games[data["room_name"]] = arr;
            io.sockets.emit("new_room", data);
        } else {
            socket.emit("room_exists");
        }
    });


        socket.on("reload_profile", function(data){
            let rank;
            let games;
            let sql = "SELECT rating FROM users WHERE username = \"" + data["username"] + "\"";
            con.query(sql, function (err, result, fields){
                if (err) throw err;
                rank = result[0]["rating"];

                sql = "select winner, loser from games WHERE winner = \"" + data["username"] + "\" OR  loser = \"" + data["username"] + "\"";

                con.query(sql, function (err, result, fields){
                    if (err) throw err;
                    games = result;
                    socket.emit("profile_data", {"rank": rank, "games": JSON.stringify(games)});

                })
            })

           

        })    

        socket.on("reload_rooms", function(data) {
            io.emit("rooms", JSON.stringify(open_games));
        })


        socket.on("join_room", function(data) {
            const room = data["room_name"];
            const user = data["user"];
            if (open_games[room] && Object.keys(open_games[room].users).length == 0){
                open_games[room].users[user] = socket.id;
                socket.join(room);
                current_room = room;
                socket.emit("room_joined", {
                    "room_name": room,
                    "color": "white"
                });

                socket.emit("still_waiting", {
                    "room_name": room
                });
            }
            else if (open_games[room] && Object.keys(open_games[room].users).length == 1){
                open_games[room].users[user] = socket.id;
                closed_games[room] = open_games[room];
                delete open_games[room];

                socket.join(room);
                current_room = room;

                socket.emit("reload_middleman", {});

                socket.emit("room_joined", {
                    "room_name": room,
                    "color": "black"
                });

                io.in(current_room).emit("start_match", {
                    "room_name": room,
                    "player1": Object.keys(closed_games[room].users)[0],
                    "player2": Object.keys(closed_games[room].users)[1]
                });
            }
            else {
                socket.emit("game_full", {});
            }

        });


        socket.on("relay_move_empty", function(data){
            socket.to(data["room"]).emit("opponent_move_empty", data)
        })    
        socket.on("relay_move_full", function(data){
            socket.to(data["room"]).emit("opponent_move_full", data)
        })   

        socket.on("checkmate", function(data){
            let opponent = data["opponent"]
            let user = data["username"]
            let winner = data["winner"]
            let type = data["type"];
            if (winner === user){
                let sql = "insert into games (winner, loser, type) values (\"" + user + "\", \"" + opponent  + "\", \"" + type + "\")";    
                con.query(sql, function (err, result, fields){
                    if (err) throw err;
                    sql = "update users set rating = rating + 50 where username = \"" + user + "\"" 
                    con.query(sql, function (err, result, fields){
                        if (err) throw err;

                        sql = "update users set rating = rating - 50 where username = \"" + opponent + "\"" 
                        con.query(sql, function (err, result, fields){
                            if (err) throw err;
                            console.log(current_room)

                            delete closed_games[current_room];

                            console.log(closed_games)

                        
                        })
                    
                    })
                
                })
            }
            else{
                let sql = "insert into games (winner, loser, type) values (\"" + opponent + "\", \"" + user  + "\", \"" + type + "\")";    

                con.query(sql, function (err, result, fields){
                    if (err) throw err;
                    
                    sql = "update users set rating = rating - 50 where username = \"" + user + "\"" 

                    con.query(sql, function (err, result, fields){
                        if (err) throw err;

                        sql = "update users set rating = rating + 50 where username = \"" + opponent + "\"" 

                        con.query(sql, function (err, result, fields){
                            if (err) throw err;
                            console.log(current_room)

                            delete closed_games[current_room];

                            console.log(closed_games)

                        })                     
                    })           
                })
            }
        })

        
    
        socket.on("leave_room", function(data){
            let current_room = data["current_room"]
            let username = data["username"];
            let opponent = data["opponent"];
            
            console.log(closed_games)

            if (closed_games[current_room] !== undefined && Object.keys(closed_games[current_room].users).length == 2){

               

                let sql = "insert into games (winner, loser, type) values (\"" + opponent + "\", \"" + username  + "\", \"" + "normal" + "\")";    

                con.query(sql, function (err, result, fields){
                    if (err) throw err;
                    
                    sql = "update users set rating = rating - 100 where username = \"" + username + "\"" 

                    con.query(sql, function (err, result, fields){
                        if (err) throw err;

                        sql = "update users set rating = rating + 10 where username = \"" + opponent + "\"" 

                        con.query(sql, function (err, result, fields){
                            if (err) throw err;
                            socket.broadcast.to(closed_games[current_room].users[opponent]).emit('match_end', {});

                            delete closed_games[current_room];
                        
                        })                     
                    })           
                })


            }

            socket.leave(data["current_room"]);
        })
})