import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Main Components Imports 
import Home from './components/main-components/Home'; 
import Navigationbar from './components/main-components/Navigationbar'; 






//Disaster management imports
import AddDisaster from './components/disaster-management/AddDisaster';
import ViewDisaster from './components/disaster-management/ViewDisaster';
import UpdateDisaster from './components/disaster-management/updateDisaster';








//Comunity-support imports
import PostView from './components/community-support/PostView';








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
        <Route path="/DisasterDetails" element={<ViewDisaster />} />
        <Route path="/UpdateDisaster/:id" element={<UpdateDisaster />} />








        {/* Comunity-support */}
        <Route path="/community" element={<PostView />} />







        {/* Disaster funding */}










        {/* Admin dashbord */}








      
      </Routes>
    </Router>
  );
}

export default App;