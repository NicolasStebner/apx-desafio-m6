export function init() {
    class SubTitle extends HTMLElement {
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
                width:100%;
                margin:0;
            }
            .sub-title{
                margin:0 auto;
                font-size: 40px;
                font-weight: 500;
                text-align:center;
            }
            `;
            //Creo el shadow y aplico la hoja de estilos
            var shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);
            //Creamos el div y modifico/agrego nombre de la clase
            var div = document.createElement("div");
            div.classList.add("sub-title");
            div.textContent = textoDeEntrada;
            //Agrego al shadow
            shadow.appendChild(div);
        }
    }
    customElements.define("subtitle-el", SubTitle);
}
