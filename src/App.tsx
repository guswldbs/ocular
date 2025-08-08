import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import About from './pages/About';
import { Signup } from './pages/Signup';
import Editsign from './pages/Editsign';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editsign" element={<Editsign />} />
    </Routes>
  );
};

export default App;
