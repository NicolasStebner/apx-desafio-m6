export function initPageWelcome(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
		<title-el class="titulo" label="Piedra Papel ó Tijera"></title-el>
    	<button-el class="button newGame" label="Nuevo Juego"></button-el>
    	<button-el class="button ingresoASala" label="Ingresar a una sala"></button-el>
		<div class="contenedor-manos">
			<hand-el class="hand" hand="scissors"></hand-el>
			<hand-el class="hand" hand="rock"></hand-el>
			<hand-el class="hand" hand="paper"></hand-el>
		</div>
		`;
	var button = div.querySelector(".newGame");
	button?.addEventListener("click", () => {
		params.goTo("/nuevo-juego");
	});
	var buttonIngresoASala = div.querySelector(".ingresoASala");
	buttonIngresoASala?.addEventListener("click", () => {
		params.goTo("/input-code");
	});
	return div;
}
