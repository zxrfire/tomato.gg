import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, withRouter } from "react-router-dom";
import './css/search.css';
import backgroundIMG from './assets/background.jpg';
import SearchBar from './material/searchBar';
import FrontGrid from './material/frontGrid';
import image1 from './assets/image1.png';

const APIKey = process.env.REACT_APP_API_KEY;

const background = {
    backgroundImage: `url(${image1})`,
    paddingTop: '200px',
    paddingBottom: '200px',
    width: '100%',
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top'
}

const styles = {
    margin: '0 auto',
    display: 'table',
    padding: '100px',
    maxWidth: '1000px',
}

const frontGrid = {
    margin: '0 auto',
    maxWidth: '95%',
}

const serverConv = {
    'com': 'NA',
    'eu': 'EU',
    'asia': 'ASIA',
    'ru': 'RU',
}

export default withRouter(function Search(props){

    let { path, url } = useRouteMatch();
    const [name, setName] = useState('');
    const [server, setServer] = useState('com');
    const [mode, setMode] = useState('Player');

    let tankStats = {};
    let testId = 'FAIL';

    const [tankNames, setTankNames] = useState('');

    useEffect(() => {
    }, []);

    const searchId = async (e) => {
        e.preventDefault();
        const url = `https://api.worldoftanks.${server}/wot/account/list/?language=en&application_id=${APIKey}&search=${name}`
        try {
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "error" || data.meta.count == 0) { console.log('Invalid username'); }
                else { testId = data.data[0].account_id; }
            })
            .then(() => {
                props.history.push(`/`);
                props.history.push(`/stats/${serverConv[server]}/${name}=${testId}`);
            })

        }catch(err){
            console.error(err);
        }
    };

    return (
        <Router>
            <div style ={background}>
                <div style={styles}>
                    <form onSubmit={searchId}>
                        <SearchBar setName = {setName} setServer = {setServer} server = {server} setMode = {setMode} mode = {mode}/>
                    </form>
                </div >
                <div style ={frontGrid}>
                    <FrontGrid />
                </div>
                <Switch>
                    <Route exact path={path}>
                    </Route>
                </Switch>
            </div>  
            <div className="gradient"></div>
        </Router>
    );
})
