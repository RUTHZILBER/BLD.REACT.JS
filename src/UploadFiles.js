//הוספת שיר חדש למאגר למאגר
import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './UploadFiles.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { createBrowserHistory } from "history";


function mapStateToProps(state) {
  return {
    userId: state.UserId,
    userName: state.UserName,
    firstName: state.FirstName,
    lastName: state.LastName,
    email: state.Email,
    password: state.Password,
    nothingTime: state.NotingTime,
    comment: state.Comment,
    songList: state.SongList
  };
}
export default withRouter(connect(mapStateToProps)(function UploadFiles(props) {
  const { history, alertContent, dispatch, setAlertContent, errorPlay, setErrorPlay, severity, setSeverity, songList } = props;
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const classes = useStyles();
  const [isDisable, setIsDisable] = useState(false);

  const [songsArray, setSongsArray] = useState([
    {
      SongId: "",
      SongName: "",
      SongContect: "",
      UserId: "",
      IsPermit: "true"
    },
    {
      SongId: "",
      SongName: "",
      SongContect: "",
      UserId: "1",
      IsPermit: ""
    }
  ]);



  const [open1, setOpen1] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleToggle1 = () => {
    setOpen1(!open1);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = useState(false);

  const [isPermition, setIsPermition] = useState(false);//האם השירים שהוא מעלה כרגע מורשים או לא

  async function updateSongArray(e, item) {
    var cloneArray = [...songsArray];
    cloneArray = cloneArray.concat(e.target.result);
    setSongsArray(cloneArray);
  }

  const [event1, setEvent1] = useState(null);

  const handleClickOpen = (e) => {
    setOpen(true);
    setIndex("200");
    setEvent1(e);
  };

  const handleClose = () => {
    setIndex("-20000");
    setOpen(false);
  };

  function insertSelectedSongsAndInvestigration(status) {
    debugger;

    handleToggle1();
    var files1 = event1.target.files;
    var listOfSongConcat = [];
    const files = files1;
    var numberOfFiles = files.length;
    var p = 0;
    Object.keys(files).forEach(i => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event1) => {

        //  alert(isDisable);
        updateSongArray(event1);
        var obj = {};
        obj["SongContect"] = event1.target.result;
        obj["UserId"] = window.Store.getState().UserId;
        obj["IsPermit"] = status;

        listOfSongConcat.push(obj);
        if (listOfSongConcat.length == numberOfFiles)//הכנסת השירים למסד הנתונים
        {
          var k = 0;

          for (k = k; k < listOfSongConcat.length; k++) {
            var json4 = JSON.stringify(listOfSongConcat[k]);


            fetch("http://localhost:62135/api/values/addSong", {
              method: "post",
              headers: { 'Content-Type': 'application/json' },
              body: json4
            })

              .then(res => res.json())

              .then((res) => {

                debugger;
                if (res.Status == true) {

                  setSeverity("success");
                  setAlertContent(res.Message + " השיר יהא זמין להורדה ולצפיה מהכניסה הבאה לאתר .  ");
                  showError();
                  p = p + 1;
                  if (p == numberOfFiles) {
                    handleClose1();
                  }
                  var thisSong = res.Data;

                  var newSong = {
                    songId: thisSong.songId,
                    songName: thisSong.songName,
                    neatTags: thisSong.neatTags,
                    pointsTags: thisSong.pointsTags,
                    isPermit: thisSong.isPermit,
                    tag1: thisSong.tag1,
                    tag2: thisSong.tag2,
                    tag3: thisSong.tag3,
                    userId: thisSong.userId,
                    userName: thisSong.userName

                    // עידכון השיר בטבלה מיד לאחר שמעלים אותו
                    // מסובך מאד, כי הוספת השיר לא מביאה את השיר ואת תגיותיו והנקודות. בסי שארפ כדאי לשנות. ?

                  }
                  debugger;
                  var cloneSongList = songList;

                  cloneSongList = cloneSongList.concat(newSong);
                  dispatch({ type: 'SET_SONG_LIST', payload: cloneSongList });

                }

                else {
                  setSeverity("error");

                  setAlertContent(res.Message);
                  showError();
                  // alert("failed");
                  p = p + 1;
                  if (p == numberOfFiles) {
                    handleClose1();
                  }
                }

              },
                (err) => {
                  setSeverity("error");
                  showError(" שגיאה כללית. נסה שנית ");
                  handleClose1();

                })
          }
        }
      }
      reader.readAsText(file);

    });

    setIndex("-300");
    setTimeout(() => {
      setIsDisable(false);
    }, 10000);
    

  }

 
  const [index, setIndex] = useState("20");

  function showError() {

    //למשך 10 שניות הצגת ההודעה
    setTimeout(function () {
      setErrorPlay("none");

    }.bind(this), 5000);

    setErrorPlay("");
  }

  return (
    <div className="upload">

      <Backdrop className={classes.backdrop} open={open1} >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Dialog
       
        dir="rtl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"בקשת הסכמת הלקוח לשתף את השיר במאגר"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" >
            שלום. האם ברצונך לאשר את שיתוף השיר במאגר הגלובלי
            ? אם הינך מאשר, אלגוריתם השיום יהיה מדויק, אמין ונכון יותר!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsDisable(true);
            setTimeout(() => {
              handleClose();
              insertSelectedSongsAndInvestigration(false);
            }, 2000);
            


          }} color="primary">
            אני מוחה על כך
          </Button>
          <Button onClick={() => {
            setIsDisable(true);
            setTimeout(() => {
              handleClose();
              insertSelectedSongsAndInvestigration(true);
            }, 2000);

            // setTimeout(() => {
            //   setIsDisable(false);
            // }, 2000);

          }} color="primary">
            בהחלט!
          </Button>
        </DialogActions>
      </Dialog>


      <input type="button" style={{ backgroundColor: "transparent" }} className="uploadButton" width="0px " value="" />
      <input onChange={(e) => {
        handleClickOpen(e);


      }} type="file" disabled={isDisable} multiple name="upload" accept=".txt" id="fileUpload" />

    </div>

  );
}))