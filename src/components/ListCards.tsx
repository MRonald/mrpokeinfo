import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';

interface pokemonProps {
    name: string,
    url: string,
}

export default function ListCards() {
    const [pokemons, setPokemons] = useState([]);

    const URL = "https://pokeapi.co/api/v2/pokemon/?offset=64&limit=10";

    useEffect(() => {
        axios.get(URL).then(
            response => {
                setPokemons(response.data.results);
            }
        );
    }, []);

    return (
        <>
            {pokemons.map(
                (pokemon: pokemonProps) => <Card name={pokemon.name} url={pokemon.url} key={pokemon.name}/>
            )}
        </>
    );
}
