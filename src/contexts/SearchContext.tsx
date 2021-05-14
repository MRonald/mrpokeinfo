import { createContext, ReactNode, useState } from "react";

interface SearchContextData {
    nameSearch: string,
    typeSearch: string,
    setNameSearch: (name: string) => void,
    setTypeSearch: (type: string) => void,
}

interface SearchProviderProps {
    children: ReactNode,
}

export const SearchContext = createContext({} as SearchContextData);

export default function SearchProvider({ children }: SearchProviderProps) {
    const [nameSearch, setNameSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("");

    return(
        <SearchContext.Provider value={{
            nameSearch,
            typeSearch,
            setNameSearch,
            setTypeSearch,
        }}>
            {children}
        </SearchContext.Provider>
    );
}
