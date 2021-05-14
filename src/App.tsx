import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import ListCards from './components/ListCards';
import SearchProvider from './contexts/SearchContext';

const GlobalStyle = createGlobalStyle`
    :root {
        --orange-dark: #A86800;
        --orange-light: #FCDEB0;
    }
    * {
        margin: 0;
        padding: 0;
    }
    body {
        font-family: Ubuntu, sans-serif;
    }
`;

export default function App() {
    return (
        <div>
            <SearchProvider>
                <GlobalStyle />
                <Header />
                <ListCards />
            </SearchProvider>
        </div>
    );
}
