import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  // State declarations
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [error, setError] = useState(false);

  // Function to search for a Pokémon
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        setError(false); // Reset error state on successful fetch
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle the case where the Pokémon doesn't exist
          setPokemonChosen(false);
          setError(true);
        } else {
          // Handle other errors (e.g., network issues)
          console.error("Error fetching Pokémon data:", error.message);
        }
      });
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  };

  // JSX structure
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>My Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <button onClick={searchPokemon}>Search Pokémon</button>
      </div>
      <div className="DisplaySection">
        {(!pokemonChosen && !error) ? (
          <h1>Please choose a Pokémon</h1>
        ) : error ? (
          <h1>This Pokémon doesn't exist, try again</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <br/>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
