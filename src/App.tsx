import { createGlobalStyle } from 'styled-components';
import Card from './components/Card';
import Header from './components/Header';

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
            <GlobalStyle />
            <Header />
            <Card />
        </div>
    );
}
