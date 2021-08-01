import React, { useEffect , useState, useContext }  from 'react';
import {SearchContext} from '../context/search';
import AnimeList from '../components/AnimeList';
import { Box, Paper , Typography, Grid } from '@material-ui/core';

const Results = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);
    
    useEffect( () => {
        if(search.anime !== undefined && search.animeData.length === 0){
            try {
                search.setData(JSON.parse(localStorage.getItem('myData')));
                setDataExists(true);
            } catch (error) {
                console.log(error);
                setDataExists(false);
            }
        }
        else if ( search.animeData === undefined || search.animeData.length === 0 ){
            try {
                search.setData(JSON.parse(localStorage.getItem('myData')));
                setDataExists(true);
            } catch (error) {
                console.log(error);
                setDataExists(false);
            }
        }
    }, [search] );
    console.log(search.animeData);
    if(!search.animeData){
        return <Box mt={2}><Typography variant="h4">
            <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            >
                <Paper elevation={3} > Search Result was not Valid</Paper>
            </Grid>
            </Typography></Box>
    }   
    else{
        return <Box mt={2}>
        {(dataExists && <AnimeList data = {search.animeData}/>) || <Typography variant="h4">Data does not exist</Typography>}
        </Box>
    }
};

export default Results;