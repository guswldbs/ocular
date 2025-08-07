import {  Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import About  from './pages/About';

const App= () => {
  return (

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

  );
}

export default App;
