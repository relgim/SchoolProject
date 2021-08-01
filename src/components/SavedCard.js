import React , { useContext } from 'react';
import { SearchContext } from '../context/search';
import { Typography, Link, Paper, GridListTile, Grid } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import './AnimeCard.scss';


const SavedCard = (props) => {
    //console.log(props);
    const title = props.anime.title.length >= 15 ? `${props.anime.title.substring(0,15)}...` : `${props.anime.title}`;
    const imageUrl = props.anime.image_url;
    const synopsis = props.anime.synopsis.length > 30 ? `${props.anime.synopsis.substring(0,30)}...` : `${props.anime.synopsis}`

    const history = useHistory();
    const search = useContext(SearchContext);

    const onClickHandler = () => {
        fetch(`https://api.jikan.moe/v3/anime/${props.anime.mal_id}`)
        .then((response) => response.json())
        .then((data) =>{
            search.setSingle(data);
            localStorage.setItem('singleData', JSON.stringify(data))
            history.push('/single-view');
        });
    };
    const onClickHandler3 = () => {
        localStorage.setItem('editData', props.anime.mal_id)
        search.setEdit(props.anime.mal_id);
        history.push('/edit');
    };
    const onClickHandler2 = () => {
        fetch(`https://api.jikan.moe/v3/anime/${props.anime.mal_id}`)
        .then((response) => response.json())
        .then((data) =>{
            let num = false;
            console.log(search.savedData);
            history.push('/Saved');
            search.savedData.map(task => {
                //console.log(data.title+' + '+data.mal_id+ ' = ' + task.title+' + '+task.mal_id);
                //console.log(data.title+' + '+parseInt(data.mal_id)+ ' = ' + task.title+' + '+parseInt(task.mal_id));
                if (parseInt(data.mal_id) === parseInt(task.mal_id)) {
                    num = true;
                }
            });
            if(num){
                alert("Error: You already saved this anime.");
                history.push('/Saved');
            }
            else{
                console.log(data);
                search.setSaved(data);

                var exist = JSON.parse(localStorage.getItem('savedData')) || [];
                exist.push(data);
                localStorage.setItem('savedData', JSON.stringify(exist))

                console.log(exist);
                history.push('/Saved');
            }
            
        });
    };
    function handleDelete() {
        const remainingTasks = search.savedData.filter(task => props.anime.mal_id !== task.mal_id);
        console.log(remainingTasks)
        search.setDelete();
        var exist = [];
        localStorage.setItem('savedData', JSON.stringify(exist))
        remainingTasks.map( (task) => (
            search.setSaved(task),
            exist.push(task)
        ))
        localStorage.setItem('savedData', JSON.stringify(exist))
    }

    return (
    <GridListTile className = "animeCard__container"> 
        <Grid container item xs={12}>
            <Paper className="animeCard__paper">
                <img src={imageUrl} alt={title} style={{ maxHeight : 300}} />
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="h2" paragraph={true}>
                    {synopsis}
                </Typography>
                <Grid container direction="row" justifyContent="space-between">
                    <Link component="button" variant="body" style={{marginBottom: 0}} onClick={onClickHandler}>
                        Learn More
                    </Link>
                    <Link component="button" variant="body" style={{marginBottom: 0}} onClick={onClickHandler3}>
                        Edit
                    </Link>
                    <Link component="button" variant="body" style={{marginBottom: 0}} onClick={handleDelete}>
                        Delete
                    </Link>
                </Grid>
            </Paper>  
        </Grid>  
    </GridListTile>
    )
};

export default SavedCard;