export class ALCanvas {

    // Fields
    // general
    xOffset;
    yOffset;
    zoom;
    #active;

    // grid
    grid;
    cellSize;

    // private
    #jQuery;
    #canvas;
    #ctx;
    #pressed;

    constructor(jQuery, grid, penis = 10, active = true) {

        console.log("active passed " + active);
        this.#jQuery = jQuery;
        this.#canvas = jQuery[0];
        this.#ctx = this.#canvas.getContext("2d");

        this.xOffset = 0;
        this.yOffset = 0;
        this.zoom = 1;
        this.#pressed = false;

        // grid variables
        this.grid = grid;
        this.cellSize = 40;

        this.isActive = active;
    }

    resizeTo(width, height) {
        this.#canvas.width = width;
        this.#canvas.height = height;

        this.#redrawDefault();
    }

    clear() {
        console.log("clearing entire canvas!");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // getter and setter    
    get jQuery() { return this.#jQuery; }
    get canvas() { return this.#canvas; }
    get ctx() { return this.#ctx; }

    set grid(value) {
        this.grid = value;
        // do stuff
    }

    set isActive(value) {
        if (value) {
            this.#redrawDefault();
            if (this.#active) return;

            console.log("set canvas active");

            this.canvas.addEventListener("mousedown", this.#onMouseDown.bind(this));
            this.canvas.addEventListener("mouseup", this.#onMouseUp.bind(this));
            this.canvas.addEventListener("wheel", this.#onMouseWheel.bind(this));
            this.canvas.addEventListener("mousemove", this.#onMouseMove.bind(this));
            this.#active = true;
        }
        else {
            console.log("set canvas INactive");
            if (!this.#active) return;

            var self = this;
            /*             this.canvas.removeEventListener("mousedown", self.#onMouseDown);
                        this.canvas.removeEventListener("mouseup", self.#onMouseUp);
                        this.canvas.removeEventListener("wheel", self.#onMouseWheel);
                        this.canvas.removeEventListener("mousemove", self.#onMouseMove); */
            this.#active = false;
        }
    }

    get isActive() {
        return this.#active;
    }

    // private funcs
    #drawGrid() {

        console.log("drawing grid start!");
        this.clear();
        
        this.ctx.beginPath();
        
        var useXOffset = this.xOffset % this.cellSize;
        var useYOffset = this.yOffset % this.cellSize;
        
        for (var i = -this.cellSize; i <= this.canvas.width + this.cellSize; i += this.cellSize * this.zoom) {
            this.ctx.moveTo(useXOffset + i, 0);
            this.ctx.lineTo(useXOffset + i, this.canvas.height);
        }
        
        for (var i = -this.cellSize; i <= this.canvas.height + this.cellSize; i += this.cellSize * this.zoom) {
            this.ctx.moveTo(0, useYOffset + i);
            this.ctx.lineTo(this.canvas.width, useYOffset + i);
        }
        
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        console.log("drawing grid done!");
    }

    #redrawDefault() {
        if (!this.#active) return;
        if (this.grid) this.#drawGrid();
    }

    // event handlers
    #onMouseDown(event) {
        console.log("pressed = true");
        this.#pressed = true;
    }

    #onMouseUp(event) {
        console.log("pressed = false");
        this.#pressed = false;
    }

    #onMouseMove(event) {
        if (!this.#pressed) return;
        this.xOffset += event.movementX;
        this.yOffset += event.movementY;
        console.log("offset now " + this.xOffset + " " + this.yOffset);

        this.#redrawDefault();
    }

    #onMouseWheel(event) {
        var oldZoom = this.zoom;
        this.zoom -= event.deltaY / 1000;
        if (this.zoom < 0.25) this.zoom = 0.25;
        else if (this.zoom > 2.5) this.zoom = 2.5;
        console.log("zoom now " + this.zoom);

        this.#redrawDefault();
    }
}