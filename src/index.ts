import { initRouter } from "./router";
import { init as buttonEl } from "./components/button-el";
import { init as titleEl } from "./components/texts-el/title";
import { init as subtitleEl } from "./components/texts-el/subtitle";
import { init as handEl } from "./components/hand-el";
const imageURL = require("./assets/fondo.png");

function initComponents() {
	buttonEl();
	titleEl();
	subtitleEl();
	handEl();
}
(function () {
	document.querySelector(".root")!.style.backgroundImage = `url(${imageURL})`;
	initComponents();
	initRouter(document.querySelector(".root")!);
})();
