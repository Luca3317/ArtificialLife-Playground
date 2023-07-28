import { ALCanvas } from "./ALCanvas.js";

// Cache all relevant jquery elements
const resizer = document.querySelector("#resizer");
const sidebar = document.querySelector("#sidebar");
const main = $("#main");
const mainCanvas = $("#main-canvas");

// Create ALCanvas object (helper object wrapping canvas)
var canvas = new ALCanvas(mainCanvas, true, undefined, true);

// Resize functionality
$(window).on("resize", resize);
resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    $('html').css('cursor', 'col-resize');
    document.addEventListener("mousemove", resize, false);
    document.addEventListener("mouseup", () => {
        $('html').css('cursor', 'default');
        document.removeEventListener("mousemove", resize, false);
    }, false);
});


// needed?
sidebar.style.flexBasis = '325px';

fitContainer(canvas);

function resize(e) {
    const size = `${window.innerWidth - e.x}px`;
    sidebar.style.flexBasis = size;
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