import { state } from "../../state";

export async function initWaitingRoom(params) {
	const { gameState } = await state.getState();
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
        <div class="room-code">
            <subtitle-el label="Invita a tu amigo con este código"></subtitle-el>
	        <h1 class="centrado">${await gameState.publicId}</h1>
            <subtitle-el label="Que te diviertas!"></subtitle-el>
        </div>
        <div class="contenedor-manos">
            <hand-el class="hand" hand="scissors"></hand-el>
            <hand-el class="hand" hand="rock"></hand-el>
            <hand-el class="hand" hand="paper"></hand-el>
        </div>
    `;
	await state.checkForOpponent(params);
	return div;
}
