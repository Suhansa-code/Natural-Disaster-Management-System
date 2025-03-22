import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Main Components Imports 
import Home from './components/main-components/homecomp/home'; 

import UserLogin from './components/main-components/Userlog/userlogin';






//Disaster management imports
import AddDisaster from './components/disaster-management/addDisaster';
import ViewDisaster from './components/disaster-management/ViewDisaster';
import UpdateDisaster from './components/disaster-management/updateDisaster';








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
       
      <Routes>
        {/* Main Components */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
  





        {/* Disaster management */}
        <Route path="/addDisaster" element={<AddDisaster />} />
        <Route path="/DisasterDetails" element={<ViewDisaster />} />
        <Route path="/UpdateDisaster/:id" element={<UpdateDisaster />} />








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