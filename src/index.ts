import { initRouter } from "./router";
import { init as buttonEl } from "./components/button-el";
import { init as titleEl } from "./components/texts-el/title";
import { init as subtitleEl } from "./components/texts-el/subtitle";
import { init as handEl } from "./components/hand-el";

function initComponents() {
	buttonEl();
	titleEl();
	subtitleEl();
	handEl();
}
(function () {
	initComponents();
	initRouter(document.querySelector(".root")!);
})();
