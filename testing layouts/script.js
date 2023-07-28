const resizer = document.querySelector("#resizer");
const sidebar = document.querySelector("#sidebar");

resizer.addEventListener("mousedown", (event) => {
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
    drawCircle(cc[0]);
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
console.log(main);
console.log(cc);
const ctx = cc[0].getContext("2d");
fitContainer(cc[0]);
drawCircle(cc[0]);

function fitContainer(canvas) {

    var l = main.width() - parseFloat($("#main-canvas").css("marginLeft")) - parseFloat($("#main-canvas").css("marginRight"));
    console.log(l);

    // Make it visually fill the positioned parent
    canvas.width = main.width() - parseFloat(cc.css("marginLeft")) - parseFloat(cc.css("marginRight"));
    canvas.height = main.height() - parseFloat(cc.css("marginTop")) - parseFloat(cc.css("marginBottom"));
}


function drawCircle(canvas) {
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
}