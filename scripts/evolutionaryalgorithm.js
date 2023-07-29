
export class EvolutionaryAlgorithm {

    start(container) {

        this.#setupHTML(container);


    }

    quit() {

    }

    etf(tex) {
        return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
    }

    #setupHTML(container) {

        console.log("adding html");


        var title = $("<div>", { id: "ea:sidebar-title" });
        title.append("Evolutionary Algorithm");

        var content = $("<div>", { id: "ea:sidebar-content" });
        content.append("content");

        var t = $("<p>");
        t.append("Sief");
        var t2 = $("<p>");
        t2.append("Sief");
        var t3 = $("<p>");
        t3.append("Sief");
        var t4 = $("<p>");
        t4.append("Sief");
        var t5 = $("<p>");
        t5.append("Sief");
        var collap = this.#createCollapsible("Fitness evaluation function", this.#fitnessEvaluationHTML());
        var collap2 = this.#createCollapsible("Parent selection mechanism", t2);
        var collap3 = this.#createCollapsible("Mutation mechanism", t3);
        var collap4 = this.#createCollapsible("Inheritance mechanism", t4);
        var collap5 = this.#createCollapsible("External selection mechanism", t5);

        container.append(title);
        container.append(content);
        container.append(collap);
        container.append(collap2);
        container.append(collap3);
        container.append(collap4);
        container.append(collap5);

        var expression = document.getElementById('expression'),
            result = $("#result");

        expression.addEventListener('change', function (e) {
            result.empty();
            result.append(this.etf(math.parse(e.target.value).toTex()));
        }.bind(this), false);

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }

    #fitnessEvaluationHTML() {

        var div = $("<div>");

        var p = $("<p>");
        p.append("Define the function that will be used to evaluate an individuals fitness. Each variable will correspond to one entry in the genome.");

        var inputfield = $("<input>", { id: "expression", type: "text" });
        var result = $("<div>", { id: "result" });

        div.append(p);
        div.append(inputfield);
        div.append(result);

        return div;
    }

    // move to helper
    #createCollapsible(title, content) {

        var collapsible = $("<div>");

        var container = $("<div>", { class: "content" });
        container.append(content);

        var foldout = $("<button>", { type: "button", class: "collapsible" });
        foldout.append(title);

        collapsible.append(foldout);
        collapsible.append(container);

        return collapsible;
    }
}