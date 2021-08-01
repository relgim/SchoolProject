import React, {useContext, useState} from 'react';
import { SearchContext } from '../context/search';
import { Grid, Paper, Link, Button } from '@material-ui/core';

import { FormControl, Input, InputLabel, InputAdornment } from '@material-ui/core';
import './SingleAnime.scss';

const EditAnime = (props) => {
    const [newTitle, setNewTitle] = useState('');
    const [newRating, setNewRating] = useState('');
    const [newScore, setNewScore] = useState('');
    const [newDes, setNewDes] = useState('');
    const [newEpisode, setNewEpisode] = useState('');
    const search = useContext(SearchContext);

    const {
        title,
        image_url
    } = props.info
    

    function handleChangeTitle(e){
        setNewTitle(e.target.value);
    }
    function handleSubmitTitle(e) {
        e.preventDefault();
        let temp;
        search.savedData.map( task => {
            // if this task has the same ID as the edited task
              if (props.info.mal_id === task.mal_id) {
                temp = task;
              }
              return task;
            });
        if(temp === undefined || temp.length === 0){

        }
        else{
            temp.title = newTitle;
            handleDeletePlus(temp);
        }
        setNewTitle("");
    }
    function handleDeletePlus(newObject) {
        const remainingTasks = search.savedData.filter(task => props.info.mal_id !== task.mal_id);
        search.setDelete();
        var exist = [];
        localStorage.setItem('savedData', JSON.stringify(exist))
        remainingTasks.forEach( function(task){
            search.setSaved(task)
            exist.push(task)
        })
        alert('Changed')
        search.setSaved(newObject)
        exist.push(newObject)
        localStorage.setItem('savedData', JSON.stringify(exist))
    }
    
    function handleChangeRating(e){
        setNewRating(e.target.value);
    }
    function handleSubmitRating(e) {
        e.preventDefault();
        let temp;
        search.savedData.map( task => {
            // if this task has the same ID as the edited task
              if (props.info.mal_id === task.mal_id) {
                temp = task;
              }
              return task;
            });
        if(temp === undefined || temp.length === 0){

        }
        else{
            temp.rating = newRating;
            handleDeletePlus(temp);
        }
        setNewRating("");
    }
    function handleChangeDes(e){
        setNewDes(e.target.value);
    }
    function handleSubmitDes(e) {
        e.preventDefault();
        let temp;
        search.savedData.map( task => {
            // if this task has the same ID as the edited task
              if (props.info.mal_id === task.mal_id) {
                temp = task;
              }
              return task;
            });
        if(temp === undefined || temp.length === 0){

        }
        else{
            temp.synopsis = newDes;
            handleDeletePlus(temp);
        }
        setNewDes("");
    }
    function handleChangeScore(e){
        setNewScore(e.target.value);
    }
    function handleSubmitScore(e) {
        e.preventDefault();
        let temp;
        search.savedData.map( task => {
            // if this task has the same ID as the edited task
              if (props.info.mal_id === task.mal_id) {
                temp = task;
              }
              return task;
            });
        if(temp === undefined || temp.length === 0){

        }
        else{
            temp.score = newScore;
            handleDeletePlus(temp);
        }
        setNewScore("");
    }
    function handleChangeEpisode(e){
        setNewEpisode(e.target.value);
    }
    function handleSubmitEpisode(e) {
        e.preventDefault();
        let temp;
        search.savedData.map( task => {
            // if this task has the same ID as the edited task
              if (props.info.mal_id === task.mal_id) {
                temp = task;
              }
              return task;
            });
        if(temp === undefined || temp.length === 0){

        }
        else{
            temp.episodes = newEpisode;
            handleDeletePlus(temp);
        }
        setNewEpisode("");
    }
    return <Grid container spacing={10} direction="row" justify ="center" alignItems="center" alignCenter="center" className="singleAnime__container">
        <Grid>
            <img src={image_url} alt={title} className="singleAnime__image"/>
        </Grid>
        <Grid item direction="row">
            <Paper elevation={3} className="singleAnime__description"> 
                <FormControl fullWidth className="temp">
                    <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">Title:</InputAdornment>}
                        value={newTitle}
                        onChange={handleChangeTitle}
                    />
                    <Button variant="contained" onClick={handleSubmitTitle}>Default</Button>
                    
                </FormControl>
                <FormControl fullWidth className="temp">
                    <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">Rating:</InputAdornment>}
                        value={newRating}
                        onChange={handleChangeRating}
                    />
                    <Button variant="contained" onClick={handleSubmitRating}>Default</Button>
                </FormControl>
                <FormControl fullWidth className="temp">
                    <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">Descriptions:</InputAdornment>}
                        value={newDes}
                        onChange={handleChangeDes}
                    />
                    <Button variant="contained" onClick={handleSubmitDes}>Default</Button>
                </FormControl>
                <FormControl fullWidth className="temp">
                    <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">Score:</InputAdornment>}
                        value={newScore}
                        onChange={handleChangeScore}
                    />
                    <Button variant="contained" onClick={handleSubmitScore}>Default</Button>
                </FormControl>
                <FormControl fullWidth className="temp">
                    <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start">Episodes:</InputAdornment>}
                        value={newEpisode}
                        onChange={handleChangeEpisode}
                    />
                    <Button variant="contained" onClick={handleSubmitEpisode}>Default</Button>
                </FormControl>

                <Link component="button" variant="body1" onClick="location.href='www.yoursite.com'">
                    My Anime List
                </Link>
                
            </Paper>
        </Grid>
    </Grid>;

};

export default EditAnime;