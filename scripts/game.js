import { BoardTetris } from "/scripts/boardTetris.js";
import { TetrominosBag } from "/scripts/tetromino.js";

export class Game {
    constructor(canvas, rows, cols, cellSize, space) {
        this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominosBag = new TetrominosBag(canvas, cellSize);
        this.currentTetromino = this.tetrominosBag.nextTetromino();
        this.keyboard();
        this.keys = {up:false, down:false};

        this.lastTime = 0;
        this.lastTime2 = 0;

        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        this.registerTouchEvents();


    }
    update(){
        let currentTime = Date.now();
        let deltaTime = currentTime - this.lastTime;
        let deltaTime2 = currentTime - this.lastTime2;

        if(deltaTime >= 1000){
            this.autoMoveTetrominoDown();
            this.lastTime = currentTime;
        }

        if(deltaTime2 >= 50){
            this.boardTetris.draw();
            this.currentTetromino.draw(this.boardTetris);
            if(this.keys.down){
                this.moveTetrominoDown();
            }


            this.lastTime2 = currentTime;
        }

        this.boardTetris.draw();
        this.currentTetromino.draw(this.boardTetris);
    }

    autoMoveTetrominoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(-1,0);
            this.placeTetromino();
        }
    }


    blockedTetromino(){
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i=0; i<tetrominoPositions.length; i++){
            if(!this.boardTetris.isEmpty(tetrominoPositions[i].row, tetrominoPositions[i].column)) {
                return true;
            }
        }
        return false;
    }
    moveTetrominoLeft(){
        this.currentTetromino.move(0,-1);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(0,1);
        }
    }
    moveTetrominoRight(){
        this.currentTetromino.move(0,1);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(0,-1);
        }
    }
    moveTetrominoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(-1,0);
        }
    }   
    rotationTetrominoCW(){
        this.currentTetromino.rotation++;
        if(this.currentTetromino.rotation > this.currentTetromino.shapes.length-1){
            this.currentTetromino.rotation = 0;
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCCW();
        }
    }
    rotationTetrominoCCW(){
        this.currentTetromino.rotation--;
        if(this.currentTetromino.rotation<0){
            this.currentTetromino.rotation = this.currentTetromino.shapes.length -1;
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCW();
        }
    }

    placeTetromino() {
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i< tetrominoPositions.length; i++) {
            this.boardTetris.matriz[tetrominoPositions[i].row][tetrominoPositions[i].column] = this.currentTetromino.id;
        }

        this.boardTetris.clearFullRows();

        if(this.boardTetris.gameOver()){
            return true;
        } else {
            this.currentTetromino = this.tetrominosBag.nextTetromino();
        }
    }

    dropDistance(position){
        let distance = 0;
        while(this.boardTetris.isEmpty(position.row + distance + 1, position.column)){
            distance++;
        }
        return distance;
    }

    keyboard(){
        window.addEventListener("keydown",(evt)=>{
            if(evt.key === "ArrowLeft"){
                this.moveTetrominoLeft();
            }
            if(evt.key === "ArrowRight"){
                this.moveTetrominoRight();
            }
            if(evt.key === "ArrowUp" && !this.keys.up){
                this.rotationTetrominoCW();
                this.keys.up = true;
            }
            if(evt.key === "ArrowDown"){
                this.keys.down = true;
            }
        });
        window.addEventListener("keyup", (evt)=>{
            if(evt.key === "ArrowUp"){
                this.keys.up = false;
            }
            if(evt.key === "ArrowDown"){
                this.keys.down = false;
            }
        });
    }

    registerTouchEvents() {
        window.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.touchEndY = e.changedTouches[0].clientY;

            this.handleGesture();
        });
    }

    handleGesture() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Movimiento horizontal
            if (deltaX > 0) {
                this.moveTetrominoRight();
            } else {
                this.moveTetrominoLeft();
            }
        } else {
            // Movimiento vertical o rotación
            if (deltaY > 0) {
                this.moveTetrominoDown();
            } else {
                this.rotateTetrominoCW();
            }
        }
    }

    moveTetrominoRight() {
        console.log("Tetromino movido a la derecha");
        // Lógica para mover el tetromino hacia la derecha
    }

    moveTetrominoLeft() {
        console.log("Tetromino movido a la izquierda");
        // Lógica para mover el tetromino hacia la izquierda
    }

    moveTetrominoDown() {
        console.log("Tetromino movido hacia abajo");
        // Lógica para mover el tetromino hacia abajo
    }

    rotateTetrominoCW() {
        console.log("Tetromino rotado en sentido horario");
        // Lógica para rotar el tetromino en sentido horario
    }


    
    
}

