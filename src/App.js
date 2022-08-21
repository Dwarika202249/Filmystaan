import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';

function App() {
  return (
    <Router>
      <Header />
    <div className="app">
      <Container>
        <Routes>
          <Route index path='/' element={<Trending />} exact />
        </Routes>
        <Routes>

          <Route exact path='/movies' element={<Movies />} />
        </Routes>
        <Routes>

          <Route exact path='/series' element={<Series />}/>
        </Routes>
          <Routes>

          <Route exact path='/search' element={<Search />} />
          </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
