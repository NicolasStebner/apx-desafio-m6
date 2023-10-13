import { state } from "../../state";
/*  */
export async function initPageResult(params) {
	/*  */
	var contador = 2;
	const intervalo = setInterval(async () => {
		var contenedorManoUser = div.querySelector(".base");
		contenedorManoUser!.style.transform = "translateY(-50px)";
		contenedorManoUser!.style.transform = "rotate(360deg);";
		contenedorManoUser!.style.transition = "all 1s ease-in-out";
		var contenedorManoOpponent = div.querySelector(".cont-inverted");
		contenedorManoOpponent!.style.transform = "translateY(50px)";
		contenedorManoOpponent!.style.transform = "rotate(360deg);";
		contenedorManoOpponent!.style.transition = "all 1s ease-in-out";
		if (contador < 1) {
			clearInterval(intervalo);
			const button = div.querySelector(".button");
			button?.addEventListener("click", () => {
				params.goTo("/instructions");
			});
			var contenedorResultado = div.querySelector(".contenedor-resultado");
			modificarColorDeFondoContenedorResultado(contenedorResultado);
			await state.setPlayerReadyStatus(false);
			contador--;
		}
		contador--;
	}, 1000);
	/*  */
	const div = document.createElement("div");
	div.classList.add("contenedor");
	const data = await state.getState();
	const gameState = data.gameState;
	const scoreboard = data.scoreboard;
	if (gameState.owner == true) {
		await state.whoWins(gameState.play, gameState.opponentPlay);
		div.innerHTML = `
		<div class="cont-inverted">
			<div class="contenedor-manos inverted">
				<hand-el class="hand" contexto="ingame" hand="${gameState.opponentPlay}"></hand-el>
			</div>
		</div>
		
		<div class="contenedor-manos base">
			<hand-el class="hand" contexto="ingame" hand="${gameState.play}"></hand-el>
		</div>
		<div class="contenedor-resultado">
			<div class="resultado-posta">
				<h1>${gameState.lastGameOwnerResult}</h1>
			</div>
			<div class="resultado-score">
				<h2 class="resultado-score-text">Score</h2>
				<p>Vos: ${scoreboard.owner}</p>
				<p>Rival: ${scoreboard.guest}</p>
			</div>
			<div class="button-volver-a-jugar">
			<button-el class="button" label="Volver a jugar"></button-el>
			</div>
		</div>
		`;
		return div;
	}
	if (gameState.owner == false) {
		await state.whoWins(gameState.opponentPlay, gameState.play);
		div.innerHTML = `
		<div class="cont-inverted">
			<div class="contenedor-manos inverted">
				<hand-el class="hand" contexto="ingame" hand="${gameState.opponentPlay}"></hand-el>
			</div>
		</div>
		<div class="contenedor-manos base">
			<hand-el class="hand" contexto="ingame" hand="${gameState.play}"></hand-el>
		</div>
		<div class="contenedor-resultado">
			<div class="resultado-posta">
				<h1>${gameState.lastGameGuestResult}</h1>
			</div>
			<div class="resultado-score">
				<h2 class="resultado-score-text">Score</h2>
				<p>Vos: ${scoreboard.guest}</p>
				<p>Rival: ${scoreboard.owner}</p>
			</div>
			<div class="button-volver-a-jugar">
				<button-el class="button" label="Volver a jugar"></button-el>
			</div>
		</div>
		`;
		return div;
	}
	/*  */
}

async function modificarColorDeFondoContenedorResultado(contenedorResultado) {
	const { gameState } = await state.getState();
	if (gameState.owner == true) {
		if (gameState.lastGameOwnerResult == "PERDISTE") {
			contenedorResultado.style.background = "rgba(137, 73, 73, 0.9)";
		} else if (gameState.lastGameOwnerResult == "EMPATE") {
			contenedorResultado.style.background = "rgba(187, 187, 62,0.9)";
		} else {
			contenedorResultado.style.background = "rgba(128, 231, 48, 0.9)";
		}
	}
	if (gameState.owner == false) {
		if (gameState.lastGameGuestResult == "PERDISTE") {
			contenedorResultado.style.background = "rgba(137, 73, 73, 0.9)";
		} else if (gameState.lastGameGuestResult == "EMPATE") {
			contenedorResultado.style.background = "rgba(187, 187, 62,0.9)";
		} else {
			contenedorResultado.style.background = "rgba(128, 231, 48, 0.9)";
		}
	}
	contenedorResultado!.style.display = "flex";
}
