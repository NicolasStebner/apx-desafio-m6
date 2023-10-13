import { state } from "../../state";

export async function initReadyPage(params) {
	const { gameState } = await state.getState();
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
        <div >
            <subtitle-el label="Esperando a que"></subtitle-el>
            <h1 class="centrado">${await gameState.opponentName}</h1>
            <subtitle-el label="presione Play!"></subtitle-el>
        </div>
        <div class="contenedor-manos">
            <hand-el class="hand" hand="scissors"></hand-el>
            <hand-el class="hand" hand="rock"></hand-el>
            <hand-el class="hand" hand="paper"></hand-el>
        </div>
    `;
	await state.checkIfBothAreReady(params);
	return div;
}
