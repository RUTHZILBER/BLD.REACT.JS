// בלד+כפתור של פלוס+השירים שלי/כולם
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import React, { Component, useState } from 'react';
import Slide from '@material-ui/core/Slide';
import './UploadFiles.css';
import UploadFiles from './UploadFiles';
import { withRouter } from "react-router-dom";

function mapStateToProps(state) {
  return {
    userId: state.UserId,
    userName: state.UserName,
    firstName: state.FirstName,
    lastName: state.LastName,
    email: state.Email,
    password: state.Password,
    nothingTime: state.NotingTime,
    comment: state.Comment
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
export default withRouter(connect(mapStateToProps)(function MenuAppBar(props) {
  const {dispatch,rows,setRows,alertContent,setAlertContent,errorPlay, setErrorPlay,severity,setSeverity,userName}=props;
  const [open, setOpen] = useState(false);

// שיר
  const [song, setSong] = useState({
    SongId: "",
    SongName: "",
    SongContect: "",
    UserId: "1",
    IsPermit: ""
  });


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  // function investigationSong() {
  //   debugger;

  //   var json4 = JSON.stringify(song);

  //   fetch("http://localhost:62135/api/values/addSong", {

  //     method: "post",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: json4

  //   })

  //     .then(res => res.json())

  //     .then((res) => {
  //       alert("thank you , had finishe!!!!!!");
  //     },
  //       (err) => {
  //         debugger;
  //       })
  // }



  const classes = useStyles();
  const [auth, setAuth] = useState(true);//true=all, false=private
  const [anchorEl, setAnchorEl] =useState(null);

  // בלחיצה על המתג - שנוי המצב מכללי לפרטי
  const handleChange = (event) => {
    setAuth(event.target.checked);
    var cloneAuth="private";
    if(auth==true)
      cloneAuth="private";
    dispatch({type: 'SET_STATE', payload:cloneAuth});//עדכון הסטור בפרטים הנ"ל
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >

      {/* המתג עם האוסף הפרטי או כל השירים */}
      <div className={classes.root} style={{marginTop:"100px",marginBottom:"0px"}}>
        <FormGroup>
        <FormControlLabel
         control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? ' האוסף שלי' : 'כל השירים'}
        />
      </FormGroup>

   {/* כפתור הפלוס */}
        <Fab className="uploadButton" style={{ position: "relative", marginLeft: "8px", marginTop: "30px", top: "40px" }} aria-label="add"> <AddIcon/></Fab>
     <UploadFiles style={{ position: "relative", marginLeft: "80px", marginTop: "300px",marginRight:"80px",top: "100px" }} severity={severity}setSeverity={setSeverity} alertContent={alertContent}setAlertContent={setAlertContent} errorPlay={errorPlay} setErrorPlay={setErrorPlay}></UploadFiles>
        <AppBar position="static">

          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
         {      userName
         }
            </Typography>

            {auth && (
              <div style={{ display: "flex" }}>

                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />

                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >

                </Menu>
              </div>

            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}))