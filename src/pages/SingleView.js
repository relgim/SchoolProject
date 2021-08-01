import React, { useEffect , useState, useContext }  from 'react';
import {SearchContext} from '../context/search';
import { Box, Typography } from '@material-ui/core';
import SingleAnime from '../components/SingleAnime';

const SingleView = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);
    const [ path, setPath] = useState(true);
    const [ tempdata, setTempData] = useState({});
    var tempdatalist = search.savedData;
    useEffect( () => {
        if ( search.singleData === undefined || Object.keys(search.singleData).length === 0 ){
            if (search.savedData === undefined || search.savedData.length === 0 ){
                setDataExists(false);
            }
            else{
                search.setSingle(JSON.parse(localStorage.getItem('singleData')));
            }
        }
        else{
            if (search.savedData === undefined || search.savedData.length === 0 ){
                search.setSingle(JSON.parse(localStorage.getItem('singleData')));
            }
            else{
                tempdatalist.forEach( function(temp) {
                    if(temp.mal_id === search.singleData.mal_id){
                        setPath(false)
                        setTempData(temp);
                    }
                })
                
            }
        }
    }, [search, tempdatalist] );
    if(path){
        tempdatalist.forEach( function(temp)  {
            if(temp.mal_id === search.singleData.mal_id){
                setPath(false)
                setTempData(temp)
            }
        })
    }
    return path ?  <Box mt={2}>
        {(dataExists && <SingleAnime info = {search.singleData}/>) || <Typography variant="h4">Data does not exist</Typography>}
    </Box> 
    : 
    <Box mt={2}>
        {(dataExists && <SingleAnime info = { tempdata }/>) || <Typography variant="h4">Data does not exist</Typography>}
    </Box>
};

export default SingleView;