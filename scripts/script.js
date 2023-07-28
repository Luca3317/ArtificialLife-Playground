const resizer = document.querySelector("#resizer");
const sidebar = document.querySelector("#sidebar");

resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    $('html').css('cursor', 'col-resize');
    document.addEventListener("mousemove", resize, false);
    document.addEventListener("mouseup", () => {
        $('html').css('cursor', 'default');
        document.removeEventListener("mousemove", resize, false);
    }, false);
});

function resize(e) {
    const size = `${window.innerWidth - e.x}px`;
    sidebar.style.flexBasis = size;
    fitContainer(cc[0]);
    drawGrid(cc[0]);
}

/** 
 * Helpers 
 */

sidebar.style.flexBasis = '325px';
const mainContent = document.querySelector("#main-content");

function addContent() {
    const mainContentStr = [...Array(10).keys()].map(i => "Main Content");
    mainContent.innerHTML += mainContentStr.join(' ') + '<br /><br /><h1>Now drag to see how difficult it is, remove content to see how easy it is</h1>';
}

function removeContent() {
    mainContent.innerHTML = '';
}

document.querySelector("#add-content")
    .addEventListener('click', () => addContent())

document.querySelector("#remove-content")
    .addEventListener('click', () => removeContent())



const main = $("#main");
const cc = $("#main-canvas");
const ctx = cc[0].getContext("2d");
var xOffset = 0;
var yOffset = 0;
var cellSize = 40;
var zoom = 1;

fitContainer(cc[0]);
drawGrid(cc[0]);

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
}

function drawGrid(canvas) {
    ctx.beginPath();

    var useXOffset = xOffset % cellSize;
    var useYOffset = yOffset % cellSize;

    for (var i = -cellSize; i <= canvas.width + cellSize; i += cellSize * zoom) {
        ctx.moveTo(useXOffset + i, 0);
        ctx.lineTo(useXOffset + i, canvas.height);
    }

    for (var i = -cellSize; i <= canvas.height + cellSize; i += cellSize * zoom) {
        ctx.moveTo(0, useYOffset + i);
        ctx.lineTo(canvas.width, useYOffset + i);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
}

function clamp(value, min, max) {
    if (min > max) throw new Error("Min can not be larger than max");
    console.log("clamping " + value + " btween " + min + " and " + max);
    if (value > max) value = max;
    if (value < min) value = min;
    return value;
}