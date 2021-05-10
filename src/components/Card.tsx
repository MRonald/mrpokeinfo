import styled from 'styled-components';

const pokemon = {
    "base_experience": 64,
    "height": 7,
    "weight": 69,
    "id": 1,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "types": ["grass", "poison"],
    "stats": {
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "special-attack": 65,
        "special-defense": 65,
        "speed": 66
    },
    "name": "bulbasaur"
}

const CardWrapper = styled.div`
    width: 300px;
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

        div {
            height: 100%;
            width: 50%;
            background-color: rgba(44, 148, 245, 0.74);
        }
    }
`;

interface StatisticProps {
    name: string,
    value: number,
    maxValue: number,
}

function Statistic({ name, value, maxValue }: StatisticProps) {
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

export default function Card() {
    return (
        <CardWrapper>
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
                <Statistic name="HP" value={pokemon.stats.hp} maxValue={300} />
                <Statistic name="ATK" value={pokemon.stats.attack} maxValue={300} />
                <Statistic name="DEF" value={pokemon.stats.defense} maxValue={300} />
                <Statistic name="S.ATK" value={pokemon.stats['special-attack']} maxValue={300} />
                <Statistic name="S.DEF" value={pokemon.stats['special-defense']} maxValue={300} />
                <Statistic name="SPD" value={pokemon.stats.speed} maxValue={300} />
            </section>
        </CardWrapper>
    );
}
