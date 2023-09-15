import { initPageWelcome } from "./pages/welcome";
import { initInputName } from "./pages/ingresar-nombre";
import { initInputCode } from "./pages/nuevo-juego";
import { initPageInstructions } from "./pages/intructions";
import { initPageGame } from "./pages/game";
import { initPageResult } from "./pages/result";
import { initErrorSala } from "./pages/error-sala";
import { initWaitingRoom } from "./pages/sala-de-espera";
import { initReadyPage } from "./pages/sala-de-espera-rival";

const routes = [
	{
		path: /\/welcome/,
		component: initPageWelcome,
	},
	{
		path: /\/nuevo-juego/,
		component: initInputName,
	},
	{
		path: /\/input-code/,
		component: initInputCode,
	},
	{
		path: /\/waiting-room/,
		component: initWaitingRoom,
	},
	{
		path: /\/error-sala/,
		component: initErrorSala,
	},
	{
		path: /\/instructions/,
		component: initPageInstructions,
	},
	{
		path: /\/waiting-the-opponent/,
		component: initReadyPage,
	},
	{
		path: /\/game/,
		component: initPageGame,
	},
	{
		path: /\/result/,
		component: initPageResult,
	},
];

export function initRouter(container: Element) {
	function goTo(path) {
		history.pushState({}, "", path);
		handleRoute(path);
	}
	async function handleRoute(route) {
		for (const r of routes) {
			if (r.path.test(route)) {
				const el = await r.component({ goTo: goTo });
				if (container.firstChild) {
					container.firstChild?.remove();
				}
				container.appendChild(el);
			}
		}
	}
	if (location.pathname == "/") {
		goTo("/welcome");
	} else {
		handleRoute(location.pathname);
	}
	window.onpopstate = () => {
		handleRoute(location.pathname);
	};
}
