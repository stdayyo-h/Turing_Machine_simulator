import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InitialPage from './pages/Initial';
import Simulator from './pages/Simulator';

function App() {
  return (
    <div>
      <div className={`noisy `} id="noisy">
        <div className={`blinker `}>
          <div className={`h-full `}>
            <BrowserRouter>
              <Routes>
                <Route path={"/"} element={<InitialPage />} exact />
                <Route path={"/simulator"} element={<Simulator />} exact />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
