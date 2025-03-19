import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PostView from './Pages/PostView';
import AdminPanel from './Pages/AdminPanel';

//Main Components Imports 







//Disaster management imports










//Comunity-support imports









//Disaster funding imports 










//Admin dashbord imports 











function App() {
  return (





    
    <Router>
      <Routes>
        {/* Main Components */}






        {/* Disaster management */}









        {/* Comunity-support */}
        <Route path="/adminposts" element={<AdminPanel />} />
        <Route path="/posts" element={<PostView />} />








        {/* Disaster funding */}










        {/* Admin dashbord */}








      
      </Routes>
    </Router>
  );
}

export default App;