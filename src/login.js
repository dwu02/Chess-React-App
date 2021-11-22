//======================================================================
// Login User JS
//======================================================================  



    $(document).ready(function() {
        $("#lobby").hide();
        socket.emit("reload_rooms", {});
       $('#login').click(function() {
           const username = $('#username').val().trim();
           const password = $('#password').val().trim();

           let re = /^[A-z]*$/;
           let re_pass = /^[A-z0-9]*$/;

           if (username === null || username == "" || password === null || password == "") {
               alert("Please set a username/password");
               return;
           } else if (username.length > 10) {
               alert("Please make username less than 10 characters");
               return;
           } else if (!username.match(re)) {
               alert("Please make username only letters");
           }else if (!password.match(re_pass)) {
                alert("Please make password only letters and numbers");
            
           } else {

                socket.emit("login", {"username": username, "password": password});


         
            
            }
       });
    
       socket.on("login_ver", function(data){
           const result = data["result"];
                     if (result == 1) { 
                       $('#username').val('');
                       $('#password').val('');
                        username = data["username"];
                        alert("Successfully Logged In")
                        $("#input_label").hide();
                        $("#pointer").hide();

                        $("#logout").show();
                        $("#lobby").show();
                        $(".chess").hide();

                        socket.emit("reload_profile", {"username": username});


                   } else {
                       alert(result);
                   }
                   
       })
       socket.on("profile_data", function(data){
        $(".profile").empty();
        let li = document.createElement("li");
        li.setAttribute("id", username);
        li.setAttribute("name", "username");
        li.textContent = addslashes("Username: " + username);
        document.getElementsByClassName("profile")[0].appendChild(li);

        li = document.createElement("li");
        li.setAttribute("id", data["rank"]);
        li.setAttribute("name", "rank");
        li.textContent = addslashes("Rank: " + data["rank"]);
        document.getElementsByClassName("profile")[0].appendChild(li);
        let games = JSON.parse(data["games"]);
        let div = document.createElement("div");
        div.setAttribute("class", "games_played");
        document.getElementsByClassName("profile")[0].appendChild(div);

        for (let i = 0; i < games.length; i++){
            li = document.createElement("li");
            li.textContent = "Game " + (i + 1) + ": " + games[i]["winner"] + " beat " + games[i]["loser"];
            
            div.appendChild(li);
        }

        
    })
       
       $('#register').click(function() {
           const username = $('#username').val().trim();
           const password = $('#password').val().trim();

           let re = /^[A-z]*$/;
           let re_pass = /^[A-z0-9]*$/;

           if (username === null || username == "" || password === null || password == "") {
               alert("Please set a username/password");
               return;
           } else if (username.length > 10) {
               alert("Please make username less than 10 characters");
               return;
           } else if (!username.match(re)) {
               alert("Please make username only letters");
           }else if (!password.match(re_pass)) {
                alert("Please make password only letters and numbers");
           }else{   
           const data = {
               'username': username,
               'password': password
           };
           socket.emit("register", data);
            }
       });

       socket.on("register_ver", function(data){
        const result = data["result"];
                  if (result == 1) { 
                    $('#username').val('');
                    $('#password').val('');
                    alert("Successfully Registered");
a                } else {
                    alert(result);
                }
                
    })
    $('#show_login').click(function() {
        document.getElementById('register').style.display = "none";
        document.getElementById('username').style.display = "none";
        document.getElementById('username_label').style.display = "none";
        document.getElementById('password').style.display = "none";
        document.getElementById('password_label').style.display = "none";
        document.getElementById('new_username_label').style.display = "none";
        document.getElementById('login').style.display = "block";
        document.getElementById('username').style.display = "block";
        document.getElementById('username_label').style.display = "block";
        document.getElementById('password').style.display = "block";
        document.getElementById('password_label').style.display = "block";
    });
//----------------------------------------------------------------------
// If person clicks on register, register input fields appear while login input fields disappear
//----------------------------------------------------------------------
    $('#show_register').click(function() {
        document.getElementById('login').style.display = "none";
        document.getElementById('username').style.display = "none";
        document.getElementById('username_label').style.display = "none";
        document.getElementById('password').style.display = "none";
        document.getElementById('password_label').style.display = "none";

        document.getElementById('register').style.display = "block";
        document.getElementById('username').style.display = "block";
        document.getElementById('new_username_label').style.display = "block";
        document.getElementById('password').style.display = "block";
        document.getElementById('password_label').style.display = "block";
    });
    });