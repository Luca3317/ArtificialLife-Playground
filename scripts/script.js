
import { CellularAutomata } from "./cellularautomata.js";
import { EvolutionaryAlgorithm } from "./evolutionaryalgorithms.js";
import { CustomCanvas } from "./customcanvas.js";

var application;

function listQ() {
    if (application != null) application.quit();
    switch (this.value) {
        case "ea": console.log("EA"); application = new EvolutionaryAlgorithm(canvas); application.run(); break;
        case "ca": console.log("CA"); application = new CellularAutomata(canvas); application.run(); break;
        case "bv": console.log("BV"); break;
        case "gol": console.log("GOL"); break;
        default: console.log("Invalid value!");
    }
}
document.getElementById("main-application-selector").onchange = listQ;


// set up canvas
var canvas = document.querySelector('#main-canvas');
console.log("canvas size " + canvas.width + " " + canvas.height);

var parent = canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);
    console.log("margin is " + styles.marginTop + " " + styles.marginRight + " " + styles.marginBottom + " " + styles.marginLeft);
    console.log("padding is " + styles.paddingTop + " " + styles.paddingRight + " " + styles.paddingBottom + " " + styles.paddingLeft);
canvas.width = w;
canvas.height = h;

console.log("canvas size " + canvas.width + " " + canvas.height);

canvas = new CustomCanvas(canvas, false, false);
