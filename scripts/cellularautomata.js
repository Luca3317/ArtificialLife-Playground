var dimension; // Probably store as bool for 1/2 dim
var neighborhood; // moore & neumann
var radius; //
var states; // list
var rule; // table
// stochastic components? prolly not
// some default setups like forest fire

export class CellularAutomata {
    constructor(canvas, dimension = 1, neighborhood = "VonNeumann", radius = 1) {
        this.canvas = canvas;
        this.dimension = dimension;
        this.neighborhood = neighborhood;
        this.radius = radius;

        this.canvas.grid = true;
        this.canvas.setActive(true);
    }

    run() {

        this.html = this.#setupHTML(this);
    }

    quit() {
        this.html.forEach(element => element.remove());
    }

    #setupHTML(ca) {
        var element = document.createElement("p");
        document.getElementById("main-header").appendChild(element);
        var text = document.createTextNode("wtf is up my dude lets do a ca");
        element.appendChild(text);

        return new Set([element]);
    }
}