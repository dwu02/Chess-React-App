"use strict";

exports.__esModule = true;
window.Box = function Box() {
    return React.createElement(
        "div",
        { className: "box" },
        React.createElement("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }),
        React.createElement(
            "button",
            { className: "btn" },
            React.createElement("i", { className: "fa fa-home" })
        )
    );
}
exports["default"] = Box;
