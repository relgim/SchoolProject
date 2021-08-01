import React, { useContext , useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { FormControl, Input, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Home.scss';


const Home = () => {
    const history = useHistory();
    const [input , setInput ] = useState('');
    const search = useContext(SearchContext);
    
    const handleSearch = (event) => {
        event.preventDefault();
        search.search(input).then((data) => {
            console.log(data);
            search.setData(data.results);
            localStorage.setItem('myData' , JSON.stringify(data.results));
            history.push('/results');
        });
    }

    return <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
        <Grid item>
            <Grid item>
                <img 
                alt="test" 
                src={`${process.env.PUBLIC_URL}/logo2.png`}
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
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    </Grid>;
};

export default Home;