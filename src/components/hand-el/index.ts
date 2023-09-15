const hands = {
    rock: require("../../assets/piedra.png"),
    paper: require("../../assets/papel.png"),
    scissors: require("../../assets/tijera.png"),
};

export function init() {
    class HandComponent extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        connectedCallBack() {
            console.log("cb");
            this.render();
        }
        render() {
            var hand = this.getAttribute("hand") || "rock";
            var contexto = this.getAttribute("contexto") || "menu";
            var style = document.createElement("style");
            var div = document.createElement("div");

            style.textContent = `
                :host{
                display:block;
                }
                .menu{
                    width:57px;
                    height:127px;
                }
                .ingame{
                    width:70px;
                    height:190px;
                }
            `;
            var shadow = this.attachShadow({ mode: "open" });
            var imgEl = document.createElement("img");
            /*  */
            shadow.appendChild(style);
            imgEl.setAttribute("src", hands[hand]);
            /*  */
            imgEl.classList.add("onClick");
            /*  */
            imgEl.classList.add(contexto);
            div.appendChild(imgEl);
            //Agrego al shadow
            shadow.appendChild(div);
        }
    }
    customElements.define("hand-el", HandComponent);
}
