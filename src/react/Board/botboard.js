exports.__esModule = true;
let x = ["A", "B", "C", "D", "E", "F", "G", "H"];
// order
// 1. current
// 2. diagonal up left
// 3. up
// 4. diagonal up right
// 5. left
// 6. right
// 7. diagonal down left
// 8. down
// 9. diagonal down right
let b_king_positions = ["5", "", "", "", "", "", "", "", ""];
let w_king_positions = ["61", "", "", "", "", "", "", "", ""];
let b_king_pos = "5";
let w_king_pos = "61";
let white = true;
// 1. If checkmate = 1, checkmate
// 2. If checkmate = 2, draw
// 3. If checkmate = -1, no checkmate continue playing
let checkmate = -1;
let bot = true;
let bot_color = "black";
let move_num = 1;
let cur_history = "";
//left right
let w_castling = [false, false];
let b_castling = [false, false];
let king_has_moved = [false, false];
let rooks_have_moved = [];
// if in check limit movements
let cur_in_check_w = false;
let cur_in_check_b = false;
// location of piece that has king in check
let attack_id = -1;
function determineValidProtection() {
    if (white) {
        if (determineCheck(w_king_positions[0])) return true;else return false;
    } else {
        if (determineCheck(b_king_positions[0])) return true;else return false;
    }
}
// check if white chooses white and black chooses black, etc. if not then valid check is false
function checkIfValidPieceColor(type, piece) {
    //if white
    if (type) {
        if (piece === 'url("undefined")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_pawn.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_king.png")') return false;else return true;
    }
    //if black
    else {
            if (piece === 'url("undefined")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png")' 
|| piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")' || piece === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png")') return false;else return true;
        }
}

function resetVars_bot(){
     x = ["A", "B", "C", "D", "E", "F", "G", "H"];
// order
// 1. current
// 2. diagonal up left
// 3. up
// 4. diagonal up right
// 5. left
// 6. right
// 7. diagonal down left
// 8. down
// 9. diagonal down right
 b_king_positions = ["5", "", "", "", "", "", "", "", ""];
 w_king_positions = ["61", "", "", "", "", "", "", "", ""];
 b_king_pos = "5";
 w_king_pos = "61";
 white = true;
// 1. If checkmate = 1, checkmate
// 2. If checkmate = 2, draw
// 3. If checkmate = -1, no checkmate continue playing
 checkmate = -1;
 bot = true;
 bot_color = "black";
 move_num = 1;
 cur_history = "";
//left right
 w_castling = [false, false];
 b_castling = [false, false];
 king_has_moved = [false, false];
 rooks_have_moved = [];
// if in check limit movements
 cur_in_check_w = false;
 cur_in_check_b = false;
// location of piece that has king in check
 attack_id = -1;

  firstMove = true;
 piece_moved = "";
 original_id = "";
// previous location, color of that location
 prev_id = [];
}
function checkBot() {
    if (bot) {
        AI();
    }
}

function AI() {
    //
    // Citation 1:
    // Author: Ben Jackson
    // URL: https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
    // Description: Random permutation of numbers in an array

    var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
    ranNums = [],
    i = nums.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
}
    for(let idx=0;idx<ranNums.length;idx++) {
        // get random element from array
        let index = ranNums[idx];
        // get piece of element from array, also initialize piece
        let original_square = document.getElementById(String(index));
        let color = determinePiece(document.getElementById(String(index)).style.backgroundImage)[0];
        let piece = determinePiece(document.getElementById(String(index)).style.backgroundImage)[1];
        // white or black piece
        if(white) {
            // only continue if piece is white
            if(color==="white") {
            }
        }
        else {
            // only continue if piece is black
            if(color==="black") {
                // 1. determine valid moves
                let valid_moves = determineValidMoves([color,piece],String(index));
                let valid_moves_array = Array.from(valid_moves);
                for(let move_idx = 0;move_idx<valid_moves_array.length;move_idx++) {
                    // 1. Store original image of new space and make a new variable for new space

                    let new_space = document.getElementById(String(valid_moves_array[move_idx]));
                    let new_space_img = document.getElementById(String(valid_moves_array[move_idx])).style.backgroundImage;

                    // 2. Delete image of original space

                    if(!(original_square===null)) original_square.style.backgroundImage = 'url("undefined")';

                    // 3. Set new space to be piece

                    if(!(new_space===null)) new_space.style.backgroundImage = determineAsset(color,piece);

                    // 4. update king position

                    if(piece==="king") updateKing(String(valid_moves_array[move_idx]));
                    else updateKing((white)?w_king_positions[0]:b_king_positions[0]); 

                    // 5. determine check

                    if(determineCheck((white)?w_king_positions[0]:b_king_positions[0])) {
                        valid_moves.delete(valid_moves_array[move_idx]);
                    }
                    
                    // 6. Set new space to be original image

                    if(!(new_space===null)) new_space.style.backgroundImage = new_space_img;

                    // 7. Set original space to be it's original image

                    if(!(original_square===null)) original_square.style.backgroundImage = determineAsset(color,piece);

                    // 8. update king position

                    if(piece==="king") updateKing(String(index));
                    else updateKing((white)?w_king_positions[0]:b_king_positions[0]); 

                    // make the valid move

                }
                if(valid_moves.size>0) {
                    valid_moves_array = Array.from(valid_moves);
                    // 1. set original space to be undefined

                    if(!(original_square===null)) original_square.style.backgroundImage = 'url("undefined")';

                    // 2. set new space to be piece

                    let new_square = document.getElementById(String(valid_moves_array[0]));
                    let new_square_img = "";
                    if(!(new_square===null)) new_square_img = new_square.style.backgroundImage;
                    if(!(new_square===null)) new_square.style.backgroundImage = determineAsset(color,piece);


                    if(piece==="pawn") {
                        let temp_piece = document.getElementById(String(valid_moves_array[0]));
                        if(!(temp_piece===null)) {
                            if(white&&determineRow(String(valid_moves_array[0]))===1) {
                                temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';
                            }
                            else if(!white&&determineRow(String(valid_moves_array[0]))===8) {
                                temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")';
                            }
                        }
                    }

                    // 3. update King

                    if(piece==="king") updateKing(String(valid_moves_array[0]));
                    else updateKing((white)?w_king_positions[0]:b_king_positions[0]); 

                    // 4. if capture then set it to true

                    let capture = (new_square_img==='url("undefined")')?false:true;
                    console.log(color+" "+piece);
                    console.log(valid_moves);
                    white = (white)?false:true;
                    updateBox();
                    let test = document.getElementById("history");
                    if(!(test===null)) test.innerHTML += record(piece[1],String(valid_moves_array[0]),capture)+ " ";
                    break;
                }
            }
        }
    }
}
function updateKing(id) {
    // order
    // 1. current
    // 2. diagonal up left
    // 3. up
    // 4. diagonal up right
    // 5. left
    // 6. right
    // 7. diagonal down left
    // 8. down
    // 9. diagonal down right
    let row = determineRow(id);
    let column = determineColumn(id);
    //if there is an opponent piece or vacant spot, count it and don't set it to ""
    if (white) {
        // current
        w_king_positions[0] = id;
        // diagonal up left
        if (row - 1 > 0 && column - 1 > 0 && (vacantSpot(getId(row - 1, column - 1)) || isOpponentPiece(getId(row - 1, column - 1), white ? "white" : "black"))) {     
            w_king_positions[1] = getId(row - 1, column - 1);
        } else {
            w_king_positions[1] = "";
        }
        // up
        if (row - 1 > 0 && (vacantSpot(getId(row - 1, column)) || isOpponentPiece(getId(row - 1, column), white ? "white" : "black"))) {
            w_king_positions[2] = getId(row - 1, column);
        } else {
            w_king_positions[2] = "";
        }
        // diagonal up right
        if (row - 1 > 0 && column + 1 < 9 && (vacantSpot(getId(row - 1, column + 1)) || isOpponentPiece(getId(row - 1, column + 1), white ? "white" : "black"))) {     
            w_king_positions[3] = getId(row - 1, column + 1);
        } else {
            w_king_positions[3] = "";
        }
        // left
        if (column - 1 > 0 && vacantSpot(getId(row, column - 1)) || isOpponentPiece(getId(row, column - 1), white ? "white" : "black")) {
            w_king_positions[4] = getId(row, column - 1);
        } else {
            w_king_positions[4] = "";
        }
        // right
        if (column + 1 < 9 && vacantSpot(getId(row, column + 1)) || isOpponentPiece(getId(row, column + 1), white ? "white" : "black")) {
            w_king_positions[5] = getId(row, column + 1);
        } else {
            w_king_positions[5] = "";
        }
        // diagonal down left
        if (row + 1 < 9 && column - 1 > 0 && (vacantSpot(getId(row + 1, column - 1)) || isOpponentPiece(getId(row + 1, column - 1), white ? "white" : "black"))) {     
            w_king_positions[6] = getId(row + 1, column - 1);
        } else {
            w_king_positions[6] = "";
        }
        // down
        if (row + 1 < 9 && (vacantSpot(getId(row + 1, column)) || isOpponentPiece(getId(row + 1, column), white ? "white" : "black"))) {
            w_king_positions[7] = getId(row + 1, column);
        } else {
            w_king_positions[7] = "";
        }
        // diagonal down right
        if (row + 1 < 9 && column + 1 < 9 && (vacantSpot(getId(row + 1, column + 1)) || isOpponentPiece(getId(row + 1, column + 1), white ? "white" : "black"))) {     
            w_king_positions[8] = getId(row + 1, column + 1);
        } else {
            w_king_positions[8] = "";
        }
    } else {
        // current
        b_king_positions[0] = id;
        // diagonal up left
        if (row - 1 > 0 && column - 1 > 0 && (vacantSpot(getId(row - 1, column - 1)) || isOpponentPiece(getId(row - 1, column - 1), white ? "white" : "black"))) {     
            b_king_positions[1] = getId(row - 1, column - 1);
        } else {
            b_king_positions[1] = "";
        }
        // up
        if (row - 1 > 0 && (vacantSpot(getId(row - 1, column)) || isOpponentPiece(getId(row - 1, column), white ? "white" : "black"))) {
            b_king_positions[2] = getId(row - 1, column);
        } else {
            b_king_positions[2] = "";
        }
        // diagonal up right
        if (row - 1 > 0 && column + 1 < 9 && (vacantSpot(getId(row - 1, column + 1)) || isOpponentPiece(getId(row - 1, column + 1), white ? "white" : "black"))) {     
            b_king_positions[3] = getId(row - 1, column + 1);
        } else {
            b_king_positions[3] = "";
        }
        // left
        if (column - 1 > 0 && vacantSpot(getId(row, column - 1)) || isOpponentPiece(getId(row, column - 1), white ? "white" : "black")) {
            b_king_positions[4] = getId(row, column - 1);
        } else {
            b_king_positions[4] = "";
        }
        // right
        if (column + 1 < 9 && vacantSpot(getId(row, column + 1)) || isOpponentPiece(getId(row, column + 1), white ? "white" : "black")) {
            b_king_positions[5] = getId(row, column + 1);
        } else {
            b_king_positions[5] = "";
        }
        // diagonal down left
        if (row + 1 < 9 && column - 1 > 0 && (vacantSpot(getId(row + 1, column - 1)) || isOpponentPiece(getId(row + 1, column - 1), white ? "white" : "black"))) {     
            b_king_positions[6] = getId(row + 1, column - 1);
        } else {
            b_king_positions[6] = "";
        }
        // down
        if (row + 1 < 9 && (vacantSpot(getId(row + 1, column)) || isOpponentPiece(getId(row + 1, column), white ? "white" : "black"))) {
            b_king_positions[7] = getId(row + 1, column);
        } else {
            b_king_positions[7] = "";
        }
        // diagonal down right
        if (row + 1 < 9 && column + 1 < 9 && (vacantSpot(getId(row + 1, column + 1)) || isOpponentPiece(getId(row + 1, column + 1), white ? "white" : "black"))) {     
            b_king_positions[8] = getId(row + 1, column + 1);
        } else {
            b_king_positions[8] = "";
        }
    }
}
function determineCheck(position) {
    let _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    let check = false;
    let pos = [determineRow(position), determineColumn(position)];
    //only for pawns
    if (white) {
        // up diagonal left
        if (isOpponentPiece(getId(pos[0] - 1, pos[1] - 1), white ? "white" : "black") && determinePiece((_a = document.getElementById(getId(pos[0] - 1, pos[1] - 1))) === null || _a === void 0 ? void 0 : _a.style.backgroundImage)[1] === "pawn") {
            check = true;
        }
        // up diagonal right
        if (isOpponentPiece(getId(pos[0] - 1, pos[1] + 1), white ? "white" : "black") && determinePiece((_b = document.getElementById(getId(pos[0] - 1, pos[1] + 1))) === null || _b === void 0 ? void 0 : _b.style.backgroundImage)[1] === "pawn") {
            check = true;
        }
    } else {
        // down diagonal left
        if (isOpponentPiece(getId(pos[0] + 1, pos[1] - 1), white ? "white" : "black") && determinePiece((_c = document.getElementById(getId(pos[0] + 1, pos[1] - 1))) === null || _c === void 0 ? void 0 : _c.style.backgroundImage)[1] === "pawn") {
            check = true;
        }
        // down diagonal right
        if (isOpponentPiece(getId(pos[0] + 1, pos[1] + 1), white ? "white" : "black") && determinePiece((_d = document.getElementById(getId(pos[0] + 1, pos[1] + 1))) === null || _d === void 0 ? void 0 : _d.style.backgroundImage)[1] === "pawn") {
            check = true;
        }
    }
    // check knight
    if (isOpponentPiece(getId(pos[0] - 2, pos[1] - 1), white ? "white" : "black") && determinePiece((_e = document.getElementById(getId(pos[0] - 2, pos[1] - 1))) === null || _e === void 0 ? void 0 : _e.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //up right
    if (isOpponentPiece(getId(pos[0] - 2, pos[1] + 1), white ? "white" : "black") && determinePiece((_f = document.getElementById(getId(pos[0] - 2, pos[1] + 1))) === null || _f === void 0 ? void 0 : _f.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //across left up
    if (isOpponentPiece(getId(pos[0] - 1, pos[1] - 2), white ? "white" : "black") && determinePiece((_g = document.getElementById(getId(pos[0] - 1, pos[1] - 2))) === null || _g === void 0 ? void 0 : _g.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //across left down
    if (isOpponentPiece(getId(pos[0] + 1, pos[1] - 2), white ? "white" : "black") && determinePiece((_h = document.getElementById(getId(pos[0] + 1, pos[1] - 2))) === null || _h === void 0 ? void 0 : _h.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //across right up
    if (isOpponentPiece(getId(pos[0] - 1, pos[1] + 2), white ? "white" : "black") && determinePiece((_j = document.getElementById(getId(pos[0] - 1, pos[1] + 2))) === null || _j === void 0 ? void 0 : _j.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //across right down
    if (isOpponentPiece(getId(pos[0] + 1, pos[1] + 2), white ? "white" : "black") && determinePiece((_k = document.getElementById(getId(pos[0] + 1, pos[1] + 2))) === null || _k === void 0 ? void 0 : _k.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //down left
    if (isOpponentPiece(getId(pos[0] + 2, pos[1] - 1), white ? "white" : "black") && determinePiece((_l = document.getElementById(getId(pos[0] + 2, pos[1] - 1))) === null || _l === void 0 ? void 0 : _l.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    //down right
    if (isOpponentPiece(getId(pos[0] + 2, pos[1] + 1), white ? "white" : "black") && determinePiece((_m = document.getElementById(getId(pos[0] + 2, pos[1] + 1))) === null || _m === void 0 ? void 0 : _m.style.backgroundImage)[1] === "knight") {
        check = true;
    }
    // check king
    // left
    if (isOpponentPiece(getId(pos[0], pos[1] - 1), white ? "white" : "black") && determinePiece((_o = document.getElementById(getId(pos[0], pos[1] - 1))) === null || _o === void 0 ? void 0 : _o.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // right
    if (isOpponentPiece(getId(pos[0], pos[1] + 1), white ? "white" : "black") && determinePiece((_p = document.getElementById(getId(pos[0], pos[1] + 1))) === null || _p === void 0 ? void 0 : _p.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // down left
    if (isOpponentPiece(getId(pos[0] + 1, pos[1] - 1), white ? "white" : "black") && determinePiece((_q = document.getElementById(getId(pos[0] + 1, pos[1] - 1))) === null || _q === void 0 ? void 0 : _q.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // down right
    if (isOpponentPiece(getId(pos[0] + 1, pos[1] + 1), white ? "white" : "black") && determinePiece((_r = document.getElementById(getId(pos[0] + 1, pos[1] + 1))) === null || _r === void 0 ? void 0 : _r.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // down
    if (isOpponentPiece(getId(pos[0] + 1, pos[1]), white ? "white" : "black") && determinePiece((_s = document.getElementById(getId(pos[0] + 1, pos[1]))) === null || _s === void 0 ? void 0 : _s.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // up left
    if (isOpponentPiece(getId(pos[0] - 1, pos[1] - 1), white ? "white" : "black") && determinePiece((_t = document.getElementById(getId(pos[0] - 1, pos[1] - 1))) === null || _t === void 0 ? void 0 : _t.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // up right
    if (isOpponentPiece(getId(pos[0] - 1, pos[1] + 1), white ? "white" : "black") && determinePiece((_u = document.getElementById(getId(pos[0] - 1, pos[1] + 1))) === null || _u === void 0 ? void 0 : _u.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // up
    if (isOpponentPiece(getId(pos[0] - 1, pos[1]), white ? "white" : "black") && determinePiece((_v = document.getElementById(getId(pos[0] - 1, pos[1]))) === null || _v === void 0 ? void 0 : _v.style.backgroundImage)[1] === "king") {
        check = true;
    }
    // check rook
    // //left
    let found = false;
    let possible = true;
    for (let i = 1; i < pos[1]; i++) {
        if (!found) {
            if (isOpponentPiece(getId(pos[0], i), white ? "white" : "black") && (determinePiece((_w = document.getElementById(getId(pos[0], i))) === null || _w === void 0 ? void 0 : _w.style.backgroundImage)[1] === "rook" || determinePiece((_x = document.getElementById(getId(pos[0], i))) === null || _x === void 0 ? void 0 : _x.style.backgroundImage)[1] === "queen")) {
                found = true;
            }
        } else {
            if (!vacantSpot(getId(pos[0], i))) {
                possible = false;
            }
        }
    }
    if (possible && found) {
        check = true;
    }
    // //right
    found = false;
    possible = true;
    for (let i = 8; i > pos[1]; i--) {
        if (!found) {
            if (isOpponentPiece(getId(pos[0], i), white ? "white" : "black") && (determinePiece((_y = document.getElementById(getId(pos[0], i))) === null || _y === void 0 ? void 0 : _y.style.backgroundImage)[1] === "rook" || determinePiece((_z = document.getElementById(getId(pos[0], i))) === null || _z === void 0 ? void 0 : _z.style.backgroundImage)[1] === "queen")) {
                found = true;
            }
        } else {
            if (!vacantSpot(getId(pos[0], i))) {
                possible = false;
            }
        }
    }
    if (possible && found) {
        check = true;
    }
    // //up
    found = false;
    possible = true;
    for (let i = 1; i < pos[0]; i++) {
        if (!found) {
            if (isOpponentPiece(getId(i, pos[1]), white ? "white" : "black") && (determinePiece((_0 = document.getElementById(getId(i, pos[1]))) === null || _0 === void 0 ? void 0 : _0.style.backgroundImage)[1] === "rook" || determinePiece((_1 = document.getElementById(getId(i, pos[1]))) === null || _1 === void 0 ? void 0 : _1.style.backgroundImage)[1] === "queen")) {
                found = true;
            }
        } else {
            if (!vacantSpot(getId(i, pos[1]))) {
                possible = false;
            }
        }
    }
    if (possible && found) {
        check = true;
    }
    // //down
    found = false;
    possible = true;
    for (let i = 8; i > pos[0]; i--) {
        if (!found) {
            if (isOpponentPiece(getId(i, pos[1]), white ? "white" : "black") && (determinePiece((_2 = document.getElementById(getId(i, pos[1]))) === null || _2 === void 0 ? void 0 : _2.style.backgroundImage)[1] === "rook" || determinePiece((_3 = document.getElementById(getId(i, pos[1]))) === null || _3 === void 0 ? void 0 : _3.style.backgroundImage)[1] === "queen")) {
                found = true;
            }
        } else {
            if (!vacantSpot(getId(i, pos[1]))) {
                possible = false;
            }
        }
    }
    if (possible && found) {
        check = true;
    }
    // check bishop
    // // diagonal up left
    found = false;
    possible = true;
    let col = 1;
    for (let i = pos[0] - (pos[1] - 1); i < pos[0]; i++) {
        if (i > 0) {
            if (!found) {
                if (isOpponentPiece(getId(i, col), white ? "white" : "black") && (determinePiece((_4 = document.getElementById(getId(i, col))) === null || _4 === void 
0 ? void 0 : _4.style.backgroundImage)[1] === "bishop" || determinePiece((_5 = document.getElementById(getId(i, col))) === null || _5 === void 0 ? void 0 : _5.style.backgroundImage)[1] === "queen")) {
                    found = true;
                }
            } else {
                if (!vacantSpot(getId(i, col)) && !(determinePiece((_6 = document.getElementById(getId(i, col))) === null || _6 === void 0 ? void 0 : _6.style.backgroundImage)[1] === "bishop" || determinePiece((_7 = document.getElementById(getId(i, col))) === null || _7 === void 0 ? void 0 : _7.style.backgroundImage)[1] === "queen")) {
                    possible = false;
                }
            }
        }
        col++;
    }
    if (possible && found) {
        check = true;
    }
    // // diagonal up right
    found = false;
    possible = true;
    col = 8;
    for (let i = pos[0] + pos[1] - 8; i < pos[0]; i++) {
        if (i > 0) {
            // console.log(i+" "+col);
            if (!found) {
                if (isOpponentPiece(getId(i, col), white ? "white" : "black") && (determinePiece((_8 = document.getElementById(getId(i, col))) === null || _8 === void 
0 ? void 0 : _8.style.backgroundImage)[1] === "bishop" || determinePiece((_9 = document.getElementById(getId(i, col))) === null || _9 === void 0 ? void 0 : _9.style.backgroundImage)[1] === "queen")) {
                    found = true;
                }
            } else {
                if (!vacantSpot(getId(i, col)) && !(determinePiece((_10 = document.getElementById(getId(i, col))) === null || _10 === void 0 ? void 0 : _10.style.backgroundImage)[1] === "bishop" || determinePiece((_11 = document.getElementById(getId(i, col))) === null || _11 === void 0 ? void 0 : _11.style.backgroundImage)[1] === "queen")) {
                    possible = false;
                }
            }
        }
        col--;
    }
    if (possible && found) {
        check = true;
    }
    // // diagonal down left
    found = false;
    possible = true;
    col = 1;
    for (let i = pos[0] + pos[1] - 1; i > pos[0]; i--) {
        if (i > 0) {
            // console.log(i+" "+col);
            if (!found) {
                if (isOpponentPiece(getId(i, col), white ? "white" : "black") && (determinePiece((_12 = document.getElementById(getId(i, col))) === null || _12 === void 0 ? void 0 : _12.style.backgroundImage)[1] === "bishop" || determinePiece((_13 = document.getElementById(getId(i, col))) === null || _13 === void 0 ? void 0 : _13.style.backgroundImage)[1] === "queen")) {
                    found = true;
                }
            } else {
                if (!vacantSpot(getId(i, col)) && !(determinePiece((_14 = document.getElementById(getId(i, col))) === null || _14 === void 0 ? void 0 : _14.style.backgroundImage)[1] === "bishop" || determinePiece((_15 = document.getElementById(getId(i, col))) === null || _15 === void 0 ? void 0 : _15.style.backgroundImage)[1] === "queen")) {
                    possible = false;
                }
            }
        }
        col++;
    }
    if (possible && found) {
        check = true;
    }
    // // diagonal down right
    found = false;
    possible = true;
    col = 8;
    for (let i = 8 - pos[1] + pos[0]; i > pos[0]; i--) {
        if (i > 0) {
            if (!found) {
                if (isOpponentPiece(getId(i, col), white ? "white" : "black") && (determinePiece((_16 = document.getElementById(getId(i, col))) === null || _16 === void 0 ? void 0 : _16.style.backgroundImage)[1] === "bishop" || determinePiece((_17 = document.getElementById(getId(i, col))) === null || _17 === void 0 ? void 0 : _17.style.backgroundImage)[1] === "queen")) {
                    found = true;
                }
            } else {
                if (!vacantSpot(getId(i, col)) && !(determinePiece((_18 = document.getElementById(getId(i, col))) === null || _18 === void 0 ? void 0 : _18.style.backgroundImage)[1] === "bishop" || determinePiece((_19 = document.getElementById(getId(i, col))) === null || _19 === void 0 ? void 0 : _19.style.backgroundImage)[1] === "queen")) {
                    possible = false;
                }
            }
        }
        col--;
    }
    if (possible && found) {
        check = true;
    }
    // console.log(check+" "+getId(pos[0],pos[1]));
    return check;
}
function determineCheckMate() {
let _a;
let legal_moves = new Set();
for (let row_iterator = 1; row_iterator <= 8; row_iterator++) {
for (let col_iterator = 1; col_iterator <= 8; col_iterator++) {
    let piece = determinePiece(String((_a = document.getElementById(getId(row_iterator, col_iterator))) === null || _a === void 0 ? void 0 : _a.style.backgroundImage));
    let moves = Array.from(determineValidMoves([piece[0], piece[1]], getId(row_iterator, col_iterator)));
    // checks if color is white or black
    if (white) {
        if (piece[0] === "white") {
            // first check if it at least has some possible moves
            if (moves.length > 0) {
                for (let move_iterator = 0; move_iterator < moves.length; move_iterator++) {
                    // console.log(piece[0]+" "+piece[1]+" "+moves[move_iterator]);
                    // simply ids
                    let original_id_1 = getId(row_iterator, col_iterator);
                    let new_id = String(moves[move_iterator]);
                    // object of aforementioned ids
                    let original_object = document.getElementById(original_id_1);
                    let new_object = document.getElementById(new_id);
                    let piece_to_be_moved = piece[1];
                    // console.log(piece_to_be_moved+" "+original_id+" "+new_id);
                    // if((white)?!determineCheck(w_king_positions[0]):!determineCheck(b_king_positions[0]))
                    // begin pseudo test of check on possible move
                    // 'url("undefined")'
                    // 1. store, new space's original asset
                    let original_asset_new = "";
                    if (!(new_object === null)) original_asset_new = new_object.style.backgroundImage;
                    // 2. set new space to be location of selected piece
                    if (!(new_object === null)) new_object.style.backgroundImage = determineAsset(piece[0], piece[1]);
                    // 3. set original space from where piece came from to be nothing
                    if (!(original_object === null)) original_object.style.backgroundImage = 'url("undefined")';
                    // 4. update king adjacent positions
                    if (piece[1] === "king") updateKing(new_id);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                    // 5. check if move would not king in check, if not then add it to legal moves set
                    if (white ? !determineCheck(w_king_positions[0]) : !determineCheck(b_king_positions[0])) {
                        legal_moves.add(piece[0] + " " + piece[1] + " " + new_id);
                    }
                    // 6. set new space back to its original
                    if (!(new_object === null)) new_object.style.backgroundImage = original_asset_new;
                    // 7. set original space back to its original
                    if (!(original_object === null)) original_object.style.backgroundImage = determineAsset(piece[0], piece[1]);
                    // 8. update kings' to original spots
                    if (piece[1] === "king") updateKing(original_id_1);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                }
            }
        }
    } else {
        if (piece[0] === "black") {
            // first check if it at least has some possible moves
            if (moves.length > 0) {
                for (let move_iterator = 0; move_iterator < moves.length; move_iterator++) {
                    // console.log(piece[0]+" "+piece[1]+" "+moves[move_iterator]);
                    // simply ids
                    let original_id_2 = getId(row_iterator, col_iterator);
                    let new_id = String(moves[move_iterator]);
                    // object of aforementioned ids
                    let original_object = document.getElementById(original_id_2);
                    let new_object = document.getElementById(new_id);
                    let piece_to_be_moved = piece[1];
                    // console.log(piece_to_be_moved+" "+original_id+" "+new_id);
                    // if((white)?!determineCheck(w_king_positions[0]):!determineCheck(b_king_positions[0]))
                    // begin pseudo test of check on possible move
                    // 'url("undefined")'
                    // 1. store, new space's original asset
                    let original_asset_new = "";
                    if (!(new_object === null)) original_asset_new = new_object.style.backgroundImage;
                    // 2. set new space to be location of selected piece
                    if (!(new_object === null)) new_object.style.backgroundImage = determineAsset(piece[0], piece[1]);
                    // 3. set original space from where piece came from to be nothing
                    if (!(original_object === null)) original_object.style.backgroundImage = 'url("undefined")';
                    // 4. update king adjacent positions
                    if (piece[1] === "king") updateKing(new_id);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                    // 5. check if move would not king in check, if not then add it to legal moves set
                    if (white ? !determineCheck(w_king_positions[0]) : !determineCheck(b_king_positions[0])) {
                        legal_moves.add(piece[0] + " " + piece[1] + " " + new_id);
                    }
                    // 6. set new space back to its original
                    if (!(new_object === null)) new_object.style.backgroundImage = original_asset_new;
                    // 7. set original space back to its original
                    if (!(original_object === null)) original_object.style.backgroundImage = determineAsset(piece[0], piece[1]);
                    // 8. update kings' to original spots
                    if (piece[1] === "king") updateKing(original_id_2);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                }
            }
        }
    }
}
}
console.log(legal_moves);
if (legal_moves.size === 0 && !determineCheck(white ? w_king_positions[0] : b_king_positions[0])) {
return 2;
} else if (legal_moves.size === 0 && determineCheck(white ? w_king_positions[0] : b_king_positions[0])) {
return 1;
} else {
return -1;
}
}
function isUndefined(piece) {
    if (piece === 'url("undefined")') {
    return true;
    }
    return false;
}
let firstMove = true;
let piece_moved = "";
let original_id = "";
// previous location, color of that location
let prev_id = [];
function pieceToAsset(asset) {
    let color = asset[0];
    let piece = asset[1];
    if (color === "white") {
    if (piece === "pawn") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';else if (piece === "bishop") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png")';else if (piece === "knight") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png")';else if (piece === "king") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png")';else if (piece === "rook") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png")';else if (piece === "queen") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';
    } else {}
}
function determineAsset(color, piece) {
    if (color === "white") {
    if (piece === "pawn") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png")';else if (piece === "rook") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png")';else if (piece === "knight") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png")';else if (piece === "bishop") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png")';else if (piece === "queen") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';else if (piece === "king") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png")';
    } else {
    if (piece === "pawn") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_pawn.png")';else if (piece === "rook") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png")';else if (piece === "knight") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png")';else if (piece === "bishop") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png")';else if (piece === "queen") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")';else if (piece === "king") return 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_king.png")';
    }
}
function determinePiece(asset) {
    let elements = [];
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_pawn.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_pawn.png")') {
        elements = ["white", "pawn"];
    } else elements = ["black", "pawn"];
    } else if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_knight.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_knight.png")') {
        elements = ["white", "knight"];
    } else elements = ["black", "knight"];
    } else if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_bishop.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_bishop.png")') {
        elements = ["white", "bishop"];
    } else elements = ["black", "bishop"];
    } else if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")') {
        elements = ["white", "queen"];
    } else elements = ["black", "queen"];
    } else if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_king.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_king.png")') {
        elements = ["white", "king"];
    } else elements = ["black", "king"];
    } else if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png")' || asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_rook.png")') {
    if (asset === 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_rook.png")') {
        elements = ["white", "rook"];
    } else elements = ["black", "rook"];
    }
    return elements;
}
function hasPiece(id) {
    let piece = document.getElementById(id);
    if (!(piece == null)) {
    // 'url("undefined")'
    if (piece.style.backgroundImage === 'url("undefined")') {
        return false;
    }
    return true;
    }
}
function determineColumn(id) {
    let item = parseInt(id);
    if (item === 1 || item === 9 || item === 17 || item === 25 || item === 33 || item === 41 || item === 49 || item === 57) {
    return 1;
    } else if (item === 2 || item === 10 || item === 18 || item === 26 || item === 34 || item === 42 || item === 50 || item === 58) {
    return 2;
    } else if (item === 3 || item === 11 || item === 19 || item === 27 || item === 35 || item === 43 || item === 51 || item === 59) {
    return 3;
    } else if (item === 4 || item === 12 || item === 20 || item === 28 || item === 36 || item === 44 || item === 52 || item === 60) {
    return 4;
    } else if (item === 5 || item === 13 || item === 21 || item === 29 || item === 37 || item === 45 || item === 53 || item === 61) {
    return 5;
    } else if (item === 6 || item === 14 || item === 22 || item === 30 || item === 38 || item === 46 || item === 54 || item === 62) {
    return 6;
    } else if (item === 7 || item === 15 || item === 23 || item === 31 || item === 39 || item === 47 || item === 55 || item === 63) {
    return 7;
    } else if (item === 8 || item === 16 || item === 24 || item === 32 || item === 40 || item === 48 || item === 56 || item === 64) {
    return 8;
    }
}
function determineRow(id) {
    let item = parseInt(id);
    if (item >= 1 && item <= 8) {
    return 1;
    } else if (item >= 9 && item <= 16) {
    return 2;
    } else if (item >= 17 && item <= 24) {
    return 3;
    } else if (item >= 25 && item <= 32) {
    return 4;
    } else if (item >= 33 && item <= 40) {
    return 5;
    } else if (item >= 41 && item <= 48) {
    return 6;
    } else if (item >= 49 && item <= 56) {
    return 7;
    } else if (item >= 57 && item <= 64) {
    return 8;
    }
}
function getId(row, column) {
    return String(row * 8 - 7 + column - 1);
}
function isOpponentPiece(id, original_color) {
    let piece = document.getElementById(id);
    if (!(piece == null)) piece = piece.style.backgroundImage;
    let color = determinePiece(piece)[0];
    if (color != undefined && color != original_color) {
    return true;
    }
    return false;
}
function isFriendlyPiece(id, original_color) {
    let piece = document.getElementById(id);
    if (!(piece == null)) piece = piece.style.backgroundImage;
    let color = determinePiece(piece)[0];
    if (color != undefined && color === original_color) {
    return true;
    }
    return false;
}
function vacantSpot(id) {
let piece = document.getElementById(id);
if (!(piece == null)) piece = piece.style.backgroundImage;
let color = determinePiece(piece)[0];
return color === undefined;
}
function determineValidMoves(elements, id) {
let foundOpponent = false;
let color = elements[0];
let piece = elements[1];
let cur_location = [determineRow(id), determineColumn(id)];
cur_location[1] = Number(cur_location[1]);
let possible_moves = new Set();
if (piece === "pawn") {
if (color === "white") {
    //if they have not moved yet on starting row
    if (cur_location[0] === 7) {
        if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
            if (!isOpponentPiece(getId(cur_location[0] - 2, cur_location[1]), white ? "white" : "black")) {
                possible_moves.add(getId(cur_location[0] - 2, cur_location[1]));
            }
        }
    }
    if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
        if (!isOpponentPiece(getId(cur_location[0] - 1, cur_location[1]), white ? "white" : "black")) {
            possible_moves.add(getId(cur_location[0] - 1, cur_location[1]));
        } else {
            possible_moves["delete"](getId(cur_location[0] - 2, cur_location[1]));
        }
    }
    if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
        if (cur_location[1] != 1) {
            if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] - 1), white ? "white" : "black")) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] - 1));
            }
        }
        if (cur_location[1] != 8) {
            if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] + 1), white ? "white" : "black")) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] + 1));
            }
        }
    }
} else {
    if (cur_location[0] === 2) {
        if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
            if (!isOpponentPiece(getId(cur_location[0] + 2, cur_location[1]), white ? "white" : "black")) {
                possible_moves.add(getId(cur_location[0] + 2, cur_location[1]));
            }
        }
    }
    if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
        if (!isOpponentPiece(getId(cur_location[0] + 1, cur_location[1]), white ? "white" : "black")) {
            possible_moves.add(getId(cur_location[0] + 1, cur_location[1]));
        } else {
            possible_moves["delete"](getId(cur_location[0] + 2, cur_location[1]));
        }
    }
    if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] + 1), white ? "white" : "black")) {
            possible_moves.add(getId(cur_location[0] + 1, cur_location[1] + 1));
        }
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] - 1), white ? "white" : "black")) {
            possible_moves.add(getId(cur_location[0] + 1, cur_location[1] - 1));
        }
    }
}
} else if (piece === "knight") {
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    //vertical
    if (!(cur_location[1] === 1)) {
        //down left (vertical)
        if (isOpponentPiece(getId(cur_location[0] + 2, cur_location[1] - 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 2, cur_location[1] - 1))) {
            if (!(Number(getId(cur_location[0] + 2, cur_location[1] - 1)) > 64) && !(Number(getId(cur_location[0] + 2, cur_location[1] - 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 2, cur_location[1] - 1));
            }
        }
        // up left (vertical)
        if (isOpponentPiece(getId(cur_location[0] - 2, cur_location[1] - 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 2, cur_location[1] - 1))) {
            if (!(Number(getId(cur_location[0] - 2, cur_location[1] - 1)) > 64) && !(Number(getId(cur_location[0] - 2, cur_location[1] - 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 2, cur_location[1] - 1));
            }
        }
    }
    if (!(cur_location[1] === 2 || cur_location[1] === 1)) {
        // left up 1
        if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] - 2), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 1, cur_location[1] - 2))) {
            if (!(Number(getId(cur_location[0] - 1, cur_location[1] - 2)) > 64) && !(Number(getId(cur_location[0] - 1, cur_location[1] - 2)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] - 2));
            }
        }
        // left down 1
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] - 2), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 1, cur_location[1] - 2))) {
            if (!(Number(getId(cur_location[0] + 1, cur_location[1] - 2)) > 64) && !(Number(getId(cur_location[0] + 1, cur_location[1] - 2)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 1, cur_location[1] - 2));
            }
        }
    }
    if (!(cur_location[1] === 8)) {
        //down right (vertical)
        if (isOpponentPiece(getId(cur_location[0] + 2, cur_location[1] + 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 2, cur_location[1] + 1))) {
            if (!(Number(getId(cur_location[0] + 2, cur_location[1] + 1)) > 64) && !(Number(getId(cur_location[0] + 2, cur_location[1] + 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 2, cur_location[1] + 1));
            }
        }
        // up right (vertical)
        if (isOpponentPiece(getId(cur_location[0] - 2, cur_location[1] + 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 2, cur_location[1] + 1))) {
            if (!(Number(getId(cur_location[0] - 2, cur_location[1] + 1)) > 64) && !(Number(getId(cur_location[0] - 2, cur_location[1] + 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 2, cur_location[1] + 1));
            }
        }
    }
    if (!(cur_location[1] === 8 || cur_location[1] === 7)) {
        // right up 1
        if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] + 2), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 1, cur_location[1] + 2))) {
            if (!(Number(getId(cur_location[0] - 1, cur_location[1] + 2)) > 64) && !(Number(getId(cur_location[0] - 1, cur_location[1] + 2)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] + 2));
            }
        }
        // right down 1
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] + 2), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 1, cur_location[1] + 2))) {
            if (!(Number(getId(cur_location[0] + 1, cur_location[1] + 2)) > 64) && !(Number(getId(cur_location[0] + 1, cur_location[1] + 2)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 1, cur_location[1] + 2));
            }
        }
    }
}
} else if (piece === "bishop") {
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    //diagonal down right
    let auxiliary_count = cur_location[0] + 1;
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count++;
    }
    //diagonal up left
    foundOpponent = false;
    auxiliary_count = cur_location[0] - 1;
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count--;
    }
    //diagonal up right
    foundOpponent = false;
    auxiliary_count = cur_location[0] - 1;
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count--;
    }
    //diagonal down left
    foundOpponent = false;
    auxiliary_count = cur_location[0] + 1;
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count++;
    }
}
} else if (piece === "king") {
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    //castling
    let possible_castling = white ? w_castling : b_castling;
    //left
    if (possible_castling[0]) {
        possible_moves.add(getId(cur_location[0], cur_location[1] - 2));
    }
    //right
    if (possible_castling[0]) {
        possible_moves.add(getId(cur_location[0], cur_location[1] + 2));
    }
    // diagonal up left
    if (!(cur_location[1] === 1) || cur_location[0] === 8) {
        if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] - 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 1, cur_location[1] - 1))) {
            if (!(Number(getId(cur_location[0] - 1, cur_location[1] - 1)) > 64) && !(Number(getId(cur_location[0] - 1, cur_location[1] - 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] - 1));
            }
        }
    }
    //diagonal up right
    if (!(cur_location[1] === 8) || cur_location[0] === 8) {
        if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1] + 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 1, cur_location[1] + 1))) {
            if (!(Number(getId(cur_location[0] - 1, cur_location[1] + 1)) > 64) && !(Number(getId(cur_location[0] - 1, cur_location[1] + 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1] + 1));
            }
        }
    }
    // diagonal down left
    if (!(cur_location[1] === 1) || cur_location[0] === 8) {
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] - 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 1, cur_location[1] - 1))) {
            if (!(Number(getId(cur_location[0] + 1, cur_location[1] - 1)) > 64) && !(Number(getId(cur_location[0] + 1, cur_location[1] - 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 1, cur_location[1] - 1));
            }
        }
    }
    //diagonal down right
    if (!(cur_location[1] === 8) || cur_location[0] === 8) {
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1] + 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 1, cur_location[1] + 1))) {
            if (!(Number(getId(cur_location[0] + 1, cur_location[1] + 1)) > 64) && !(Number(getId(cur_location[0] + 1, cur_location[1] + 1)) < 1)) {
                possible_moves.add(getId(cur_location[0] + 1, cur_location[1] + 1));
            }
        }
    }
    // up 1
    if (!(cur_location[0] === 1)) {
        if (isOpponentPiece(getId(cur_location[0] - 1, cur_location[1]), white ? "white" : "black") || vacantSpot(getId(cur_location[0] - 1, cur_location[1]))) {
            if (!(Number(getId(cur_location[0] - 1, cur_location[1])) > 64) && !(Number(getId(cur_location[0] - 1, cur_location[1])) < 1)) {
                possible_moves.add(getId(cur_location[0] - 1, cur_location[1]));
            }
        }
    }
    // down 1
    if (!(cur_location[0] === 8)) {
        if (isOpponentPiece(getId(cur_location[0] + 1, cur_location[1]), white ? "white" : "black") || vacantSpot(getId(cur_location[0] + 1, cur_location[1]))) {
            if (!(Number(getId(cur_location[0] + 1, cur_location[1])) > 64) && !(Number(getId(cur_location[0] + 1, cur_location[1])) < 1)) {
                possible_moves.add(getId(cur_location[0] + 1, cur_location[1]));
            }
        }
    }
    // left 1
    if (!(cur_location[1] === 1)) {
        if (isOpponentPiece(getId(cur_location[0], cur_location[1] - 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0], cur_location[1] - 1))) {
            if (!(Number(getId(cur_location[0], cur_location[1] - 1)) > 64) && !(Number(getId(cur_location[0], cur_location[1] - 1)) < 1)) {
                possible_moves.add(getId(cur_location[0], cur_location[1] - 1));
            }
        }
    }
    // right 1
    if (!(cur_location[1] === 8)) {
        if (isOpponentPiece(getId(cur_location[0], cur_location[1] + 1), white ? "white" : "black") || vacantSpot(getId(cur_location[0], cur_location[1] + 1))) {
            if (!(Number(getId(cur_location[0], cur_location[1] + 1)) > 64) && !(Number(getId(cur_location[0], cur_location[1] + 1)) < 1)) {
                possible_moves.add(getId(cur_location[0], cur_location[1] + 1));
            }
        }
    }
}
} else if (piece === "rook") {
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    // check right
    let auxiliary_count = cur_location[0];
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check left
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check up
    auxiliary_count = cur_location[1];
    for (let i = cur_location[0] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") || vacantSpot(getId(i, auxiliary_count))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") ? true : false;
            if (!(Number(getId(i, auxiliary_count)) > 64) && !(Number(getId(i, auxiliary_count)) < 1)) {
                possible_moves.add(getId(i, auxiliary_count));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check down
    auxiliary_count = cur_location[1];
    for (let i = cur_location[0] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") || vacantSpot(getId(i, auxiliary_count))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") ? true : false;
            if (!(Number(getId(i, auxiliary_count)) > 64) && !(Number(getId(i, auxiliary_count)) < 1)) {
                possible_moves.add(getId(i, auxiliary_count));
            }
        } else {
            break;
        }
    }
}
} else if (piece === "queen") {
//bishop possible moves
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    //diagonal down right
    let auxiliary_count = cur_location[0] + 1;
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count++;
    }
    //diagonal up left
    foundOpponent = false;
    auxiliary_count = cur_location[0] - 1;
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count--;
    }
    //diagonal up right
    foundOpponent = false;
    auxiliary_count = cur_location[0] - 1;
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count--;
    }
    //diagonal down left
    foundOpponent = false;
    auxiliary_count = cur_location[0] + 1;
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
        auxiliary_count++;
    }
}
//rook possible moves
foundOpponent = false;
if (!(cur_location[0] == null) && !(cur_location[1] == null)) {
    // check right
    let auxiliary_count = cur_location[0];
    for (let i = cur_location[1] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check left
    for (let i = cur_location[1] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") || vacantSpot(getId(auxiliary_count, i))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(auxiliary_count, i), white ? "white" : "black") ? true : false;
            if (!(Number(getId(auxiliary_count, i)) > 64) && !(Number(getId(auxiliary_count, i)) < 1)) {
                possible_moves.add(getId(auxiliary_count, i));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check up
    auxiliary_count = cur_location[1];
    for (let i = cur_location[0] - 1; i >= 1; i--) {
        if ((isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") || vacantSpot(getId(i, auxiliary_count))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") ? true : false;
            if (!(Number(getId(i, auxiliary_count)) > 64) && !(Number(getId(i, auxiliary_count)) < 1)) {
                possible_moves.add(getId(i, auxiliary_count));
            }
        } else {
            break;
        }
    }
    foundOpponent = false;
    //check down
    auxiliary_count = cur_location[1];
    for (let i = cur_location[0] + 1; i <= 8; i++) {
        if ((isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") || vacantSpot(getId(i, auxiliary_count))) && !foundOpponent) {
            foundOpponent = isOpponentPiece(getId(i, auxiliary_count), white ? "white" : "black") ? true : false;
            if (!(Number(getId(i, auxiliary_count)) > 64) && !(Number(getId(i, auxiliary_count)) < 1)) {
                possible_moves.add(getId(i, auxiliary_count));
            }
        } else {
            break;
        }
    }
}
}
return possible_moves;
}
function botmove(e) {
// if a piece has not been set yet
if (((white && match_color === "white") || (!white && match_color === "black"))){

    if (firstMove) {
    let auxiliary_var = document.getElementById(e.target.id);
    if (!(auxiliary_var == null)) {
        let piece = auxiliary_var.style.backgroundImage;
        if (checkIfValidPieceColor(white, piece)) {
            piece_moved = piece;
            determineValidMoves(determinePiece(piece_moved), auxiliary_var.id);
            original_id = auxiliary_var.id;
            let original_square = e.target.parentElement;
            if (!(original_square == null)) prev_id = [original_id, original_square.className];
            if (!(original_square == null)) original_square.className = "square selected";
            firstMove = false;
        }
    }
    }
    // second move
    else {
        let auxiliary_var = document.getElementById(e.target.id);
        if (!(auxiliary_var == null)) {
            // if another piece is chosen and if it is not a black
            if (!isUndefined(auxiliary_var.style.backgroundImage)) {
                if (checkIfValidPieceColor(white, auxiliary_var.style.backgroundImage)) {
                    piece_moved = auxiliary_var.style.backgroundImage;
                    determineValidMoves(determinePiece(piece_moved), auxiliary_var.id);
                    original_id = auxiliary_var.id;
                    let original_square = e.target.parentElement;
                    let change = document.getElementById(prev_id[0]);
                    if (!(change == null)) change = change.parentElement;
                    if (!(change == null)) change.className = prev_id[1];
                    if (!(original_square == null)) prev_id = [original_id, original_square.className];
                    if (!(original_square == null)) original_square.className = "square selected";
                } else {
                    //capture a piece
                    // location of the piece to be moved
                    let another_var = document.getElementById(original_id);
                    let piece = "";
                    if (!(another_var == null)) piece = another_var.style.backgroundImage;
                    if (determineValidMoves(determinePiece(piece), original_id).has(auxiliary_var.id)) {
                        let change = document.getElementById(prev_id[0]);
                        if (!(change == null)) change = change.parentElement;
                        if (!(change == null)) change.className = prev_id[1];
                        //set temporary variable to the initial piece
                        let original_image = auxiliary_var.style.backgroundImage;
                        auxiliary_var.style.backgroundImage = piece_moved;
                        let original_location = document.getElementById(original_id);
                        if (!(original_location == null)) original_location.style.backgroundImage = 'url("undefined")';
                        if (determinePiece(piece)[1] === "king") updateKing(auxiliary_var.id);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);  
                        if (white ? !determineCheck(w_king_positions[0]) : !determineCheck(b_king_positions[0])) {
                            firstMove = true;
                            if (determinePiece(piece)[1] === "pawn") {
                                let temp_piece = document.getElementById(auxiliary_var.id);
                                if (!(temp_piece === null)) {
                                    if (white && determineRow(auxiliary_var.id) === 1) {
                                        temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';
                                    } else if (!white && determineRow(auxiliary_var.id) === 8) {
                                        temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")';
                                    }
                                }
                            }
                            // console.log(getAllPossibleMoves());
                            white = white ? false : true;
                            updateBox();


                            let test = document.getElementById("history");
                            if (!(test === null)) test.innerHTML += record(piece, auxiliary_var.id, true) + " ";
                            checkBot();



                        } else {
                            // sets the moved space to original image
                            auxiliary_var.style.backgroundImage = original_image;
                            let reset_piece = document.getElementById(prev_id[0]);
                            if (!(reset_piece === null)) reset_piece.style.backgroundImage = piece_moved;
                            if (determinePiece(piece_moved)[1] === "king") updateKing(prev_id[0]);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                        }
                    }
                   
                }
            }
            // move piece to empty square
            else {
                    let another_var = document.getElementById(original_id);
                    let piece = "";
                    if (!(another_var == null)) piece = another_var.style.backgroundImage;
                    if (determineValidMoves(determinePiece(piece), original_id).has(auxiliary_var.id)) {
                        // setting space to selected piece
                        let change = document.getElementById(prev_id[0]);
                        if (!(change == null)) change = change.parentElement;
                        if (!(change == null)) change.className = prev_id[1];
                        let original_image = auxiliary_var.style.backgroundImage;
                        auxiliary_var.style.backgroundImage = piece_moved;
                        if (!(original_id == null)) {
                            let original_location = document.getElementById(original_id);
                            if (!(original_location == null)) original_location.style.backgroundImage = 'url("undefined")';
                        }
                        if (determinePiece(piece)[1] === "king") updateKing(auxiliary_var.id);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);  
                        if (white ? !determineCheck(w_king_positions[0]) : !determineCheck(b_king_positions[0])) {
                            firstMove = true;
                            //promotion
                            if (determinePiece(piece)[1] === "pawn") {
                                let temp_piece = document.getElementById(auxiliary_var.id);
                                if (!(temp_piece === null)) {
                                    if (white && determineRow(auxiliary_var.id) === 1) {
                                        temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/w_queen.png")';
                                    } else if (!white && determineRow(auxiliary_var.id) === 8) {
                                        temp_piece.style.backgroundImage = 'url("http://ec2-3-142-151-74.us-east-2.compute.amazonaws.com:3456/public/assets/b_queen.png")';
                                    }
                                }
                            }
                            white = white ? false : true;
                            updateBox();

                            let test = document.getElementById("history");
                            if (!(test === null)) test.innerHTML += record(piece, auxiliary_var.id, false) + " ";
                            checkBot();


                        }
                        // if illegal move, reset
                        else {
                                // sets the moved space to original image
                                auxiliary_var.style.backgroundImage = original_image;
                                let reset_piece = document.getElementById(prev_id[0]);
                                if (!(reset_piece === null)) reset_piece.style.backgroundImage = piece_moved;
                                if (determinePiece(piece_moved)[1] === "king") updateKing(prev_id[0]);else updateKing(white ? w_king_positions[0] : b_king_positions[0]);
                            }
                    }
                }
        }
    }
}
}



function record(piece, id, capture) {
    piece = determinePiece(piece)[1];
    let row = determineRow(id);
    let column = determineColumn(id);
    return getStringID(row, column, piece, capture);
}

function getStringID(row, column, piece, capture) {
    let letter = "";
    let num = 0;
    let char = "";
    let x = "";
    let color = white ? w_king_positions[0] : b_king_positions[0];
    let incheck = determineCheck(color);
    let plus = incheck ? "+" : "";
    if (column === 1) letter = "a";else if (column === 2) letter = "b";else if (column === 3) letter = "c";else if (column === 4) letter = "d";else if (column === 5) letter = "e";else if (column === 6) letter = "f";else if (column === 7) letter = "g";else if (column === 8) letter = "h";
    if (row === 1) num = 8;else if (row === 2) num = 7;else if (row === 3) num = 6;else if (row === 4) num = 5;else if (row === 5) num = 4;else if (row === 6) num = 3;else if (row === 7) num = 2;else if (row === 8) num = 1;
    if (piece === "knight") char = "N";else if (piece === "bishop") char = "B";else if (piece === "rook") char = "R";else if (piece === "queen") char = "Q";else if (piece === "king") char = "K";
    if (capture) x = "x";
    if (white) move_num++;
    let new_line = white ? "<br />" : "";
    let counter = !white ? move_num + ". " : "";
    attack_id = incheck ? parseInt(getId(row, column)) : attack_id;
    let code = counter + char + letter + x + num + plus + new_line;
    return code;
    }
    function updateBox() {
    let changeText = document.getElementById("currentTurn");
    if (!(changeText === null)) {

    changeText.innerHTML = changeText.innerHTML === username ? "Bot" : username;

    changeText.style.color = changeText.innerHTML === username ? "white" : "black";
    }
}

function isMoveValid() {
    return false;
}
window.BotBoard = function Board() {
    let squares = [];
    let odd = "true";
    let counter = 1;
    let iterator = 1;
    let _loop_1 = function _loop_1(i) {
        x.forEach(function (entry) {
            let id_iterator = String(iterator);
            squares.push(React.createElement(window.Square, { id_iterator: id_iterator, num: i, odd: odd, letter: entry, row: counter }));
            odd = odd === "false" ? "true" : "false";
            iterator++;
        });
        counter++;
    };
    for (let i = 8; i > 0; i--) {
        _loop_1(i);
    }
    return React.createElement(
        "div",
        { onMouseDown: function onMouseDown(e) {
                return botmove(e);
            }, id: "board" },
        squares
    );
}
exports["default"] = BotBoard;