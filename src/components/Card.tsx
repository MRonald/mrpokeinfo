import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 290px;
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
                <div>Carregando {name}...</div>
            ) : (
                <>
                    <header>
                        <span>#{pokemon.id}</span>
                        <span>{pokemon.name}</span>
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
