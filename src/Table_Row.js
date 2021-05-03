//רשומות הטבלה
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import './Table_Row.css';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function downloadSong(e, row, text) {

    //בלחיצה על הורדה
    //והורדת כל מילות השיר לתוך קובץ

    {
        const element = document.createElement("a");

        var songi = "\n";
        for (var i = 0; i < row.neatTags.length; i++) {
            songi = songi + row.neatTags[i] + "\n";
        }

        element.href = URL.createObjectURL(new Blob([songi],
            { type: 'text/plain;charset=utf-8' }));

        element.download = row.songName + ".txt";
        document.body.appendChild(element);
        element.click();
        if (text != "") {

            var str = text;
            var array = str.split(" ", 2);

            if (array.length > 1 && array.length < 11) {
                ////

                var json4 = JSON.stringify({ Text: text, SongId: row.songId });
                fetch("http://localhost:62135/api/values/improveTags", {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: json4
                })
                    .then(res => res.json())

                    .then((res) => {
                        if (res.Status == true) {
                          //  alert("entered");
                            debugger;

                            var arr = res.Data;
                            if (res.Status == true) {
                            }
                        }

                        else
                        {
                              // alert(" not succeed to enter ");
                        }
                       
                    },
                        (err) => {
                          //  alert(" שגיאה ");
                        })

                ////
               // alert(row.songId);

                debugger;
            //    alert("hay1");
            }

        }

    }
    ///////////////////////////

}

function mapStateToProps(state) {
    return {
        userId: state.UserId,
        comment: state.Comment,
        songList: state.SongList
    }
}


export default connect(mapStateToProps)(function Table_Row(props) {


    const { userId, row, text, setText, songList, dispatch, setSeverity, severity, setAlertContent, alertContent, errorPlay, setErrorPlay } = props;

    const [sizeIcon, setSizeIcon] = useState('large');//גודל איקון ההורדה
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    function showError() {

        //למשך 10 שניות הצגת ההודעה
        setTimeout(function () {
            setErrorPlay("none");

        }.bind(this), 5000);

        setErrorPlay("");
    }
    function deleteSong(e, id) {
        var songIdDeleting = String(id);
        fetch("http://localhost:62135/api/Song/" + songIdDeleting, {
            method: "delete",
            headers: { 'Content-Type': 'application/json' },

        })

            .then(res => res.json())

            .then((res) => {
                debugger;
                if (res.Status == true) {

                   // alert(res.Message);

                    var theOtherSongs = songList.filter(i => i.songId != id);
                    dispatch({ type: 'SET_SONG_LIST', payload: theOtherSongs });

                    setSeverity("success");
                    setAlertContent(res.Message);
                    showError()

                }

                else {
                 //   alert(res.Message);

                    setSeverity("error");
                    setAlertContent(res.Message);
                    showError()
                }

            },
                (err) => {



                    setSeverity("error");
                    setAlertContent("שגיאה");
                    showError()
                })
    }


    return (
        <React.Fragment>

            <TableRow  className="niceFont" className={classes.root} id={"row_id_" + row.songId}>
                <TableCell  className="niceFont">


                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{/*אייקון פתיחת רשימת התגיות*/}
                    </IconButton>

                    {/* IconButton == מעטפת לכל איקון שיהיה מראה לחוץ */}
                    <IconButton onClick={(e) => {

                        //בלחיצה על הורדה
                        //והורדת כל מילות השיר לתוך קובץ

                        {
                            const element = document.createElement("a");

                            var songi = "\n";
                            for (var i = 0; i < row.neatTags.length; i++) {
                                songi = songi + row.neatTags[i] + "\n";
                            }

                            element.href = URL.createObjectURL(new Blob([songi],
                                { type: 'text/plain;charset=utf-8' }));

                            element.download = row.songName + ".txt";
                            document.body.appendChild(element);
                            element.click();
                            if (text != "") {

                                var str = text;
                                var array = str.split(" ", 2);
                                // כאשר מתבצעת הורדת השיר, יש לשפר את התגית
                                if (array.length > 1 && array.length < 11) {

                                    var json4 = JSON.stringify({ Text: text, SongId: row.songId });
                                    fetch("http://localhost:62135/api/values/improveTags", {
                                        method: "post",
                                        headers: { 'Content-Type': 'application/json' },
                                        body: json4
                                    })
                                        .then(res => res.json())

                                        .then((res) => {
                                            if (res.Status == true) {

                                            }

                                            else {

                                            }
                                        },
                                            (err) => {
                                           //     alert(" שגיאה ");
                                            })

                                   // alert(row.songId);
                                }

                            }

                        }

                    }}>
                        {/* איקון ההורדה */}
                        {<GetAppRoundedIcon id={'song_' + row.songId} fontSize={sizeIcon} >
                        </GetAppRoundedIcon>}</IconButton>

                    {row.userId == userId && (<IconButton>

                        <DeleteForeverIcon onDoubleClick={(e) => {
                            deleteSong(e, row.songId);// מחיקת שיר בלחיצה על הכפתור פעמיים, רק אם מורשה
                        }}></DeleteForeverIcon>    {/*אייקון מחיקה*/}
                    </IconButton>)}

                </TableCell>
                {/* מלוי הטבלה, כל עמודה */}

                <TableCell className="niceFont" align="right">{row.neatTags.length}</TableCell>
                <TableCell className="niceFont"  align="right" style={{ fontFamily: 'M PLUS 1p , sans-serif' }} >{row.tag3}</TableCell>
                <TableCell className="niceFont"  align="right">{row.tag2}</TableCell>

                <TableCell className="niceFont"  align="right">{row.tag1}</TableCell>

                <TableCell className="niceFont"  align="right">{row.isPermit == true ?<AssignmentTurnedInIcon/> :<EventBusyIcon/>}</TableCell>

                <TableCell className="niceFont"  align="right">{row.userName}</TableCell>
                <TableCell className="niceFont"  component="th" scope="row">{row.songName}</TableCell>


                <TableCell className="niceFont"  style={{ display: "none" }} align="right">{row.songId}</TableCell>

                {/*style={{ font-family='Varela Round', sans-serif}}לתוך שורות הטבלה לפי עמודות DB השמת הערכים הדינאמיים מתוך ה*/}

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div" style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row-reverse", flexWrap: "wrap" }}>
                                {/* מילות השיר כתגיות בתוך התיבה הנפתחת שבטבלה */}
                                {Object.values(row.neatTags).map((a, index) => (<Chip key={index} style={{ margin: "2px" }} label={a} clickable color="primary" color="primary" size="small" lable="ruth" avatar={<Avatar>  <MusicNoteIcon></MusicNoteIcon></Avatar>} />))}
                            </Typography>

                            <Table size="small" aria-label="purchases">

                                <TableBody>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
})