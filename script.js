async function getPokemon() {
  const id = document.getElementById('pokemonId').value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (response.ok) {
    const data = await response.json();
    const speciesName = data.species.name;
    let genderText = 'Desconhecido';

    // Fetch gender data
    const gender1 = await fetch(`https://pokeapi.co/api/v2/gender/1`);
    const gender2 = await fetch(`https://pokeapi.co/api/v2/gender/2`);
    const gender3 = await fetch(`https://pokeapi.co/api/v2/gender/3`);

    const [data1, data2, data3] = await Promise.all([
      gender1.ok ? gender1.json() : null,
      gender2.ok ? gender2.json() : null,
      gender3.ok ? gender3.json() : null
    ]);

    const isFemale = data1?.pokemon_species_details.some(p => p.pokemon_species.name === speciesName);
    const isMale = data2?.pokemon_species_details.some(p => p.pokemon_species.name === speciesName);
    const isGenderless = data3?.pokemon_species_details.some(p => p.pokemon_species.name === speciesName);

    if (isMale && isFemale) {
      genderText = 'Macho e Fêmea';
    } else if (isMale) {
      genderText = 'Macho';
    } else if (isFemale) {
      genderText = 'Fêmea';
    } else if (isGenderless) {
      genderText = 'Sem Gênero';
    }

    // Carousel images
    let imagemHtml = '';
    if (data.sprites.front_default) {
      imagemHtml += `
      <div class="carousel-item active">
        <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.back_default) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.back_default}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.back_female) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.back_female}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.back_shiny) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.back_shiny}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.back_shiny_female) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.back_shiny_female}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.front_shiny) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.front_shiny}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.front_female) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.front_female}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.front_shiny_female) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.front_shiny_female}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }
    if (data.sprites.versions["generation-v"]['black-white'].animated.front_default) {
      imagemHtml += `
      <div class="carousel-item">
        <img src="${data.sprites.versions["generation-v"]['black-white'].animated.front_default}" alt="${data.name}" class="pokemon-img">
      </div>`;
    }

   
    document.getElementById('pokemonInfo').innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          ${imagemHtml}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Próximo</span>
        </button>
      </div>
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Gênero:</strong> ${genderText}</p>`;
  } else {
    document.getElementById('pokemonInfo').innerHTML = '<p>Pokémon não encontrado.</p>';
  }
}
