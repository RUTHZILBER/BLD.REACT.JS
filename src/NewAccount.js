import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import bld from './bld.JPG';

//at this page few shortcuts:
//firstName=f, lastName=l, userName=u, email=e, password=p, configrmPassword=c

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      תודה לבורא עולם
    </Typography>
  );
}
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


export default withRouter(connect(mapStateToProps)(function NewAccount(props) {
  const { userName, dispatch, history } = props;
  const [warning, setWarning] = useState("");
  const [errorPlay, setErrorPlay] = useState("none");
  const [thisColor, setThisColor] = useState("yellow");//blue / red
  // צבע הריבוע של תיבת המלוי
  const [colorL, setColorL] = useState("blue");
  const [colorF, setColorF] = useState("blue");
  const [colorU, setColorU] = useState("blue");
  const [colorE, setColorE] = useState("blue");
  const [colorP, setColorP] = useState("blue");
  const [colorC, setColorC] = useState("blue");

  const useStyles = makeStyles((theme) => ({
    image: {
      backgroundImage: `url(${bld})`, // bld,require('./logo.jpeg') 
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'contain, cover',
      backgroundPosition: 'center',
    },
    lableL: {
      color: colorL
    },
    borderL: {
      borderWidth: "2px",
      borderColor: colorL + "!important"
    },

    lableF: {
      color: colorF
    },
    borderF: {
      borderWidth: "2px",
      borderColor: colorF + "!important"
    },

    lableU: {
      color: colorU
    },
    borderU: {
      borderWidth: "2px",
      borderColor: colorU + "!important"
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

    lableC: {
      color: colorC
    },
    borderC: {
      borderWidth: "2px",
      borderColor: colorC + "!important"
    },

    cssLabel: {
      color: thisColor
    },
    notchedOutline: {
      borderWidth: "2px",
      borderColor: thisColor + "!important"
    },
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  //הוספת הלקוח
  function addUser() {
    fetch("http://localhost:62135/api/values/addUsr?", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usr)
    })

      .then(res => res.json())
      .then((res) => {
        if (res.Status == true) {
          console.log(res.Message);
          res.Data.comment = "private";
          dispatch({ type: 'SET_USER', payload: res.Data });//עדכון הסטור בפרטי הלקוח המצטרף
          history.push("/Home");
        }
        else {
          var errorProp = res.Message;
          if (errorProp.charAt(0) == ' ') {
            setWarning(res.Message);
            setErrorPlay("");
          }
          else {

            var errorArray = res.Message.match(/\w+|\s+|[^\s\w]+/g);
            for (var k = 0; k < errorArray.length; k++) {
              if (errorArray[k].length < 3)
                continue;
              else {
                var tavProp = errorArray[k].charAt(0);//F or L or U or E or P ///
                var secondTavProp = errorArray[k].charAt(1);// L or V = lengh or validate.
                switch (tavProp) {//זהוי מהות השגיאה
                  //סימון השגיאה מהשרת כך: התו הראשון הינו סימון השדה (אף=פירסט ניים, שם פרטי)ואילו התו השני והשלישי, סימון אם שגית
                  //וולידישן (וי) או שגיאת אורך (אל) אם הכל בסדר, יסומן באיקסים
                  case "F":
                    {
                      if (secondTavProp == 'L') {
                        setColorF("red");
                        var cloneError = [...errorMessageF];
                        cloneError += " עד 15 תווים  "
                        setErrorMessageF(cloneError);

                      }
                      if (secondTavProp == 'V') {
                        setColorF("red");
                        var cloneError = [...errorMessageF];
                        cloneError +=   " באנגלית, עברית וגרש ";
                        setErrorMessageF(cloneError);
                      
                      }

                      break;
                    }

                  case "L":
                    {
                      if (secondTavProp == 'L') {
                        setColorL("red");
                        var cloneError = [...errorMessageL];
                        cloneError += " עד 15 תווים  "
                        setErrorMessageL(cloneError);

                      }
                      if (secondTavProp == 'V') {
                        setColorL("red");
                        var cloneError = [...errorMessageL];
                        cloneError +=   " באנגלית, עברית וגרש ";
                        setErrorMessageL(cloneError);
                      
                      }
                      break;
                    }

                  case "U":
                    {
                      if (secondTavProp == 'L') {
                        setColorU("red");
                        var cloneError = [...errorMessageU];
                        cloneError += " עד 15 תווים  "
                        setErrorMessageU(cloneError);

                      }
                      if (secondTavProp == 'V') {
                        setColorU("red");
                        var cloneError = [...errorMessageU];
                        cloneError +=   " באנגלית, עברית וגרש ";
                        setErrorMessageU(cloneError);
                      
                      }


                      break;
                    }

                  case "E":
                    {
                      setColorE("red");
                      setErrorMessageE(" יש להקיש דוא''ל תקין ");
                      break;
                    }

                  case "P":
                    {
                      setColorP("red");
                      setErrorMessageP(" יש לבחור סיסמא המתחילה בתו מיוחד @# ואחריו לפחות 6 תווים ");
                      break;
                    }

                  case "U":
                    setColorC("blue");


                  default:
                    break;
                }
              }
            }
          }
        }
      },
        (err) => {
          debugger;

        }
      )
  }

  // מהות השגיאה שתופיע במסגרת פרטי הלקוח- הטקסט שיופיע
  const [errorMessageF, setErrorMessageF] = useState("");
  const [errorMessageL, setErrorMessageL] = useState("");
  const [errorMessageU, setErrorMessageU] = useState("");
  const [errorMessageE, setErrorMessageE] = useState("");
  const [errorMessageP, setErrorMessageP] = useState("");
  const [errorMessageC, setErrorMessageC] = useState("");


  // בדיקת התאמת הפרטים ואם 
  function functionCreateYourAccount() {
    // תקינות לקוח, האם להעביר לפונקציה המכניסה אותו ללקוחות או לתת התראות שלא תקין
    {

      if (password_ == usr.Password && isValidatePassword(usr.Password) && isValidateEmail(usr.Email) &&
        isValidateEnglishHebrewGeresh(usr.FirstName) && isValidateEnglishHebrewGeresh(usr.LastName)
        && isValidateEnglishHebrewGeresh(usr.UserName)) {
        addUser();

      }

      else {
        debugger;
        if (!isValidateEnglishHebrewGeresh(usr.LastName)) {
          var newEror = " יש להשתמש באותיות עברית/אנגלית וגרש בלבד ";
          setErrorMessageL(newEror);
          setColorL("red");
        }
        if (!isValidateEnglishHebrewGeresh(usr.FirstName)) {
          var newEror = " יש להשתמש באותיות עברית/אנגלית וגרש בלבד ";
          setErrorMessageF(newEror);
          setColorF("red");
        }

        if (!isValidateEnglishHebrewGeresh(usr.UserName)) {
          var newEror = " יש להשתמש באותיות עברית/אנגלית וגרש בלבד ";
          setErrorMessageU(newEror);
          setColorU("red");
        }
        if (!isValidateEmail(usr.Email)) {
          var newEror = " יש להקיש כתובת מייל תקינה";
          setErrorMessageE(newEror);
          setColorE("red");
        }
        if (!isValidatePassword(usr.Password)) {
          var newEror = " יש לבחור סיסמא הפותחת בתו מיוחד: @# ולאחריו לפחות 5 תווים ";
          setErrorMessageP(newEror);
          setColorP("red");
        }
        if (password_ != usr.Password) {
          var newEror = " סיסמא לא תואמת, בדוק את בחירתך  ";
          setErrorMessageC(newEror);
          setColorC("red");
        }
      }
    }
  }

  //הלקוח
  const [usr, setUsr] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: ""
  });
  const [password_, setPassword_] = useState("");
  //שנוי השדות, במקרה של שדות אינפוט
  function handleTyping(event, prop) {
    var cloneUsr = { ...usr };
    cloneUsr[prop] = event.target.value;
    setUsr(cloneUsr);
    setWarning("");
    setErrorPlay("none");
    switch (prop) {

      case "FirstName":
        {
          setColorF("blue");
          setErrorMessageF("");
          break;
        }

      case "LastName":
        {
          setColorL("blue");
          setErrorMessageL("");
          break;
        }

      case "UserName":
        {
          setColorU("blue");
          setErrorMessageU("");
          break;
        }

        case "Email":
          {
            setColorE("blue");
            setErrorMessageE("");
            break;
          }
  
        case "Password":
          {
            setColorP("blue");
            setErrorMessageP("");
            break;
          }
  
        case "UserName":
          {
            setErrorMessageU("");
            setColorU("blue");
            break;
          }


      default:
        break;
    }
  }


  //   //תקינות תעודת זהות, לא לפרויקט
  function isValidateateId(str) {
    //INPUT VALIDATION
    // Just in case -> convert to string
    var IDnum = String(str);

    // Validate correct input
    if ((IDnum.length > 9) || (IDnum.length < 5))
      return false;
    if (isNaN(IDnum))
      return false;

    // The number is too short - add leading 0000
    if (IDnum.length < 9) {
      while (IDnum.length < 9) {
        IDnum = '0' + IDnum;
      }
    }

    // CHECK THE ID NUMBER
    var mone = 0, incNum;
    for (var i = 0; i < 9; i++) {
      incNum = Number(IDnum.charAt(i));
      incNum *= (i % 2) + 1;
      if (incNum > 9)
        incNum -= 9;
      mone += incNum;
    }
    if (mone % 10 == 0)
      return true;
    else
      return false;
  }
  //תקינות מייל
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

    // ג) הוא אינו צריך להכיל אותיות תנועה=,u

    // ד) זה צריך להיות אלפאנומרי.

    // ה) אורך הסיסמה צריך להיות בין range 8 to 2
    return /[A-Za-z]/.test(p) && !/[u]/.test(p) && /^[@#a][A-Za-z0-9]{1,7}$/.test(p);
  }
  //תקינות עברית
  function isValidateHebrew(name) {
    //hebrew+' tav...
    var isValidate = true;
    if (/^[\u05D0-\u05EA']+$/i.test(name))
      return true;
    else
      return false;

  }


  //תקינות עברית אנגלית גרש
  function isValidateEnglishHebrewGeresh(name) {
    var isValidate = true;
    if (/^[a-z\u05D0-\u05EA']+$/i.test(name))
      return true;
    else
      return false;

  }


  //האם כל הנתונים הוכנסו
  function enableSubmit() {
    var flagReady = true;
    Object.keys(usr).forEach(function (key) {
      flagReady = usr[key] != "";
    })
    if (flagReady)
      return true;
    else
      return false;
  }
  //   //הסיסמא
  function confirmation(e) {
    var clonePassword = e.target.value;
    setPassword_(clonePassword);
    setColorC("blue");
    setErrorMessageC("");
  }

  return (
    <div>
      <CssBaseline />

      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
           : פרטי משתמש חדש
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>

        <Paper className={classes.paper} style={{ display: "flex", justifyContent: "center" }}>

          <Typography component="h1" variant="h4" align="LEFT">
            --------------
          </Typography>

          <Grid item container xs={28} sm={4} md={5} spacing={1} component={Paper} elevation={6} square>

            <div style={{ dispay: "Grid" }}>
              <div>
                <Typography variant="h6" gutterBottom>
                  :הפרטים שלך הם
               </Typography>

                <Grid container spacing={3}>
                  {/* שם פרטי */}
                  <Grid item xs={12} sm={6} >
                    <TextField onChange={(e) => { debugger; handleTyping(e, "FirstName"); }}
                      required
                      variant="outlined"
                      id="firstName"
                      name="firstName"
                      label={" שם פרטי :" + errorMessageF}
                      fullWidth
                      autoComplete="given-name"
                      InputProps={{
                        classes: {
                          notchedOutline: classes.borderF,
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.lableF,
                        },
                      }}
                      inputProps={{
                        maxLength: 15,
                      }}
                    />
                  </Grid>
                  {/* שם משפחה */}
                  <Grid item xs={12} sm={6} onChange={(e) => { handleTyping(e, "LastName") }}>
                    <TextField
                      required
                      variant="outlined"
                      id="lastName"
                      name="lastName"
                      label={" שם משפחה :" + errorMessageL}
                      fullWidth
                      autoComplete="family-name"
                      InputProps={{
                        classes: {
                          notchedOutline: classes.borderL,
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.lableL,
                        },
                      }}

                      inputProps={{
                        maxLength: 15,
                      }}
                    />
                  </Grid>
                  {/* שם משתמש */}
                  <Grid item xs={12} onChange={(e) => { handleTyping(e, "UserName") }}>

                    <TextField
                      required
                      id="userName"
                      name="userName"
                      variant="outlined"


                      label={" שם משתמש :" + errorMessageU}
                      fullWidth
                      autoComplete="shipping address-line1"
                      InputProps={{
                        classes: {
                          notchedOutline: classes.borderU,
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.lableU,
                        },
                      }}
                      inputProps={{
                        maxLength: 40,
                      }}
                    />
                  </Grid>
                  {/* כתובת דואל */}
                  <Grid item xs={12} onChange={(e) => { handleTyping(e, "Email") }}>
                    <TextField
                      id="address2"
                      variant="outlined"
                      required
                      name="address2"
                      label={" כתובת דוא''ל :" + errorMessageE}
                      fullWidth
                      autoComplete="shipping address-line2"
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
                    />
                  </Grid>
                  {/* אימות סיסמא */}
                  <Grid item xs={12} sm={6}onChange={(e) => { confirmation(e) }}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      variant="outlined"
                      label={" אמת סיסמא :" + errorMessageC}
                      fullWidth
                      autoComplete="shipping country"

                      inputProps={{
                        maxLength: 9,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.borderC,
                        }
                      }}


                      InputLabelProps={{
                        classes: {
                          root: classes.lableC,
                        },
                      }}
                    />
                  </Grid>
                  {/* סיסמא */}
                  <Grid item xs={12} sm={6}  onChange={(e) => { handleTyping(e, "Password") }} >
                    <TextField
                      required
                      inputProps={{
                        maxLength: 9,
                      }}
                      id="zip"
                      variant="outlined"
                      name="zip"
                      label={" סיסמא :" + errorMessageP}
                      fullWidth
                      autoComplete="shipping postal-code"
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
                    />
                  </Grid>
                  {/* אישור קריאת תנאי האתר */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                      label="אני מאשר כי קראתי את תנאי האתר והנני מאשרם"
                    />
                    <Alert severity="warning" style={{ display: errorPlay }} dir="rtl">
                      {warning}
                    </Alert>
                  </Grid>

                </Grid>

              </div>
              <div>

                <div className={classes.buttons}>
                  <Button
                    onClick={(e) => { functionCreateYourAccount() }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    ?אפשר להתחיל
                </Button>
                </div>
              </div>

            </div>
          </Grid>

        </Paper>

        <Copyright />
      </main>
    </div>
  );
}))