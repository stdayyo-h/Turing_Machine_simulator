import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InitialPage from './pages/Initial';
import { BitStateContextProvider } from './context/bit_states';

function App() {
  return (
    <div>
      <div className={`noisy `} id="noisy">
        <div className={`blinker `}>
          <div className={`h-full `}>
            <BitStateContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path={"/"} element={<InitialPage />} exact />
                </Routes>
              </BrowserRouter>
            </BitStateContextProvider>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
