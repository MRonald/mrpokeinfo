import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../contexts/SearchContext';

const HeaderWrapper = styled.div`
    background-color: #2C94F5;
    min-height: 60px;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: white;
    }

    form {
        width: 70%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        input {
            padding: 10px;
            width: 30%;
            min-width: 195px;
            border-radius: 10px;
            border: 1px solid gray;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, .4);
            font-family: Ubuntu, Arial, sans-serif;
            font-size: 1rem;
        }
        input:not(:first-child) {
            width: 12%;
            margin: 0 15px;
        }
        input::placeholder {
            color: black;
        }
        input:focus {
            &::placeholder {
                color: gray;
            }
        }
        button {
            padding: 10px;
            font-size: 1rem;
            color: white;
            background-color: #1D6BB6;
            border: 1px solid rgba(0, 0, 0, .4);
            border-radius: 10px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, .4);
            cursor: pointer;
        }
    }
`;

interface eventProps {
    preventDefault: () => void,
}

export default function Header() {
    const [valueName, setValueName] = useState("");
    const [valueType, setValueType] = useState("");
    const {setUrl} = useContext(SearchContext);

    function find(e: eventProps): void {
        e.preventDefault();
        if (valueName === '') {
            setUrl(`https://pokeapi.co/api/v2/type/${valueType}`);
        } else if (valueType === '') {
            setUrl(`https://pokeapi.co/api/v2/pokemon/${valueName.toLowerCase()}`);
        }
    }

    return (
        <HeaderWrapper>
            <h1>Mr.PokeInfo</h1>
            <form onSubmit={e => find(e)}>
                <input
                    type="text"
                    placeholder="Pesquisar por nome (Ex: Charmander)"
                    onChange={e => setValueName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pesquisar por categoria"
                    onChange={e => setValueType(e.target.value)}
                />
                <button>Buscar</button>
            </form>
        </HeaderWrapper>
    );
}
