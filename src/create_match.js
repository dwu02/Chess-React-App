$(document).ready(function() {
    $("#create").click(function() {
// ----------------------------------------------------------------------
//  Checks room name and password upon room creation
// ----------------------------------------------------------------------
        const room = $("#room_create").val();
        let re = /^[A-z]*$/;
        if (room === null || room == "") {
            alert("Please set a room name");
            return;
        } else if (room.length > 10) {
            alert("Please make room name less than 10 characters");
            return;
        } else if (!room.match(re)) {
            alert("Please make room name only letters");
        }else {
// ----------------------------------------------------------------------
//  If no errors, runs "create_room", passing in the room name, owner, and password
// ----------------------------------------------------------------------
            socket.emit("create_room", {
                "room_name": room,
                "owner": username,
            });
        }
    })

    socket.on("new_room", function(data) {
        // ----------------------------------------------------------------------
        //  adding buttons to each room
        // ----------------------------------------------------------------------
                let li = document.createElement("li");
                li.setAttribute("id", data["room_name"]);
                li.setAttribute("name", data["owner"]);
                li.textContent = addslashes("Owner: " + data["owner"] + " Room Name: " + data["room_name"]);
                document.getElementsByClassName("game_list")[0].appendChild(li);
                let join = document.createElement("input");
                join.setAttribute("type", "submit");
                join.setAttribute("name", data["room_name"]);
                join.setAttribute("value", "join");
                join.setAttribute("class", "join");
                li.appendChild(join);
                /*if (data["owner"] === username) {
                    let delete_room = document.createElement("input");
                    delete_room.setAttribute("type", "submit");
                    delete_room.setAttribute("name", data["room_name"]);
                    delete_room.setAttribute("value", "delete");
                    delete_room.setAttribute("class", "delete_room");
                    li.appendChild(delete_room);
                } */
            });
            socket.on("rooms", function(data){
                data = JSON.parse(data);
                $(".game_list").empty();
                for (const key in data){ 
                    let li = document.createElement("li");
                    li.setAttribute("id", key);
                    li.setAttribute("name", data["owner"]);
                    li.textContent = addslashes("Owner: " + data[key]["owner"] + " Room Name: " + key);
                    document.getElementsByClassName("game_list")[0].appendChild(li);
                    let join = document.createElement("input");
                    join.setAttribute("type", "submit");
                    join.setAttribute("name", key);
                    join.setAttribute("value", "join");
                    join.setAttribute("class", "join");
                    li.appendChild(join);
                   
                };
                })
    socket.on("room_exists", function(data) {
        alert("Room Name Already Exists");
    })
})