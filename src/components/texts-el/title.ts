export function init() {
    class Title extends HTMLElement {
        constructor() {
            super();
            this.refactor();
        }
        refactor() {
            var textoDeEntrada = this.getAttribute("label");
            var style = document.createElement("style");
            style.textContent = `
            :host{
                display:block;
            }
            .title{
                font-size: 80px;
                font-weight: 700;
                color: #009048;
                max-width:284px;
                text-align:center;
            }
            `;
            //margin-bottom:74px;
            var shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);

            var div = document.createElement("div");
            div.classList.add("title");
            div.textContent = textoDeEntrada;

            shadow.appendChild(div);
        }
    }
    customElements.define("title-el", Title);
}
