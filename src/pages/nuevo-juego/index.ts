import { state } from "../../state";

export async function initInputCode(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
        <title-el class="titulo" label="Piedra Papel ó Tijera"></title-el>
        <input class="input" placeholder="Nombre"></input>
        <input class="input codigo" placeholder="Código"></input>
        <button-el class="button" label="Ingresar a la sala"></button-el>
        <div class="contenedor-manos">
            <hand-el class="hand" hand="scissors"></hand-el>
            <hand-el class="hand" hand="rock"></hand-el>
            <hand-el class="hand" hand="paper"></hand-el>
        </div>
    `;
	var button = div.querySelector(".button");

	button?.addEventListener("click", async () => {
		const name = div.querySelector(".input");
		const roomId = div.querySelector(".codigo");

		if (name?.value == "") {
			return window.alert("Please enter your name");
		}
		if (roomId?.value == "") {
			return window.alert("Please enter the room ID");
		}

		state.setName(name?.value.toString());
		await state.signIn();
		await state.getExistingRoomId(roomId?.value.toString());
		await state.joinRoom();

		params.goTo("/instructions");
	});
	return div;
}
