"user strict";
exports.__esModule = true;
window.Square = function Square(_a) {
    let odd = _a.odd,
        num = _a.num,
        letter = _a.letter,
        row = _a.row,
        id_iterator = _a.id_iterator;
    if (num % 2 === 0) {
        if (odd === "true") return React.createElement(
            "div",
            { className: "square white" },
            React.createElement("div", { id: id_iterator, style: { backgroundImage: "url(" + whatAsset(row, letter) + ")" }, className: "piece" })
        );else return React.createElement(
            "div",
            { className: "square dark" },
            React.createElement("div", { id: id_iterator, style: { backgroundImage: "url(" + whatAsset(row, letter) + ")" }, className: "piece" })
        );
    } else {
        if (odd === "true") return React.createElement(
            "div",
            { className: "square dark" },
            React.createElement("div", { id: id_iterator, style: { backgroundImage: "url(" + whatAsset(row, letter) + ")" }, className: "piece" })
        );else return React.createElement(
            "div",
            { className: "square white" },
            React.createElement("div", { id: id_iterator, style: { backgroundImage: "url(" + whatAsset(row, letter) + ")" }, className: "piece" })
        );
    }
}
exports["default"] = Square;
// document.getElementById("29").className = "weekend_light";
function whatPieceId(asset) {
    if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png") {
        return "rook";
    } else if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png") {
        return "knight";
    } else if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png") {
        return "bishop";
    } else if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png") {
        return "queen";
    } else if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_king.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png") {
        return "king";
    } else if (asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_pawn.png" || asset === "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png") {
        return "pawn";
    }
}
function whatAsset(row, letter) {
    // dark pieces
    if (row < 3) {
        if (row === 1) {
            if (letter === "A") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png";
            }
            if (letter === "B") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png";
            }
            if (letter === "C") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png";
            }
            if (letter === "D") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png";
            }
            if (letter === "E") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_king.png";
            }
            if (letter === "F") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png";
            }
            if (letter === "G") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png";
            }
            if (letter === "H") {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png";
            }
        } else {
            return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_pawn.png";
        }
    }
    // white pieces
    else if (row > 6) {
            if (row === 8) {
                if (letter === "A") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png";
                }
                if (letter === "B") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png";
                }
                if (letter === "C") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png";
                }
                if (letter === "D") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png";
                }
                if (letter === "E") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png";
                }
                if (letter === "F") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png";
                }
                if (letter === "G") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png";
                }
                if (letter === "H") {
                    return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png";
                }
            } else {
                return "http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png";
            }
        }
}
