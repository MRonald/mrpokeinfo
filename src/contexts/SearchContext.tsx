import { createContext, ReactNode, useEffect, useState } from "react";

interface SearchContextData {
    nameSearch: string,
    typeSearch: string,
    currentPage: number,
    url: string,
    setNameSearch: (name: string) => void,
    setTypeSearch: (type: string) => void,
    setCurrentPage: (page: number) => void,
    setUrl: (url: string) => void,
}

interface SearchProviderProps {
    children: ReactNode,
}

export const SearchContext = createContext({} as SearchContextData);

export default function SearchProvider({ children }: SearchProviderProps) {
    const [nameSearch, setNameSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 20}&limit=20`);

    useEffect(() => {
        setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 20}&limit=20`);
    }, [currentPage]);

    return(
        <SearchContext.Provider value={{
            nameSearch,
            typeSearch,
            currentPage,
            url,
            setNameSearch,
            setTypeSearch,
            setCurrentPage,
            setUrl,
        }}>
            {children}
        </SearchContext.Provider>
    );
}
