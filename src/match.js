

$(document).ready(function() {
    $(".game_list").on("click", ".join", function() { 
// ----------------------------------------------------------------------
//  joins the specific room that user clicks on,works for dynamic events
// ----------------------------------------------------------------------
        let room_name = $(this).attr("name");
        socket.emit("join_room", {

            "room_name": room_name,
            "user": username
        });
    })


    socket.on("reload_middleman", function(data){
        socket.emit("reload_rooms", {});
    })

    socket.on("game_full", function(data){
        alert("Match has already begun");
    })

    socket.on("still_waiting", function(data){
        alert("Waiting for opponent...");
    })

    socket.on("start_match", function(data){

        if (data["player1"] === username){
            opponent = data["player2"];
        }
        else{
            opponent = data["player1"]
        }
        ReactDOM.render(
            <React.StrictMode>
                <window.App opponent = {opponent}/>
            </React.StrictMode>,
            document.getElementById('chess')
        );  
      })
    


    socket.on("match_end", function(data){

        $("#lobby").show();

        $("#chess").hide();
        ReactDOM.unmountComponentAtNode(document.getElementById('chess'));
        $("#chess").empty();

        $("#input_label").hide();
        $("#pointer").hide();

        $("#logout").show();
        $(".profile").show();
        $(".show_game_box").show();
        $("#box").show();
        $(".logoutbtn").show();
        resetVars();

        socket.emit("leave_room", {"current_room": current_room, "username": username, "opponent": opponent})

        alert("Match Abandoned, you win!")
        socket.emit("reload_profile", {"username": username});

    })
    socket.on("room_joined", function(data) {
        $("#input_label").hide();
        $("#pointer").hide();

        $("#logout").hide();
        $(".profile").hide();
        $(".show_game_box").hide();
        $("#box").hide();
        $(".logoutbtn").hide();

        $(".chess").show();
        current_room = data["room_name"];
       match_color = data["color"];

   
    })

    $("#chess").on("click", "#leave_room", function(){
        $("#lobby").show();

        $("#chess").hide();
        ReactDOM.unmountComponentAtNode(document.getElementById('chess'));

        $("#chess").empty();

        $("#input_label").hide();
        $("#pointer").hide();

        $("#logout").show();
        $(".profile").show();
        $(".show_game_box").show();
        $("#box").show();
        $(".logoutbtn").show();
        resetVars();
        socket.emit("leave_room", {"current_room": current_room, "username": username, "opponent": opponent})

        socket.emit("reload_profile", {"username": username});

    })

    socket.on("disconnect_leave", function(data){
        $("#lobby").show();

        $("#chess").hide();
        ReactDOM.unmountComponentAtNode(document.getElementById('chess'));

        $("#chess").empty();

        $("#input_label").hide();
        $("#pointer").hide();

        $("#logout").show();
        $(".profile").show();
        $(".show_game_box").show();
        $("#box").show();
        $(".logoutbtn").show();
        resetVars();
        socket.emit("leave_room", {"current_room": current_room, "username": username, "opponent": opponent})

        socket.emit("reload_profile", {"username": username});
    })

})