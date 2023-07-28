<<<<<<< Updated upstream
=======
import { ALCanvas } from "./ALCanvas.js";


const resizer = document.querySelector("#resizer");
const sidebar = document.querySelector("#sidebar");
>>>>>>> Stashed changes

import { CellularAutomata } from "./cellularautomata.js";
import { EvolutionaryAlgorithm } from "./evolutionaryalgorithms.js";
import { CustomCanvas } from "./customcanvas.js";

var application;

<<<<<<< Updated upstream
function listQ() {
    if (application != null) application.quit();
    switch (this.value) {
        case "ea": console.log("EA"); application = new EvolutionaryAlgorithm(canvas); application.run(); break;
        case "ca": console.log("CA"); application = new CellularAutomata(canvas); application.run(); break;
        case "bv": console.log("BV"); break;
        case "gol": console.log("GOL"); break;
        default: console.log("Invalid value!");
    }
=======


var alc = new ALCanvas(cc, true);

alc.active = true;

$(window).on("resize", resize);

// TODO (LIKELY DONE)
// resizing can fuck up sometimes (might fix itself by adding on window resize resizing)
// happens when zooming out (=> canvas gets longer) and going back to more normal zoom (=> container is higher because of
// canvas overflow => canvas wont get set to smaller)
function fitContainer(canvas) {

    var l = main.width() - parseFloat($("#main-canvas").css("marginLeft")) - parseFloat($("#main-canvas").css("marginRight"));
    console.log(l);

    var height = clamp(main.height(), 0, window.innerHeight - $("header").height());
    // TODO Likely some width equivalent for this too - at least right margin / width gets weird when zooming out / in

    // Make it visually fill the positioned parent
    canvas.width = main.width() - parseFloat(cc.css("marginLeft")) - parseFloat(cc.css("marginRight"));
    canvas.height = height - parseFloat(cc.css("marginTop")) - parseFloat(cc.css("marginBottom"));
}


function drawCircle(canvas) {
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
>>>>>>> Stashed changes
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
