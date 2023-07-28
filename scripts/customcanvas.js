

// todo
// likely make grid its own class
export class CustomCanvas {

    constructor(canvas, grid, active = true) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.xOffset = 0;
        this.yOffset = 0;
        this.zoom = 1;
        this.pressed = false;
        
        // grid variables
        this.grid = grid;
        this.cellSize = 40;
        
        this.active = false;
        if (active) this.#setActive();
    }

    resetPosition() {
        this.xOffset = 0;
        this.yOffset = 0;
    }

    setActive(active) {
        if (active) this.#setActive();
        else this.#setInactive();
    }

    drawGrid() {

        console.log("drawing grid!");

    

        this.ctx.beginPath();

        var useXOffset = this.xOffset % this.cellSize;
        var useYOffset = this.yOffset % this.cellSize;

        for (var i = -this.cellSize; i <= this.canvas.width + this.cellSize; i += this.cellSize * this.zoom)
        {
            this.ctx.moveTo(useXOffset + i, 0);
            this.ctx.lineTo(useXOffset + i, this.canvas.height);
        }
    
        for (var i = -this.cellSize; i <= this.canvas.height + this.cellSize; i += this.cellSize * this.zoom)
        {
            this.ctx.moveTo(0, useYOffset + i);
            this.ctx.lineTo(this.canvas.width, useYOffset + i);
        }
    
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }

    clear() {
        console.log("clearing entire canvas!");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    #testtt(event) {
        if (!this.pressed) return;
        this.xOffset += event.movementX;
        this.yOffset += event.movementY;
    
        this.clear();
        this.drawGrid();
    }

    // Setters and Getters
    set grid(grid) {
        console.log("imma grid (" + this.grid + ", " + grid + ")");
        if (this.grid == grid) return;
        console.log("didnt leave early");
        if (grid)
            this.drawGrid();
        else
            this.clear();
    }

    // Private methods
    #setActive() {

        if (this.grid) this.drawGrid();
        if (this.active) return;

        console.log("set canvas active");
        
        this.canvas.addEventListener("mousedown", this.#onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.#onMouseUp.bind(this));
        this.canvas.addEventListener("wheel", this.#onMouseWheel.bind(this));
        this.canvas.addEventListener("mousemove", this.#testtt.bind(this));
        this.active = true;
    }

    #setInactive(event) {

        if (!this.active) return;

        console.log("set canvas INactive");
        var self = this;
        this.canvas.removeEventListener("mousedown", self.#onMouseDown);
        this.canvas.removeEventListener("mouseup", self.#onMouseUp);
        this.canvas.removeEventListener("wheel", self.#onMouseWheel);
        this.canvas.removeEventListener("mousemove", self.#onMouseMove);
    }

    #onMouseDown(event) {
        console.log("pressed = true");
        this.pressed = true;
    }

    #onMouseUp(event) {
        console.log("pressed = false");
        this.pressed = false;
    }

    #onMouseMove(event) {
        if (!this.pressed) return;
        this.xOffset += event.movementX;
        this.yOffset += event.movementY;
    
        test();
        drawGrid();
    }

    #onMouseWheel(event) {        
        var oldZoom = this.zoom;
        this.zoom -= event.deltaY / 1000;
        if (this.zoom < 0.25) this.zoom = 0.25;
        else if (this.zoom > 2.5) this.zoom = 2.5;
    
        if (oldZoom != this.zoom)
        {
            this.clear();
            this.drawGrid();
        }    
    }
}