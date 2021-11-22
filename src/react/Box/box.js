"use strict";

exports.__esModule = true;

window.Box = function Box(_a) {
    let player = _a.player,
        opponent = _a.opponent;
    return React.createElement(
        "div",
        { className: "box" },
        React.createElement("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }),
        React.createElement("link", { href: "https://fonts.googleapis.com/css?family=Montserrat" }),
        React.createElement(
            "div",
            null,
            React.createElement("br", null),
            React.createElement("img", { src: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", width: "50", height: "50" }),    
            React.createElement(
                "div",
                { id: "currentTurn", className: "opponent_title" },
                player.toUpperCase()
            )
        ),
        React.createElement("br", null),
        React.createElement("hr", { className: "first_divider" }),
        React.createElement("br", null),
        React.createElement(
            "div",
            { className: "scroller history_text" },
            React.createElement("ul", { id: "history" })
        ),
        React.createElement("hr", { className: "second_divider" }),
        React.createElement(
            "button",
            { className: "btn", id: "leave_room" },
            React.createElement("i", { className: "fa fa-home" })
        )
    );
}
exports["default"] = Box;