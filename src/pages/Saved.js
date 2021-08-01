import React, { useEffect , useState, useContext }  from 'react';
import {SearchContext} from '../context/search';
import SavedAnime from '../components/SavedAnime';
import {FormControl, Box, Button, Typography,Input, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const Results = () => {
    const search = useContext(SearchContext);
    const [dataExists, setDataExists] = useState(true);
    const [input , setInput ] = useState('');
    const [list, setList] = useState([]);
    const [path, setPath ] = useState(true);

    useEffect( () => {
        console.log(search.list);
    }, [search.list])

    const handleSearch = (event) => {
        event.preventDefault();
        setList([])
        search.deleteList()
        search.search(input).then((data) => (
            setList(data.results),
            console.log(data.results)
        ))
        if( list !== undefined)
            list.map( (temp) => (
                console.log(temp.mal_id),
                search.savedData.map( (temp2) => {
                    if(temp2.mal_id === temp.mal_id){
                        console.log("match")
                        setPath(false);
                        search.setL(temp);
                    }
                })
            ))
    }

    useEffect( () => {
        if ( search.savedData === undefined || search.savedData.length === 0 ){
            try {
                JSON.parse(localStorage.getItem('savedData')).map( (objects) => {
                    search.setSaved(objects);
                })
                setDataExists(true);
            } catch (error) {
                console.log(error);
                setDataExists(false);
            }
        }
    }, [search] );
    function deleteAll(){
        search.setDelete();
        localStorage.removeItem('savedData')
    }
    function refresh(){
        setList()
        search.deleteList()
        search.search(input).then((data) => {
            setList(data.results);
            console.log(data.results);
        });

        list.map( (temp) => {
            console.log(temp.mal_id);
            search.savedData.map( (temp2) => {
                if(temp2.mal_id === temp.mal_id){
                    console.log("match")
                    setPath(false);
                    search.setL(temp);
                }
            })
        })
    }
    if(search.savedData !== undefined && search.savedData.length === 2){
        var num = -1;
        search.savedData.map( (temp) => {
            if( temp.mal_id === num){
                search.setDelete();
                search.setSaved(temp)
            }
            num = temp.mal_id
        })
    }
    console.log(path);
    return path ? <Box mt={2}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                <Grid item>
                    <Grid item>
                        <img 
                        alt="test" 
                        src={`${process.env.PUBLIC_URL}/pngwing.com.png`}
                        height={200} 
                        width={200}
                        />
                    </Grid>
                    <Grid item>
                        <form className="home__form">
                            <FormControl type="submit" >
                                <Input 
                                    placeholder ="Search . . ." 
                                    value={input} 
                                     onChange={ (event) => setInput(event.target.value) }
                                    className="home__input"
                                    />
                                <IconButton 
                                    className="home__iconButton"
                                    variant="contained" 
                                    color="primary" 
                                    type="submit" 
                                    disabled={!input} 
                                    onClick={handleSearch} 
                                >
                                
                                    <SearchIcon/>
                                </IconButton>
                                <Button variant="contained" color="primary" 
                                onClick={() => ( 
                                    setPath(true)
                                )}
                                >Refresh Page</Button>
                                <Button variant="contained" color="secondary" 
                                onClick={() => ( 
                                    alert('Deleted'), 
                                    deleteAll()
                                )}
                                >Clear</Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>                    
            {(dataExists && <SavedAnime data = {search.savedData}/>) || <Typography variant="h4">Data does not exist</Typography>} 
        </Box>  
        : <Box mt={2}>
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
        <Grid item>
            <Grid item>
                <img 
                alt="test" 
                src={`${process.env.PUBLIC_URL}/pngwing.com.png`}
                height={200} 
                width={200}
                />
            </Grid>
            <Grid item>
                <form className="home__form">
                    <FormControl type="submit" >
                        <Input 
                            placeholder ="Search . . ." 
                            value={input} 
                             onChange={ (event) => setInput(event.target.value) }
                            className="home__input"
                            />
                        <IconButton 
                            className="home__iconButton"
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            disabled={!input} 
                            onClick={handleSearch} 
                        >
                        
                            <SearchIcon/>
                        </IconButton>
                        <Button variant="contained" color="primary" 
                                onClick={() => ( 
                                    setPath(true)
                                )}
                                >Refresh Page</Button>
                        <Button variant="contained" color="secondary" 
                        onClick={() => ( 
                            alert('Deleted'), 
                            deleteAll()
                        )}
                        >Clear</Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    </Grid>
</Grid>                    
    {(dataExists && <SavedAnime data = {search.list}/>) || <Typography variant="h4">Data does not exist</Typography>} 
</Box>  
};

export default Results;