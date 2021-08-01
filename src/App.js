import React, { useState} from 'react'
import {BrowserRouter as Router , Route , Redirect , Switch } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SingleView from './pages/SingleView';
import Saved from './pages/Saved';
import EditPage from './pages/EditPage';
import MainNavigation from './components/MainNavigation';
import { SearchContext} from './context/search';


function App() {
  const [ animeData, setAnimeData ] = useState([]);
  const [ singleData, setSingleData ] = useState({});
  const [ editData, setEditData ] = useState({});
  const [ savedData, setSavedData ] = useState([]);
  const [list, setList] = useState([]);

  //localStorage.clear();
  const deleteList = () => {
    setList([])
  }
  const setL = (data) => {
    setList( result => [...result, data])
  }
  const setData = (data) => {
    setAnimeData(data);
  };
  const setSingle = (data) => {
    setSingleData(data);
  };
  const setEdit = (data) => {
    setEditData(data);
  };
  const setDelete = () => {
    setSavedData([]);
  }
  const setSaved = (data) => {
    setSavedData( result => [...result, data])
    //const newData = { id: "anime-" + nanoid()};
    //setSavedData([ {data}]);
  };
  console.log(singleData)
 if(singleData === undefined || singleData.length === 0 ){
    if(JSON.parse(localStorage.getItem('singleData')) !== null)
      JSON.parse(localStorage.getItem('singleData')).map( (objects) => (
        setSingle(objects)
      ))
  }
  if(savedData === undefined || savedData.length === 0 ){
    if(JSON.parse(localStorage.getItem('savedData')) !== null)
      JSON.parse(localStorage.getItem('savedData')).map( (objects) => (
        setSaved(objects)
      ))
  }
  console.log(animeData)

  const search = (searchTerm) => {
    return fetch(
      `https://api.jikan.moe/v3/search/anime?q=${searchTerm}&limit=20`
    ).then((response) => response.json());
  };

  return (
    <SearchContext.Provider value = {{deleteList, setL, list, setSaved, search, setDelete,setEdit,editData, savedData, animeData, singleData, setData, setSingle}}>
    <Router> 
      <MainNavigation />
      <main>
        <Switch>

          <Route path="/" exact>
            <Home/>
          </Route>

          <Route path="/results" exact>
            <Results/>
          </Route>

          <Route path="/single-view" exact>
            <SingleView/>
          </Route>

          <Route path="/saved" exact>
            <Saved/>
          </Route>

          <Route path="/edit" exact>
            <EditPage/>
          </Route>

          <Redirect to="/" />

        </Switch>
      </main>
    </Router>
    </SearchContext.Provider>
  );
}

export default App;
