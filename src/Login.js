import React, { useState } from "react";
import bld from './bld.JPG';
import './Login.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ErrorMessage from './ErrorMessage';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import { Redirect, Link } from "react-router-dom";

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

function Copyright() {

  return (
    <Typography className="niceFont" variant="body2" color="textSecondary" align="center">
      תודה לבורא עולם
    </Typography>
  );
}


export default withRouter(connect(mapStateToProps)(function SignInSide(props) {
  
  const { userName, password, dispatch, history } = props;
  const [colorE, setColorE] = useState("blue");
  const [colorP, setColorP] = useState("blue");
  const [errorMessageE, setErrorMessageE] = useState("");
  const [errorMessageP, setErrorMessageP] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const useStyles = makeStyles((theme) => ({
      root: {
          height: '100vh',
      },
      image: {

          backgroundImage: `url(${bld})`, // bld,require('./logo.jpeg') 
          backgroundRepeat: 'no-repeat',
          backgroundColor:
              theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'contain, cover',
          backgroundPosition: 'center',
      },
      paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      },
      avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
      },
      form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
      },
      submit: {
          margin: theme.spacing(3, 0, 2),
      },

      lableE: {
          color: colorE
      },
      borderE: {
          borderWidth: "2px",
          borderColor: colorE + "!important"
      },

      lableP: {
          color: colorP
      },
      borderP: {
          borderWidth: "2px",
          borderColor: colorP + "!important"
      },
  }));
  const classes = useStyles();
  function login() {
    debugger;

    if (isValidatePassword(usr.Password) && isValidateEmail(usr.Email)) {
      checkUser();


    }

    else {
      if (!isValidateEmail(usr.Email)) {
        var newEror = " נא הקש כתובת מייל תקינה";
        setErrorMessageE(newEror);
        setColorE("red");
      }
      if (!isValidatePassword(usr.Password)) {
        var newEror = " הסיסמא פותחת בתו מיוחד: @# ולאחריו לפחות 5 תווים ";
        setErrorMessageP(newEror);
        setColorP("red");
      }
    }
  }
  const [usr, setUsr] = useState({

    Email: "",
    Password: ""
  });
  function handleTyping(event, prop) {
    hideErrorMessage();
    var cloneUser = { ...usr };
    cloneUser[prop] = event.target.value;
    setUsr(cloneUser);
    if (prop == "Email") {
      setColorE("blue");
      setErrorMessageE("");
    }
    if (prop == "Password") {
      setColorP("blue");
      setErrorMessageP("");
    }

  }

  function checkUser() {
    // debugger;
    fetch("http://localhost:62135/api/values/checkUser", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usr)
    })

      .then(res => res.json())
      .then((res) => {
        debugger;
        debugger;
        if (res.Status == true) {//פרטי המשתמש נכונים
          debugger;
          setErrorMsg('');
          res.Data.comment = "private";
          dispatch({ type: 'SET_USER', payload: res.Data });//עדכון הסטור בפרטים הנ"ל
          
          history.push("/Home");
         // alert(res.Data.userId);
        }
        else {//שגיאה באחד הפרטים
          debugger;
          setErrorMsg(res.Message);
          var errorTextTav2 = res.Message.charAt(0);
          if (errorTextTav2 != 'ה') {
            setColorP("red");
            setErrorMessageP(res.Message);
          }
          else {
            setColorE("red");
            setErrorMessageE(res.Message);
          }

          // var newMessage = res.Message;
          // setErrorMessage(newMessage);
          // showErrorMessage();

        }
      },
        (err) => {

        })
  }
  

  function showErrorMessage() {//ביטול הצגת הודעת השגיאה
    setErrorPlay("");

    // //למשך 20 שניות הצגת ההודעה
    // setTimeout(function () {
    //   var clonePlay="";
    //   setErrorPlay(clonePlay);
    // }.bind(this), 20000);
    // alert("hello");
  }
  function hideErrorMessage() {//הצגת הודעת השגיאה
    setErrorPlay("none");//
  }

  function isValidateEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(val)) {
      return true;
    }
    else
      return false;
  }
  //תקינות סיסמא
  function isValidatePassword(p) {
    //use @r
    // א) הסיסמה צריכה להיות מכילה אות רישיות אחת

    // ב) זה צריך להתחיל עם אופי מיוחד או @#a

    // ג) הוא אינו צריך להכיל אותיות תנועה=,u//&& !/[u]/.test(p)

    // ד) זה צריך להיות אלפאנומרי. /[A-Za-z]/.test(p)  &&

    // ה) אורך הסיסמה צריך להיות בין range 8 to 2
    return /^[@#a][A-Za-z0-9]{1,8}$/.test(p);
  }

  const [errorMessage, setErrorMessage] = useState("שגיאה");
  const [errorPlay, setErrorPlay] = useState("none");
  return (
    
    <Grid className="niceFont" style={{min: 0, style: { textAlign: 'right' }}} container component="main" className={classes?.root}>
      <CssBaseline />
      <Grid className="niceFont" item xs={false} sm={4} md={7} className={classes?.image} />
      <Grid className="niceFont" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="niceFont" className={classes?.paper}>
         
          <Typography className="niceFont" component="h1" variant="h5">
            LOGIN
          </Typography>

          <form  style={{textAlign: 'right'}} className={"niceFont "+classes?.form }  noValidate>
            <div className="niceFont" className="ff"><ErrorMessage message={errorMsg}/></div>


            <TextField  className="ff" value={usr.Email} onChange={(e) => { handleTyping(e, "Email") }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={errorMessageE + " : כתובת מייל "}
              name="email"
              autoComplete="email"
              autoFocus
           
              InputProps={{
                classes: {
                  notchedOutline: classes.borderE,
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.lableE,
                },
              }}
              className="ff" />
          <Collapse className="ff"  style={{min: 0, style: { textAlign: 'right' }}} in={false}>
            
              <Alert className="ff"  dir="rtl" style={{display: errorPlay }}  severity="error" >
                {errorMessage}
              </Alert>
            </Collapse>
            <TextField className="ff" onChange={(e) => { handleTyping(e, "Password") }} value={usr.Password}
              inputProps={{
                maxLength: 9,
              }}

           
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.borderP,
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.lableP,
                },
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label={errorMessageP + " :סיסמא "}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel className="niceFont"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button  className="niceFont"
              onClick={login}
              fullWidth
              type="button"
              variant="contained"
              color="primary"
              className={classes?.submit +"ff"}
            >
              הכנס
            </Button>
            <Grid className="niceFont" container>
              <Grid item xs>

              </Grid>

              <Link className="niceFont" to="/NewAccount" variant="body2">

                !עוד אינך רשום? הצטרף כאן
                </Link>

              <Grid item>  </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}))