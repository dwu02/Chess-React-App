

$(document).ready(function() {
    $("#bot").click(function() { 
        resetVars_bot();
        match_color = "white";

        $("#input_label").hide();
        $("#pointer").hide();

        $("#logout").hide();
        $(".profile").hide();
        $(".show_game_box").hide();
        $("#box").hide();
        $(".logoutbtn").hide();

        $(".chess").show();

    ReactDOM.render(

    <React.StrictMode>
        <window.BotApp/>
    </React.StrictMode>,
    document.getElementById('chess'))
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
        resetVars_bot();

    })

})