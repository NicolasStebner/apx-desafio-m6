import { state } from "../../state";

export async function initWaitingRoom(params) {
	const { gameState } = await state.getState();
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
        <div class="room-code">
            <h2>Invita a tu amigo con este código</h2>
	        <h1>${await gameState.publicId}</h1>
            <h2>Que te diviertas!</h2>
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
