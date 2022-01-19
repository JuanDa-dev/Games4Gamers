import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import ColorsAll from './views/colorsAll';
import Error404 from './views/Error404';
import SpaceInvaders from './views/spaceInvaders';
import PingPong from './views/pingPong';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colorsAll/:roomID" element={<ColorsAll />} />
        <Route path="/spaceInvaders" element={<SpaceInvaders />} />
        <Route path="/pingPong" element={<PingPong />} />
        <Route path="*" exact={true} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
