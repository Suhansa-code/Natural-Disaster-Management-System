import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PostView from './Pages/PostView';
import AdminPanel from './Pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminposts" element={<AdminPanel />} />
        <Route path="/posts" element={<PostView />} />
      </Routes>
    </Router>
  );
}

export default App;