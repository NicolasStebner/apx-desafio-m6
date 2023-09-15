import { state } from "../../state";
/*  */
export async function initPageGame(params) {
	const { gameState } = await state.getState();
	var counter = 3;
	const intervalo = setInterval(async () => {
		var div = document.querySelector(".intervaloContador");
		div!.innerHTML = `${counter}`;
		if (counter < 1) {
			clearInterval(intervalo);
			params.goTo("/result");
		}
		counter--;
	}, 1000);
	/*  */
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
    <div class="intervaloContador"></div>
    <div class="contenedor-manos">
        <hand-el class="hand" contexto="ingame" hand="scissors"></hand-el>
        <hand-el class="hand" contexto="ingame" hand="rock"></hand-el>
        <hand-el class="hand" contexto="ingame" hand="paper"></hand-el>
    </div>
    `;
	/*  */
	const manosEl = div.querySelectorAll("hand-el");
	manosEl.forEach((mano) => {
		mano.addEventListener("click", async () => {
			await state.setGame(mano.getAttribute("hand") || "something");
			await state.getMovesFromRtdb();
			manosEl.forEach((manoInterna) => {
				if (mano == manoInterna) {
					manoInterna.classList.remove("inactive");
					manoInterna.classList.add("active");
				} else {
					manoInterna.classList.remove("active");
					manoInterna.classList.add("inactive");
				}
			});
		});
	});
	return div;
}
