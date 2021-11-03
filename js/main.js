const d = document,
  $main = d.querySelector("main"),
  $links = d.querySelector(".head__links");

let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url) {
  try {
    $main.innerHTML = `<img class="loader" src="../assets/rings.svg" alt="Cargando...">`;

    let res = await fetch(url),
      json = await res.json(),
      $template = "",
      $prevLink,
      $nextLink;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      const element = json.results[i];
      try {
        let res = await fetch(element.url),
          pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `
        <div class="pokemons__container">
        <div class="pokemons__inner" id="${pokemon.id}">
          <figure class="pokemons__card pokemons__card--front" id="${pokemon.id}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemons__image" id="${pokemon.id}">
            <figcaption class="pokemons__name" id="${pokemon.id}">${pokemon.name}</figcaption>
          </figure>
          <figure class="pokemons__card pokemons__card--back" id="${pokemon.id}">
          <h3 id="${pokemon.id}">STATS</h3>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[0].stat.name}:</span> ${pokemon.stats[0].base_stat}</p>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[1].stat.name}:</span> ${pokemon.stats[1].base_stat}</p>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[2].stat.name}:</span> ${pokemon.stats[2].base_stat}</p>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[3].stat.name}:</span> ${pokemon.stats[3].base_stat}</p>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[4].stat.name}:</span> ${pokemon.stats[4].base_stat}</p>
            <p class="pokemons__stats" id="${pokemon.id}"><span id="${pokemon.id}">${pokemon.stats[5].stat.name}:</span> ${pokemon.stats[5].base_stat}</p>
          </figure>
          
          </div>
          </div>
          `;
      } catch (err) {
        let message = err.statusText || "Ocurrió un Error";
        console.error(`Error ${err.status}: ${message}`);
        $template += `
          <figure>
            <figcaption>Error ${err.status}: ${message}</figcaption>
          </figure>
          `;
      }
    }

    $main.innerHTML = $template;
    $prevLink = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";
    $links.innerHTML = $prevLink + " " + $nextLink;
  } catch (err) {
    let message = err.statusText || "Ocurrió un Error";
    console.error(`Error ${err.status}: ${message}`);
    $main.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
  }
}

d.addEventListener("DOMContentLoaded", (e) => {
  loadPokemons(pokeAPI);
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".head__links a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
  if (
    e.target.matches(".pokemons__inner") ||
    e.target.matches(".pokemons__inner *")
  ) {
    let $card = d.querySelectorAll(".pokemons__inner");

    $card.forEach((el) =>
      el.id === e.target.id ? el.classList.toggle("is-flipped") : el
    );
  }
});
