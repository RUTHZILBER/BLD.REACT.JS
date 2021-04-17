// תיבת הטקסט של האיתור המשופר
import { React, useState, Component, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from './ListItems.js';
import { connect } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function mapStateToProps(state) {
    return {
        userId: state.UserId,
        comment: state.Comment

    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 237,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
export default connect(mapStateToProps)(function SearchTextBox(props) {
    const [vis, setVis] = useState("none");
    const [visx, setVisx] = useState("");
    const { rows, setRows, dis, setDis, text, setText, userId, errorPlay, setErrorPlay, comment, severity, setSeverity, alertContent, setAlertContent, } = props;

    const [searchesArray, setSearchesArray] = useState([]);
    function showError() {

        //למשך 10 שניות הצגת ההודעה
        setTimeout(function () {
            setErrorPlay("none");

        }.bind(this), 5000);

        setErrorPlay("");
    }

    //פונקציה לשליחת תוכן תיבת הטקסט, וקבלת רשימת השירים שנמצאו
    function getSearches() {
        var json4 = JSON.stringify({ State: comment, Text: text, usrId: userId });// זה 
        fetch("http://localhost:62135/api/values/getMatchSongsList", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: json4
        })
            .then(res => res.json())

            .then((res) => {
                if (res.Status == true) {
                    // alert(res.Message);
                    debugger;

                    setSeverity("info");
                    //info, warning, success,error
                    setAlertContent(res.Message);

                    var arr = res.Data;
                    var cloneArray = [...searchesArray];
                    cloneArray = cloneArray.concat(arr);
                    setSearchesArray(cloneArray);
                    setDis("");
                    showError();


                }

                else {
                    setSeverity("error");
                    //info, warning, success,error
                    setAlertContent(res.Message);
                    showError();

                }

            },
                (err) => {
                    {
                        setSeverity("error");
                        //info, warning, success,error
                        setAlertContent("שגיאה");
                        showError()
                    }
                })
        setDis("");

    }
    const classes = useStyles();


    function handleText(e) {
        var cloneText = text;
        cloneText = e.target.value;
        debugger;
        setText(cloneText);
    }
    return (
        <>


            <Paper component="form" className={classes.root}>

                <IconButton onClick={() => {
                    if (dis == "") {
                        setDis("none");
                        setVis("");
                        setVisx("none")
                    }

                    else {
                        setDis("");
                        setVis("none");
                        setVisx("")
                    }


                }} className={classes.iconButton} aria-label="menu">

                    {/* העין העצומה  /> */}
                    < VisibilityOffIcon style={{ display: visx }} display={visx} />
                    {/* העין הפקוחה */}
                    <VisibilityIcon style={{ display: vis }} />
                </IconButton>
                {/* תיבת הטקסט ובתוכה מילות השיר לאיתור */}
                <InputBase

                    value={text}
                    onChange={(e) => handleText(e)}
                    className={classes.input}
                    placeholder=" איתור "
                    inputProps={{ 'aria-label': 'search google maps' }}
                    dir="rtl"
                />


                <IconButton onClick={getSearches} className={classes.iconButton} aria-label="search">
                    {/* איקון החיפוש */}
                    <SearchIcon />

                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />

                {/* רשימת  השירים */}
                <ListItem searchesArray={searchesArray} setSearchesArray={setSearchesArray} dis={dis} setDis={setDis} rows={rows} setRows={setRows} style={{ display: "absolute", top: "300px" }}></ListItem>
            </Paper>
        </>
    );
})