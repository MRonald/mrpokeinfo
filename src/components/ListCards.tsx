import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from './Card';
import ArrowRight from '../assets/imgs/arrow-right.png';
import ArrowLeft from '../assets/imgs/arrow-left.png';

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
interface pokemonProps {
    name: string,
    url: string,
}

export default function ListCards() {
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 20}&limit=20`;

    useEffect(() => {
        axios.get(URL).then(
            response => {
                setPokemons(response.data.results);
            }
        );
    }, [currentPage, URL]);

    function previousPage(): void {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage(): void {
        if (currentPage < 45) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <ListCardsWrapper>
            <div className="items">
                {pokemons.map(
                    (pokemon: pokemonProps) => <Card name={pokemon.name} url={pokemon.url} key={pokemon.name}/>
                )}
            </div>
            <div className="pagination">
                <img src={ArrowLeft} alt="" onClick={previousPage}/>
                <div>Página <span>{currentPage}</span> de <span>{Math.ceil(898 / 20)}</span></div>
                <img src={ArrowRight} alt="" onClick={nextPage}/>
            </div>
        </ListCardsWrapper>
    );
}
