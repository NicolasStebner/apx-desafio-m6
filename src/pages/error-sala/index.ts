export function initErrorSala(params) {
	const div = document.createElement("div");
	div.classList.add("contenedor");
	div.innerHTML = `
    <title-el class="titulo" label="Piedra Papel ó Tijera"></title-el>
    <subtitle-el class="subtitulo label" label="Ups, esta sala está completa y tu nombre no coincide con nadie en la sala."></subtitle-el
    <div class="contenedor-manos">
      <hand-el class="hand" hand="scissors"></hand-el>
      <hand-el class="hand" hand="rock"></hand-el>
      <hand-el class="hand" hand="paper"></hand-el>
    </div>
  `;
	return div;
}
