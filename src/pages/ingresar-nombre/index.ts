import { state } from "../../state";

export function initInputName(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
    <title-el class="titulo" label="Piedra Papel ó Tijera"></title-el>
    <subtitle-el class="subtitulo label" label="Tu Nombre"></subtitle-el>
    <input class="input"></input>
    <button-el class="button" label="Empezar"></button-el>
    <div class="contenedor-manos">
		<hand-el class="hand" hand="scissors"></hand-el>
		<hand-el class="hand" hand="rock"></hand-el>
		<hand-el class="hand" hand="paper"></hand-el>
    </div>
	`;
	var button = div.querySelector(".button");
	button?.addEventListener("click", async () => {
		const input = div.querySelector(".input")?.value;
		if (input == "") {
			return window.alert("Ingrese un nombre");
		}
		state.setName(input); //settear el nombre en el state
		await state.signIn();
		await state.askNewRoom();
		params.goTo("/waiting-room");
	});
	return div;
}
