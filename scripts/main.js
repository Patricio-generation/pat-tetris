/* import { BoardTetris } from "/scripts/boardTetris.js";
import { Tetromino, TetrominoTypes } from "/scripts/tetromino.js"; */

import { Game } from "/scripts/game.js";


const canvasTetris = document.getElementById("canvas-tetris");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;

const game = new Game(canvasTetris, rows, cols, cellSize, space);

/* const boardTetris = new BoardTetris(canvasTetris, rows, cols, cellSize, space);

const tetrominoType = TetrominoTypes.T;
const tetromino = new Tetromino(canvasTetris, cellSize, tetrominoType.shapes, tetrominoType.initPosition, tetrominoType.id); */

function update(){

    /* boardTetris.draw();
    tetromino.draw(boardTetris); */
    game.update();
    requestAnimationFrame(update);

}

update();