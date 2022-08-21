import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#white",
        zIndex: 100,
    }
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if(value === 0) navigate("/")
    else if(value === 1) navigate("/movies")
    else if(value === 2) navigate("/series")
    else if(value === 3) navigate("/search")
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction style={{color: "#293462"}} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{color: "#293462"}} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction style={{color: "#293462"}} label="TV Series" icon={<PersonalVideoIcon />} />
      <BottomNavigationAction style={{color: "#293462"}} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
