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
    .screenLoading {
        width: 100%;
        height: 543px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @keyframes bodyLoading {
        0% {
            opacity: 1;
            backface-visibility: hidden;
            transform: translateZ(0) scale(1.5,1.5);
        } 100% {
            opacity: 0;
            backface-visibility: hidden;
            transform: translateZ(0) scale(1,1);
        }
        }
        .bodyLoading div > div {
            position: absolute;
            width: 13.32px;
            height: 13.32px;
            border-radius: 50%;
            background: #56a3eb;
            animation: bodyLoading 1s linear infinite;
        }.bodyLoading div:nth-child(1) > div {
            left: 82.5px;
            top: 48.50000000000001px;
            animation-delay: -0.875s;
        }
        .bodyLoading > div:nth-child(1) {
            transform: rotate(0deg);
            transform-origin: 89.16px 55.160000000000004px;
        }.bodyLoading div:nth-child(2) > div {
            left: 72.5px;
            top: 72.5px;
            animation-delay: -0.75s;
        }
        .bodyLoading > div:nth-child(2) {
            transform: rotate(45deg);
            transform-origin: 79.16px 79.16px;
        }.bodyLoading div:nth-child(3) > div {
            left: 48.50000000000001px;
            top: 82.5px;
            animation-delay: -0.625s;
        }
        .bodyLoading > div:nth-child(3) {
            transform: rotate(90deg);
            transform-origin: 55.160000000000004px 89.16px;
        }.bodyLoading div:nth-child(4) > div {
            left: 25.500000000000007px;
            top: 72.5px;
            animation-delay: -0.5s;
        }
        .bodyLoading > div:nth-child(4) {
            transform: rotate(135deg);
            transform-origin: 32.160000000000004px 79.16px;
        }.bodyLoading div:nth-child(5) > div {
            left: 15.500000000000007px;
            top: 48.50000000000001px;
            animation-delay: -0.375s;
        }
        .bodyLoading > div:nth-child(5) {
            transform: rotate(180deg);
            transform-origin: 22.160000000000004px 55.160000000000004px;
        }.bodyLoading div:nth-child(6) > div {
            left: 25.500000000000007px;
            top: 25.500000000000007px;
            animation-delay: -0.25s;
        }
        .bodyLoading > div:nth-child(6) {
            transform: rotate(225deg);
            transform-origin: 32.160000000000004px 32.160000000000004px;
        }.bodyLoading div:nth-child(7) > div {
            left: 48.50000000000001px;
            top: 15.500000000000007px;
            animation-delay: -0.125s;
        }
        .bodyLoading > div:nth-child(7) {
            transform: rotate(270deg);
            transform-origin: 55.160000000000004px 22.160000000000004px;
        }.bodyLoading div:nth-child(8) > div {
            left: 72.5px;
            top: 25.500000000000007px;
            animation-delay: 0s;
        }
        .bodyLoading > div:nth-child(8) {
            transform: rotate(315deg);
            transform-origin: 79.16px 32.160000000000004px;
        }
        .loadingSpinner {
            width: 111px;
            height: 111px;
            display: inline-block;
            overflow: hidden;
            background: transparent;
        }
        .bodyLoading {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0; /* see note above */
        }
        .bodyLoading div { box-sizing: content-box; }
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
        setPokemons([]);
        setPokemon({} as pokemonProps);
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
        ).catch(
            () => {
                alert('Os parâmetros passados não retornam nenhum resultado.');
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
                    {pokemons.length === 0 && isEmpty(pokemon) ? (
                        <div className="screenLoading">
                            <div>
                                <div className="loadingSpinner">
                                    <div className="bodyLoading">
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                        <div><div></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                                <div className="screenLoading">
                                                    <div>
                                                        <div className="loadingSpinner">
                                                            <div className="bodyLoading">
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                                <div><div></div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Card name={pokemon.name} url={pokemon.url} key={pokemon.name} />
                                            )}
                                        </>
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
