import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importamos los componentes que vamos a utilizar en cada ruta

import Tamagotchi from "./Games/Tamagotchi/Tamagotchi.jsx";
import Game from "./Games/Lagarto/Game.jsx";
import Home from "./Games/home.jsx";
import Records from "./Games/Records/Records.jsx";
// Creamos nuestro componente Tamagotchi
function App() {
    return (
// Envolvemos todas nuestras rutas con BrowserRouter
        <BrowserRouter>
            {/* Indicamos nuestras rutas utilizando el componente Routes */}
            <Routes>
                {/* Definimos una ruta para la página principal, que muestra el
componente Home */}
                <Route path="/" element={<Home />} />
                {/* Definimos una ruta para el juego 1, que muestra el componente
Game1 */}
                <Route path="/game1" element={<Tamagotchi />}/>
                {/* Definimos una ruta para el juego 2, que muestra el componente
Game2 */}
                <Route path="/game2" element={<Game />} />
                {/* Definimos una ruta para la lista de registros, que muestra el
componente Records */}
                <Route path="/records" element={<Records />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;