import { ALCanvas } from "./ALCanvas.js";
import { CellularAutomaton } from "./cellularautomata.js";
import { EvolutionaryAlgorithm } from "./evolutionaryalgorithm.js";
import { GameOfLife } from "./gameoflife.js";

// Cache all relevant jquery elements
const resizer = $("#resizer");
const sidebar = $("#sidebar");
const main = $("#main");
const mainCanvas = $("#main-canvas");
const appselector = $("#app-selector");

// Create ALCanvas object (helper object wrapping canvas)
var canvas = new ALCanvas(mainCanvas, true, undefined, true);

// Resize functionality
$(window).on("resize", resize);
resizer[0].addEventListener("mousedown", (event) => {
    event.preventDefault();
    $('html').css('cursor', 'col-resize');
    document.addEventListener("mousemove", resize, false);
    document.addEventListener("mouseup", () => {
        $('html').css('cursor', 'default');
        document.removeEventListener("mousemove", resize, false);
    }, false);
});


// Listen to app-selector and update accordingly
var app = null;
appselector[0].addEventListener("change", (event) => {

    if (app != null) app.quit();

    switch (event.target.value) {
        case "EA": app = new EvolutionaryAlgorithm(); break;
        case "CA": app = new CellularAutomaton(); break;
        case "GOL": app = new GameOfLife(); break;
        default: alert("Invalid value"); break;
    }

    app.start(sidebar);
});

// needed?
sidebar[0].style.flexBasis = '325px';

fitContainer(canvas);

function resize(e) {
    const size = `${window.innerWidth - e.x}px`;
    sidebar[0].style.flexBasis = size;
    fitContainer(canvas);
}

function fitContainer(canvas) {

    var height = clamp(main.height(), 0, window.innerHeight - $("header").height());
    // TODO Likely some width equivalent for this too - at least right margin / width gets weird when zooming out / in
    canvas.resizeTo(main.width() - parseFloat(canvas.jQuery.css("marginLeft")) - parseFloat(canvas.jQuery.css("marginRight")), height - parseFloat(canvas.jQuery.css("marginTop")) - parseFloat(canvas.jQuery.css("marginBottom")));
}

function clamp(value, min, max) {
    if (min > max) throw new Error("Min can not be larger than max");
    console.log("clamping " + value + " btween " + min + " and " + max);
    if (value > max) value = max;
    if (value < min) value = min;
    return value;
}