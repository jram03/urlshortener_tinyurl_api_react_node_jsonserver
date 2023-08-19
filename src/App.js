import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import History from './components/History';
function App() {
  const [hdata,sethdata]=useState([]);
  const [searchTerm,setSearchterm] = useState('');
  const [searchResults,setSearchresults]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/history");
        const arr = response.data;
        sethdata(arr);
      } catch (err) {
        console.log("fail");
      }
    };

    fetchData();
  }, []);


  const searchHandler =(st) =>{
    setSearchterm(st);
    if(st !== ""){
      const newHlist = hdata.filter((hd)=>{
        return Object.values(hd).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
        console.log(Object.values(hd).join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
      });
      setSearchresults(newHlist);
    }
    else{
      setSearchresults(hdata);
    }
   }

  const deletehandler=(id)=>{
    console.log(id)
    try {
        
        axios.delete(`http://localhost:3005/history/${id}`).then((res)=>{
          console.log("deleted");
          const newlist = hdata.filter((el)=>el.id!=id);
          sethdata(newlist);
        }).catch((e)=>{console.log("failed "+e)})
    }
    catch(er){
      console.log("failed "+er)
    }
}
  return (
    <div className="App">
      
      <Header />
      <Main hdata={hdata} sethdata={sethdata}/>
      <History hdata={searchTerm.length<1 ? hdata : searchResults} sethdata={sethdata} deletehandler={deletehandler} searchTerm={searchTerm} searchHandler={searchHandler}/>
    </div>
  );
}

export default App;
