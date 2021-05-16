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
    isEmpty: (obj: Object) => boolean,
    previousPage: () => void,
    nextPage: () => void,
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

    function isEmpty(obj: Object): boolean {
        return Object.keys(obj).length === 0;
    }

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
            isEmpty,
            previousPage,
            nextPage,
        }}>
            {children}
        </SearchContext.Provider>
    );
}
