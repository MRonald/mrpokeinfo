import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
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
            <GlobalStyle />
            <Header />
            <h1>Meu title</h1>
        </div>
    );
}
