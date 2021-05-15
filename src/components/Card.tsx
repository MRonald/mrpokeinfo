import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 290px;
    min-height: 543px;
    margin: 10px;
    border: 2px solid var(--orange-dark);
    border-radius: 10px;
    background-image: linear-gradient(to right, var(--orange-light), #ffd48e );
    font-size: 1.1rem;

    header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--orange-dark);

        span {
            padding: 5px;
        }
        span:first-child {
            width: 20%;
        }
        span:last-child {
            border-left: 2px solid var(--orange-dark);
            width: 80%;
        }
    }

    .imgWrapper {
        width: 100%;
        min-height: 182px;
        display: flex;
        justify-content: center;
        border-bottom: 2px solid var(--orange-dark);
        background-image: radial-gradient(#ffd48e 50%, var(--orange-dark));

        img {
            width: 180px;
        }
    }

    .info {
        div {
            border-bottom: 2px solid var(--orange-dark);
            display: flex;

            span {
                padding: 5px;
            }
            span:last-child {
                border-left: 2px solid var(--orange-dark);
            }
        }
        div:first-child {
            justify-content: space-between;
        }
        div:last-child {
            span {
                width: 50%;
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

const StatisticWrapper = styled.div`
    padding: 5px;

    div:first-child {
        display: flex;
        justify-content: space-between;
    }
    .experienceBar {
        margin-top: 3px;
        width: 100%;
        height: 10px;
        background-color: #cecece;
        border: 1px solid gray;
        border-radius: 10px;
        overflow: hidden;

        div {
            height: 100%;
            width: 50%;
            background-color: rgba(44, 148, 245, 0.74);
        }
    }
`;

// Interfaces
interface StatisticProps {
    name: string,
    value: number,
}

interface CardProps {
    name: string,
    url: string,
}

interface pokemonProps {
    "base_experience": number,
    "height": number,
    "weight": number,
    "id": number,
    "image": string,
    "types": Array<string>,
    "stats": {
        "hp": number,
        "attack": number,
        "defense": number,
        "special-attack": number,
        "special-defense": number,
        "speed": number,
    },
    "name": string,
}

interface typeProps {
    "type": {
        "name": string,
    }
}

// Statistic is a internal component

function Statistic({ name, value }: StatisticProps) {
    const maxValue = 250;
    return (
        <StatisticWrapper>
            <div>
                <span>{name}</span>
                <span>{value} pts</span>
            </div>
            <div className="experienceBar">
                <div style={{width: `${value * 100 / maxValue}%`}}></div>
            </div>
        </StatisticWrapper>
    );
}

export default function Card({ name, url }: CardProps) {
    const [pokemon, setPokemon] = useState({} as pokemonProps);

    const nameCapitalize = name[0].toUpperCase() + name.substr(1);

    useEffect(() => {
        axios.get(url).then(
            response => {
                const typesPokemon = response.data.types.map((type: typeProps) => type.type.name);
                const result = {
                    "base_experience": response.data.base_experience,
                    "height": response.data.height,
                    "weight": response.data.weight,
                    "id": response.data.id,
                    "image": response.data.sprites.other["official-artwork"].front_default,
                    "types": typesPokemon,
                    "stats": {
                        "hp": response.data.stats[0].base_stat,
                        "attack": response.data.stats[1].base_stat,
                        "defense": response.data.stats[2].base_stat,
                        "special-attack": response.data.stats[3].base_stat,
                        "special-defense": response.data.stats[4].base_stat,
                        "speed": response.data.stats[5].base_stat,
                    },
                    "name": response.data.name,
                }
                setPokemon(result);
            }
        );
    }, [url]);

    function isEmpty(obj: Object): boolean {
        return Object.keys(obj).length === 0;
    }

    return (
        <CardWrapper>
            {isEmpty(pokemon) ? (
                <div className="screenLoading">
                    <div>Carregando {nameCapitalize}...</div>
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
                    <header>
                        <span>#{pokemon.id}</span>
                        <span>{nameCapitalize}</span>
                    </header>
                    <section className="imgWrapper">
                        <img src={pokemon.image} alt={`Pokemon ${pokemon.name}`} />
                    </section>
                    <section className="info">
                        <div>
                            <span>
                                Tipo(s): {
                                    pokemon.types.map((type, i) => {
                                        if (i !== pokemon.types.length - 1) {
                                            return `${type}, `;
                                        } else {
                                            return type;
                                        }
                                    })
                                }
                            </span>
                            <span>XP: {pokemon.base_experience}</span>
                        </div>
                        <div>
                            <span>Altura: {pokemon.height * 10} cm</span>
                            <span>Peso: {pokemon.weight / 10} kg</span>
                        </div>
                    </section>
                    <section className="statistics">
                        <Statistic name="HP" value={pokemon.stats.hp} />
                        <Statistic name="ATK" value={pokemon.stats.attack} />
                        <Statistic name="DEF" value={pokemon.stats.defense} />
                        <Statistic name="S.ATK" value={pokemon.stats['special-attack']} />
                        <Statistic name="S.DEF" value={pokemon.stats['special-defense']} />
                        <Statistic name="SPD" value={pokemon.stats.speed} />
                    </section>
                </>
            )}
        </CardWrapper>
    );
}
