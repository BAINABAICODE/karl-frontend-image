import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import ViewBook from './pages/ViewBook';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit/:id" element={<EditBook />} />
                <Route path="/view/:id" element={<ViewBook />} />
            </Routes>
        </Router>
    );
}

export default App;
