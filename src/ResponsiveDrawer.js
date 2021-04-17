//אני הדף המכיל את כל הקומפוננטות ששיכות לדף הראשי, ואב להן. בבסיסי יש את:  הבר השמאלי+השורה הראשונה
import React, { useState } from 'react';
//import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
//import * as React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Alert from '@material-ui/lab/Alert';
//import ImageList from '@material-ui/core/ImageList';
//import GridList from '@material-ui/core/GridList';
//import GridListTile from '@material-ui/core/GridListTile';
//import tileData from './tileData';
import PublicIcon from '@material-ui/icons/Public';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AppsIcon from '@material-ui/icons/Apps';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckboxesTags from './CheckboxesTags.js';
import SearchTextBox from './SearchTextBox.js';
import CollapsibleTable from './CollapsibleTable.js';
import MenuAppBar from './MenuAppBar';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import bld1 from './bld1.JPG';
import bld2 from './bld2.jpg';
import bld3 from './bld3.jpg';
import bld4 from './bld4.jpg';
import bld5 from './bld5.jpg';
import bld6 from './bld6.jpg';
import bld7 from './bld7.JPG';
import bld8 from './bld8.JPG';
import bld9 from './bld9.png';
import bld10 from './bld10.PNG';
import bld11 from './bld11.png';


const useStylesAboutUs = makeStyles({
  root: {
    width: 500,
    height: 450,
  },
});

const itemData = [
  {
    img: bld1,
    title: 'Breakfast',
  },
  {
    img: bld2,
    title: 'Burger',
  },
  {
    img: bld3,
    title: 'Camera',
  },
  {
    img: bld4,
    title: 'Coffee',
  },
  {
    img: bld5,
    title: 'Hats',
  },
  {
    img: bld6,
    title: 'Honey',
  },
  {
    img: bld7,
    title: 'Basketball',
  },
  {
    img: bld8,
    title: 'Fern',
  },
  {
    img: bld9,
    title: 'Mushrooms',
  },
  {
    img: bld10,
    title: 'Tomato basil',
  },
  {
    img: bld11,
    title: 'Sea star',
  },
  {
    img: bld1,
    title: 'Sea star',
  },
  {
    img: bld2,
    title: 'Sea star',
  },

];

const useStylesDialogInsruction = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const useStylesAlert = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const drawerWidth = 240;

const useStylesPicture = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default withRouter(connect(mapStateToProps)(function ResponsiveDrawer(props) {
  const classesPicture = useStylesPicture();
  const classesDI = useStylesDialogInsruction();

  // פתיחת דיאלוג של הוראות
  const [openDI, setOpenDI] = React.useState(false);

  const handleClickOpenDI = () => {
    setOpenDI(true);

  };

  const handleCloseDI = () => {
    setOpenDI(false);
  };
  // פתיחת דיאלוג הסמלים
  const [openDI2, setOpenDI2] = React.useState(false);

  const handleClickOpenDI2 = () => {
    setOpenDI2(true);

  };

  const handleCloseDI2 = () => {
    setOpenDI2(false);
  };
  //פתיחת דיאלוג עלינו...  
  const classesDI3 = useStylesDialogInsruction();
  const [openDI3, setOpenDI3] = React.useState(false);

  const handleClickOpenDI3 = () => {
    setOpenDI3(true);
  };

  const handleCloseDI3 = () => {
    setOpenDI3(false);
  };

  const { history, dispatch, userId } = props;
  function updateYourAccount(event) {

    history.push("/UpdateAccount");
    event.preventDefault();
  }
  const classesAboutUs = useStylesAboutUs();


  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [dis, setDis] = useState("none");
  const [text, setText] = useState("");
  const [errorPlay, setErrorPlay] = useState("none");//האם להציג את ההתראה
  const [severity, setSeverity] = useState("error");//info, warning, success,error//סוג ההתראה: שגיאה. הצלחה. אזהרה. מידע
  const [alertContent, setAlertContent] = useState(" העלאת השיר בתהליך ");



  const drawer = (
    <div>

      {/*  first, הוראות שמוש.*/}
      <div>

        <Dialog fullScreen open={openDI} onClose={handleCloseDI} TransitionComponent={Transition}>
          <AppBar className={classesDI.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseDI} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classesDI.title}>
                הוראות שימוש
            </Typography>
              <Button autoFocus color="inherit" onClick={handleCloseDI}>
                בחזרה לאתר
            </Button>
            </Toolbar>
          </AppBar>


          הוראות שימוש :
          בלחיצה על כפתור הפלוס, ניתן להעלות שיר.
          ניתן לעדכן את שמך. שים לב לבחור סיסמא תקינה, כתובת מייל ושם משתמש שלא קימים!
          ניתן לאתר שיר ע''פ תגיות,
          ואם לא מוצאים, לפי סימן השאלה. בהצלחה'
        </Dialog>
      </div>


      {/*  second, סמלים של בלד*/}
      <div>

        <Dialog fullScreen open={openDI2} onClose={handleCloseDI2} TransitionComponent={Transition}>
          <AppBar className={classesDI.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseDI2} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classesDI.title}>
                סמלים שלנו
            </Typography>
              <Button autoFocus color="inherit" onClick={handleCloseDI2}>
                בחזרה לאתר
            </Button>
            </Toolbar>
          </AppBar>

          <ImageList sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", row: "row", flexWrap: "wrap" }} cols={3}>
            rowHeight={121}     {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                style={{ maxWidth: "400px", maxHeight: "200px", backgroundSize: "cover contain", background: "no-repet" }}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format 1x,
            ${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}

              />
            </ImageListItem>
          ))}
          </ImageList>

        </Dialog>
      </div>


      {/*  third, instruction.*/}
      <div>

        <Dialog style={{ display: "flex", justifyContent: "center", alignItems: "stretch" }} fullScreen open={openDI3} onClose={handleCloseDI3} TransitionComponent={Transition}>
          <AppBar className={classesDI.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseDI3} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classesDI3.title}>
                עלינו
            </Typography>
              <Button autoFocus color="inherit" onClick={handleCloseDI3}>
                סימתי
            </Button>
            </Toolbar>
          </AppBar>



          


        </Dialog>
      </div>



      <div className={classes.toolbar} />
      <Divider />


      <SearchTextBox dis={dis} setDis={setDis} text={text} setText={setText} errorPlay={errorPlay} setErrorPlay={setErrorPlay} severity={severity} setSeverity={setSeverity}
        alertContent={alertContent} setAlertContent={setAlertContent}></SearchTextBox>
      {/* חיפוש משופר */}
      <List >

        <ListItem onClick={updateYourAccount} button key="update">
          <ListItemIcon ><FingerprintIcon />
          </ListItemIcon>
          <ListItemText primary="עדכון הפרטים האישיים שלי" />
        </ListItem>

        <ListItem onClick={handleClickOpenDI} title="aa" button key="instructons">
          <ListItemIcon > <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="הוראות שימוש" />
        </ListItem>



      </List>
      <ListItem onClick={handleClickOpenDI2} title="aa" button key="icons" >
        <ListItemIcon > <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="סמלים שלנו" />
      </ListItem>

      <ListItem onClick={handleClickOpenDI3} button title="aa"  >
        <ListItemIcon > <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="עלינו" />
      </ListItem>

      <Divider />
      <List>

      </List>

      <MenuAppBar style={{ marginTop: "200px" }} severity={severity} setSeverity={setSeverity} alertContent={alertContent} setAlertContent={setAlertContent} errorPlay={errorPlay} setErrorPlay={setErrorPlay}></MenuAppBar>
      {/* הכנסת השיר   2 משתמשים  */}

    </div>
  );

  if (!userId || userId.length == 0)
    return <Redirect to={{ pathname: "/Login", state: { message: " תקלה בקליטת הנתונים. התחבר שנית " } }} />
  return (
    <div className={classes.root} style={{ dispaly: "flex", justifyContent: "space-around", marginLeft: "300px", marginTop: "-100px" }}>

      <main className={classes.content} style={{ marginTop: "300px" }}>

        <Alert style={{ position: "fixed", zIndex: "5000000", display: errorPlay, top: "20px", width: "400px", heigh: "20px" }} severity={severity} dir="rtl">
          {alertContent}
        </Alert>

        <div className={classes.toolbar} />

        <CollapsibleTable severity={severity} setSeverity={setSeverity} alertContent={alertContent} setAlertContent={setAlertContent} text={text} setText={setText} errorPlay={errorPlay} setErrorPlay={setErrorPlay}>
        </CollapsibleTable>
        <div>

        </div>

      </main>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {/* השורה הראשונה ובתוכה תיבת הטקסט של התגיות וכפתור ההורדה הכללי */}
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
          color="white"
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{width:"900px", marginTop: "50px", marginLeft: "270px", marginRight: "10px" }} variant="inherit" >

            {/*      תיבת הטקסט ובתוכה התגיות*/}
            <CheckboxesTags severity={severity} setSeverity={setSeverity} alertContent={alertContent} setAlertContent={setAlertContent} text={text} setText={setText} errorPlay={errorPlay} setErrorPlay={setErrorPlay}></CheckboxesTags>
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">

        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>

        </Hidden>
      </nav>

    </div>
  );

}))