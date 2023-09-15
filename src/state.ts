import { API_BASE_URL, getDatabase, ref, onValue, app } from "../src/db";

type Play = "paper" | "rock" | "scissors" | string;

const state = {
	data: {
		gameState: {
			currentPage: null,
			name: "",
			play: null,
			usrId: "",
			online: false,
			ready: false,
			owner: true,
			publicId: "",
			privateId: "",
			opponentName: "",
			opponentPlay: null,
			lastGameOwnerResult: null,
			lastGameGuestResult: null,
		},
		gameReady: false,
		playersReady: false,
		scoreboard: {
			owner: 0,
			guest: 0,
		},
	},
	async getState() {
		return this.data;
	},
	async setName(name: string) {
		const { gameState } = await this.getState();
		gameState.name = name;
	},
	async setSessionStatus(online: boolean) {
		const { gameState } = await this.getState();
		if (online === true) return (gameState.online = online);
		if (online === false) return (gameState.online = online);
	},
	async signIn() {
		const data = await this.getState();
		await this.setSessionStatus(true);

		const rawUser = await fetch(`${API_BASE_URL}/auth`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const userId = await rawUser.json(); //id puro
		const usrId = await userId.usrId;
		await this.setUserId(usrId);
	},
	async setUserId(usrId: string) {
		const { gameState } = await this.getState();
		gameState.usrId = usrId;
	},
	async askNewRoom() {
		const { gameState } = await this.getState();

		const rawPublicRoomId = await fetch(`${API_BASE_URL}/rooms`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ gameState }),
		});

		const pId = await rawPublicRoomId.json();
		const { roomId, privateRoomId } = await pId;

		await this.setPublicId(roomId);
		await this.setPrivateId(privateRoomId);
	},
	async setPublicId(publicId: string) {
		const { gameState } = await this.getState();
		gameState.publicId = publicId;
	},

	async setPrivateId(privateId: string) {
		const { gameState } = await this.getState();
		gameState.privateId = privateId;
	},
	// obtiene el id de la rtdb y lo guarda en el state

	async getExistingRoomId(roomId: string) {
		const { gameState } = await this.getState();
		await this.setPublicId(roomId);
		const rawPrivateRoomId = await fetch(`${API_BASE_URL}/room/${roomId}`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ gameState }),
		});
		const privateRoomIdParse = await rawPrivateRoomId.json();
		const privateId = await privateRoomIdParse.privateId;
		await this.setPrivateId(privateId);
	},

	//crea la data del guest en la rtdb

	async joinRoom() {
		const { gameState } = await this.getState();
		gameState.owner = false;
		gameState.gameReady = true;
		fetch(`${API_BASE_URL}/room/${gameState.publicId}/join`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ gameState }),
		});
		await this.checkForOpponent();
	},
	// chechea que los 2 usuarios esten online y listos para pasar
	// a las instrucciones && obtengo el nombre del oponente
	// desde el cliente del OWNER

	async checkForOpponent(params) {
		const { gameState } = await this.getState();
		const db = getDatabase();
		const roomRef = ref(db, `rooms/${gameState.privateId}`);

		onValue(roomRef, (snapshot) => {
			const data = snapshot.val();
			if (Object.keys(data).length === 2) {
				this.setGameReadyStatus(true, params);
				if (gameState.name === data.owner.name) {
					gameState.opponentName = data.guest.name;
				}
				if (gameState.name === data.guest.name) {
					gameState.opponentName = data.owner.name;
				}
			}
		});
	},

	async setGameReadyStatus(online: boolean, params) {
		let data = await this.getState();

		if (online === true) {
			data.gameReady = online;
			if (location.pathname !== "/waiting-room") return;
			if (location.pathname === "/waiting-room") {
				params.goTo("/instructions");
			}
		}
		if (online === false) return (data.gameReady = online);
	},

	// setea el estado de "ready" cuando los users presionan play

	async setPlayerReadyStatus(status: boolean) {
		const { gameState } = await this.getState();
		gameState.ready = status;
		fetch(`${API_BASE_URL}/room/${gameState.publicId}/play`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ gameState }),
		});
	},

	// checkea que los 2 usuarios tengan el estado de "ready" para pasar a
	// la pantalla de seleccion && setea el nombre del oponente desde el
	// cliente del GUEST

	async checkIfBothAreReady(params) {
		const { gameState } = await this.getState();

		const db = getDatabase(app);
		const roomRef = ref(db, `rooms/${await gameState.privateId}`);

		onValue(roomRef, (snapshot) => {
			const data = snapshot.val();
			//temporal
			if (data.owner.ready == false && data.guest.ready == false) {
				return;
			}

			if (data.owner.ready == false && data.guest.ready == true) {
				return this.waitingForOpponent(data.owner.name, false, params);
			}
			if (data.owner.ready == true && data.guest.ready == false) {
				return this.waitingForOpponent(data.guest.name, false, params);
			}
			if (data.owner.ready == true && data.guest.ready == true) {
				return this.waitingForOpponent("ready", true, params);
			}
			if (Object.keys(data).length === 2) {
				if (gameState.name === data.owner.name) {
					gameState.opponentName = data.guest.name;
				}
				if (gameState.name === data.guest.name) {
					gameState.opponentName = data.owner.name;
				}
			}
			//temporal
		});
	},

	async waitingForOpponent(name: string, bothReady: boolean, params) {
		let startGame = await this.getState();
		if (bothReady === true) {
			startGame.playersReady = bothReady;
			if (location.pathname !== "/waiting-the-opponent") return;
			if (location.pathname === "/waiting-the-opponent") {
				params.goTo("/game");
			}
		} else if (bothReady === false) {
			startGame.gameState.opponentName = name;
		}
	},

	// Guardo la jugada del jugador y la manda a la rtdb
	async setGame(playerPlay: Play) {
		const { gameState } = await this.getState();
		gameState.play = playerPlay;
		fetch(`${API_BASE_URL}/room/${gameState.publicId}/play`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ gameState }),
		});
	},

	// obtiene los movimientos de la rtdb

	async getMovesFromRtdb() {
		const { gameState } = await this.getState();

		const db = getDatabase(app);
		const roomRef = ref(db, `rooms/${await gameState.privateId}`);

		onValue(roomRef, (snapshot) => {
			const data = snapshot.val();
			if (data.owner.play != null && data.guest.play != null) {
				return this.setMoves(data.owner.play, data.guest.play);
			}
		});
	},

	// setea los moves del OWNER y GUEST en los respectivos states de los clientes

	async setMoves(ownerPlay: string, guestPlay: string) {
		const { gameState } = await this.getState();
		if (gameState.owner) {
			return (gameState.opponentPlay = guestPlay);
		}
		if (gameState.owner == false) {
			return (gameState.opponentPlay = ownerPlay);
		}
	},

	// declara la logica para determinar quien gano desde la
	// perspectiva del OWNER y retorna ese resultado asi puede ser
	// mostrado en el component
	async whoWins(ownerPlay: string, guestPlay: string) {
		const ownerWinningOutcomes = [
			{ ownerPlay: "rock", guestPlay: "scissors" },
			{ ownerPlay: "scissors", guestPlay: "paper" },
			{ ownerPlay: "paper", guestPlay: "rock" },
		];
		let ownerResult = "PERDISTE";

		for (const o of ownerWinningOutcomes) {
			if (o.ownerPlay == ownerPlay && o.guestPlay == guestPlay) {
				ownerResult = "GANASTE";
			} else if (ownerPlay == guestPlay) {
				ownerResult = "EMPATE";
			}
		}
		let guestResult = "";

		if (ownerResult == "PERDISTE") {
			guestResult = "GANASTE";
		} else if (ownerResult == "GANASTE") {
			guestResult = "PERDISTE";
		} else if (ownerResult == "EMPATE") {
			guestResult = "EMPATE";
		}

		await this.setWinner(ownerResult, guestResult);
	},

	// setea en el state quien gano desde la perspectiva del OWNER

	async setWinner(resultOfOwner: string, resultOfGuest: string) {
		const data = await this.getState();
		if (resultOfOwner == "EMPATE") {
			data.gameState.lastGameOwnerResult = resultOfOwner;
			data.gameState.lastGameGuestResult = resultOfGuest;
			return;
		}
		if (resultOfOwner == "GANASTE") {
			data.scoreboard.owner += 1;
			data.gameState.lastGameOwnerResult = resultOfOwner;
			data.gameState.lastGameGuestResult = resultOfGuest;
			return await this.saveHistory(data.scoreboard);
		}
		if (resultOfOwner == "PERDISTE") {
			data.scoreboard.guest += 1;
			data.gameState.lastGameOwnerResult = resultOfOwner;
			data.gameState.lastGameGuestResult = resultOfGuest;
			return await this.saveHistory(data.scoreboard);
		}
	},

	// setea los resultados en el state, localStorage y FireStore

	async saveHistory(history) {
		const data = await this.getState();
		data.scoreboard = history;
		localStorage.setItem("scoreBoard", JSON.stringify(this.data.scoreboard));
		fetch(`${API_BASE_URL}/history/save/${data.gameState.publicId}`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data.scoreboard),
		});
	},
};

export { state };
