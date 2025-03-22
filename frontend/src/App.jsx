import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Main Components Imports 
import Home from './components/main-components/Home'; 
import Navigationbar from './components/main-components/Navigationbar'; 






//Disaster management imports
import AddDisaster from './components/disaster-management/AddDisaster';









//Comunity-support imports
import PostView from './components/community-support/PostView';
import AdminPanel from './components/community-support/AdminPanel';
import AddPosts from './components/community-support/addPosts';
import ViewPosts from './components/community-support/adminPostsView';






//Disaster funding imports 










//Admin dashbord imports 











function App() {
  return (





    
    <Router>
      <Navigationbar />
      <Routes>
        {/* Main Components */}
        <Route path="/" element={<Home />} />
  





        {/* Disaster management */}
        <Route path="/addDisaster" element={<AddDisaster />} />








        {/* Comunity-support */}
        <Route path="/community" element={<PostView />} />
        <Route path="/adminposts" element={<AdminPanel/>} />
        <Route path="/addposts" element={<AddPosts/>} />
        <Route path="/adminpostsview" element={<ViewPosts/>} />







        {/* Disaster funding */}










        {/* Admin dashbord */}








      
      </Routes>
    </Router>
  );
}

export default App;