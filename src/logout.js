
    $(document).ready(function() {
        $('#logout').click(function() {
            socket.emit("logout", {"username": username});
            username = "";
            $("#input_label").show();

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
            
            $("#pointer").show();

            $("#logout").hide();
            $("#lobby").hide();
          
             
             
        });
    })