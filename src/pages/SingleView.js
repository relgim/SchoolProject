import React, { useEffect , useState, useContext }  from 'react';
import {SearchContext} from '../context/search';
import { Box, Typography } from '@material-ui/core';
import SingleAnime from '../components/SingleAnime';

const SingleView = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);
    let path = true;
    var tempdata;
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
                tempdatalist.map( (temp) => {
                    if(temp.mal_id === search.singleData.mal_id){
                        path = false
                        tempdata = temp;
                        console.log(tempdata);
                    }
                    console.log(tempdata);
                })
                
            }
        }
    }, [search] );
    if(path){
        tempdatalist.map( (temp) => {
            if(temp.mal_id === search.singleData.mal_id){
                path = false
                tempdata = temp;
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