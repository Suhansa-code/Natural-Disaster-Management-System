import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Main Components Imports 
import Home from './components/main-components/homecomp/home'; 
import Footer from './components/main-components/footer';
import UserLogin from './components/main-components/Userlog/userlogin';

import About from "./components/main-components/About";
import FloodPredictor from './components/predictor/floodprediction';



//Disaster management imports
import AddDisaster from './components/disaster-management/addDisaster';
import ViewDisaster from './components/disaster-management/ViewDisaster';
import UpdateDisaster from './components/disaster-management/UpdateDisaster';








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
        <Route path="/about" element={<About/>} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/floodpredictor" element={<FloodPredictor />} />
  





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