async function getPokemon() {
  const id = document.getElementById('pokemonId').value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (response.ok) {
    const data = await response.json();
    const images = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny
    ]
    const carouselItems = images.map((img, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${img}" class="d-block w-100"  alt="${data.name}" style="width: 300px; height: 300px; object-fit: contain;">
    </div>
  `).join('');
    document.getElementById('pokemonInfo').innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
     ${carouselItems}
     </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  <span class="custom-icon">
  <img src="./img/previous.png" alt="Anterior" width="16" height="16"><span>
  <span class="visually-hidden">Previous</span>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
   <span class="custom-icon">
  <img src="./img/next.png" alt="Proxima" width="16" height="16"></span>
  <span class="visually-hidden">Previous</span>
</button>
  </button>
 
</button>
</div>
    <div class=" fs-6 d-flex justify-content-between mt-3 flex-wrap text-start">
  <p class="me-3"><strong>Altura:</strong> ${data.height / 10} m</p>
  <p class="me-3"><strong>Peso:</strong> ${data.weight / 10} kg</p>
  <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
</div>
    `;
    
  } else {
    document.getElementById('pokemonInfo').innerHTML = '<p>Pokémon não encontrado.</p>';
  }
}