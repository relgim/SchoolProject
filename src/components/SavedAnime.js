import React from 'react';
import SavedCard from './SavedCard'
import { GridList } from '@material-ui/core';

const SavedAnime = (props) => {
    return <GridList>
        {props.data.map((anime) => (
            <SavedCard 
                key = {anime.mal_id}
                anime={anime}
            />
        ))}
    </GridList>
};


export default SavedAnime;