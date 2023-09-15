export function init() {
    class Button extends HTMLElement {
        constructor() {
            super();
            this.refactor();
        }
        refactor() {
            const textoDeEntrada = this.getAttribute("label");
            var style = document.createElement("style");
            style.textContent = `
            :host{
                display:block;
            }
            .boton{
                border: solid 10px #001997;
                border-radius: 10px;
                background-color:#006CFC;
                padding: 9px 0;
                text-align:center;
                color:white;
                font-size:45px;
            }
            `;
            var shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);

            var div = document.createElement("div");
            div.classList.add("boton");
            div.textContent = textoDeEntrada;

            shadow.appendChild(div);
        }
    }
    customElements.define("button-el", Button);
}
