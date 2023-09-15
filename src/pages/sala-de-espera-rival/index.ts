import { state } from "../../state";

export async function initReadyPage(params) {
	const { gameState } = await state.getState();
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
        <div >
            <h2 class="main-title">Esperando a que </h2>
            <h1 class="main-title">${await gameState.opponentName}</h1>
            <h2 class="main-title">presione <br> Play!...</h2>
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
