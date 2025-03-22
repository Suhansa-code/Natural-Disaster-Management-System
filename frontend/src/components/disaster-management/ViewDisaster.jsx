import React, { useEffect, useState } from "react";
import axios from "axios";
import DisasterDetail from "./DisasterDetail";
import Navigationbar from "../main-components/Navigationbar";



const URL = "http://localhost:5000/disaster";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching disaster data:", error);
    return { disasterData: [] };
  }
};

export default function ViewDisasters() {
  const [disasterData, setDisasterData] = useState([]);


  useEffect(() => {

    fetchHandler().then((data) => { console.log(data);
      if(data) {
        console.log(data);
        setDisasterData(data);
      }
    });
  }, []);

  console.log(disasterData.disasters);
  return (
    <>
        <Navigationbar />
    <div>
      <br />

      <div>
        {disasterData.disasters && disasterData.disasters.length > 0 ? ( // Check if inquiryData is not null and has items
          disasterData.disasters.map((disasters, i) => (
            //<DisasterDetail key={i} disasters={disasters}   />

            <DisasterDetail disasters={disasters}/>

            // Pass each inquiry object individually
          ))
        ) : (
          <p>No Disaster found.</p> // Handle the case when no inquiries are found
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
