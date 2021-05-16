import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from './Card';
import ArrowRight from '../assets/imgs/arrow-right.png';
import ArrowLeft from '../assets/imgs/arrow-left.png';
import { SearchContext } from '../contexts/SearchContext';

const ListCardsWrapper = styled.div`
    width: 80%;
    margin: 10px auto 50px;

    .items {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .pagination {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 25px;
            cursor: pointer;
        }

        div {
            margin: 0 10px;
            font-size: 1.2rem;

            span {
                color:#1D6BB6;
                font-weight: 700;
            }
        }
    }
`;

const InfoSearchWrapper = styled.div`
    margin-top: 10px;
    width: 100vw;
    display: flex;
    justify-content: space-around;

    span {
        margin-right: 100px;
    }
    span span {
        color: #1D6BB6;
        font-weight: 700;
    }
    a {
        color: #1D6BB6;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;

interface pokemonProps {
    name: string,
    url: string,
}

interface resultProps {
    pokemon: {
        name: string,
        url: string,
    }
}

export default function ListCards() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState({} as pokemonProps);
    const {
        nameSearch,
        typeSearch,
        currentPage,
        url,
        isEmpty,
        previousPage,
        nextPage
    } = useContext(SearchContext);

    useEffect(() => {
        console.log(url);
        axios.get(url).then(
            response => {
                if (url.includes('?offset')) {
                    setPokemons(response.data.results);
                } else if (url.includes('/type/')) {
                    const results = response.data.pokemon;
                    const resultsFiltered = results.map((result: resultProps) => result.pokemon)
                    setPokemons(resultsFiltered);
                } else {
                    const result = {
                        name: response.data.name,
                        url: url,
                    }
                    setPokemon(result);
                }
            }
        );
    }, [currentPage, url]);

    return (
        <>
            {url.includes('/type/') ? (
                <InfoSearchWrapper>
                    <span>Resultados do tipo <span>{typeSearch}</span></span>
                    <a href="/">Mostrar lista completa</a>
                </InfoSearchWrapper>
            ) : (
                <>
                    {!url.includes('?offset') && (
                        <InfoSearchWrapper>
                            <span>Resultado de <span>{nameSearch}</span></span>
                            <a href="/">Mostrar lista completa</a>
                        </InfoSearchWrapper>
                    )}
                </>
            )}

            <ListCardsWrapper>
                <div className="items">
                    {url.includes('?offset') ? (
                        <>
                            {pokemons.map(
                                (pokemon: pokemonProps) =>
                                    <Card
                                        name={pokemon.name}
                                        url={pokemon.url}
                                        key={pokemon.name}
                                    />
                            )}
                        </>
                    ) : (
                        <>
                            {url.includes('/type/') ? (
                                <>
                                    {pokemons.map(
                                        (pokemon: pokemonProps) =>
                                            <Card
                                                name={pokemon.name}
                                                url={pokemon.url}
                                                key={pokemon.name}
                                            />
                                    )}
                                </>
                            ) : (
                                <>
                                    {isEmpty(pokemon) ? (
                                        <div>CARREGANDO...</div>
                                    ) : (
                                        <Card name={pokemon.name} url={pokemon.url} key={pokemon.name} />
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                {url.includes('?offset') && (
                    <div className="pagination">
                        <img src={ArrowLeft} alt="" onClick={previousPage} />
                        <div>Página <span>{currentPage}</span> de <span>{Math.ceil(898 / 20)}</span></div>
                        <img src={ArrowRight} alt="" onClick={nextPage} />
                    </div>
                )}
            </ListCardsWrapper>
        </>
    );
}
