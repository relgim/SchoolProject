import React, { useState, useContext }  from 'react';
import { useHistory } from 'react-router-dom';
import {SearchContext} from '../context/search';
import { Box, Typography } from '@material-ui/core';
import EditAnime from '../components/EditAnime';

const EditPage = () => {
    const history = useHistory();
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);
    let temp;

    if(search.savedData === undefined || search.savedData.length === 0){
        setDataExists(true)
        console.log('start')
        history.push('/Saved');
        return<div></div>;
    }
    search.savedData.forEach(function(task) {
        if (parseInt(search.editData) === parseInt(task.mal_id)) {
            console.log("TRUE")
            temp = task;
        }
    });

    

    return <Box mt={2}>
        {(dataExists && <EditAnime info = {temp}/>) || <Typography variant="h4">Data does not exist</Typography>}
    </Box>
};

export default EditPage;