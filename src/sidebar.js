import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./css/sidebar.css";
import TomatoLogo from "./assets/tomato.png";
import AppsIcon from "@material-ui/icons/Apps";
import BarChartIcon from "@material-ui/icons/BarChart";
import InfoIcon from "@material-ui/icons/Info";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import GamesIcon from "@material-ui/icons/Games";
import StarIcon from "@material-ui/icons/Star";
import PersonIcon from "@material-ui/icons/Person";

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import serverConv from "./data/serverConv";
import { ThemeContext } from "./style/theme";

const LINKS = [
    { url: "/", title: "Home", Icon: AppsIcon },
    { url: "/tank-stats", title: "Tank Stats", Icon: BarChartIcon },
    {
        url: "/leaderboards",
        title: "Leaderboards",
        Icon: FormatListNumberedIcon,
    },
    // {url: "/tank-list", title: "Tank List", Icon: BarChartIcon},
    // { url: "/server-stats", title: "Server Stats", Icon: PublicIcon },
    { url: "/moe", title: "MoE Reqs", Icon: StarIcon },
    { url: "/mastery", title: "Mastery Reqs", Icon: StarIcon },
    { url: "/wn8", title: "WN8 Exp. Values", Icon: GamesIcon },
    {
        url: "/stats-reference",
        title: "Stats Reference",
        Icon: LibraryBooksIcon,
    },
    { url: "/about", title: "About", Icon: InfoIcon },
];

const Sidebar = withRouter((props) => {
    const searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];

    const { server } = React.useContext(ThemeContext);
    console.log(server);

    const redirectToPlayerStatsPage = (playerName, playerID) => {
        props.history.push("/");
        props.history.push(
            `/stats/${serverConv[server]}/${playerName}=${playerID}`
        );
    };

    return (
        <div className="sidebar">
            <div className="layer">
                <Link to="/">
                    <div className="logo">
                        <img
                            src={TomatoLogo}
                            alt="logo"
                            style={{
                                height: "110%",
                                width: "auto",
                                display: "flex",
                                alignItems: "center",
                                padding: "0rem",
                            }}
                        />
                    </div>
                </Link>
                <div className="line" />
                <div className="menu">
                    {LINKS.map(({ url, title, Icon }) => (
                        <Link to={url} className="menu-link" key={url}>
                            <Icon className="menu-link-icon" />
                            &nbsp;&nbsp;{title}
                        </Link>
                    ))}
                </div>
                <div className="line" />
                <div className="menu">
                    <Typography variant="h6" className="menu-link">
                        Recent searches
                    </Typography>
                    <List aria-label="recent searches">
                        {searchHistory
                            .slice(0, Math.min(searchHistory.length, 5)) // No more than 5 recent searches
                            .map(({ name, id }) => (
                                <ListItem
                                    key={id}
                                    button
                                    onClick={() =>
                                        redirectToPlayerStatsPage(name, id)
                                    }
                                >
                                    <ListItemIcon>
                                        <PersonIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))}
                    </List>
                </div>
                <div
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: "300",
                        color: "#96a7c7",
                        padding: "15px",
                        bottom: "0px",
                        position: "absolute",
                    }}
                >
                    Tomato.gg is a website created by{" "}
                    <Link
                        style={{ color: "rgb(205, 205, 205)" }}
                        to="/stats/NA/goldflag=1011694618"
                    >
                        Goldflag
                    </Link>{" "}
                    and is not affiliated with Wargaming.net.
                    <br />
                    Zeyu Yang © 2020
                </div>
            </div>
        </div>
    );
});

export default Sidebar;
