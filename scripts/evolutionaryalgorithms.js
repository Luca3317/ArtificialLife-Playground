// inheritance
// mutation
// fitness eval
// external selection
// finish cond
// parent selection

export class EvolutionaryAlgorithm {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.grid = false;
    }

    run() {
        this.html = this.#setupHTML(this);
    }

    quit() {
        this.html.forEach(element => element.remove());
    }

    #setupHTML(ea) {
        var element = document.createElement("p");
        document.getElementById("main-header").appendChild(element);
        var text = document.createTextNode("lezz do a ea");
        element.appendChild(text);
    
        var elements = new Set([element]);
        return elements;
    }
}