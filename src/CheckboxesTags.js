//השלמה אוטומאטית לתגיות
import { React, useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import { Icon, InlineIcon } from '@iconify/react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import magnifyingGlass from '@iconify-icons/oi/magnifying-glass';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { connect } from 'react-redux';
import './CheckboxesTags.css';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function mapStateToProps(state) {
    return {
        userId: state.UserId,
        comment: state.Comment,
        songList: state.SongList
    };
}


export default connect(mapStateToProps)(function CheckboxesTags(props) {//שטח התגיות + אפשרויות 
    const { userId, comment, songList, severity, setSeverity, alertContent, setAlertContent, text, setText, errorPlay, setErrorPlay } = props;
    {/* רשימת כל מזהי השירים */ }
    const [songsIdArray, setSongsIdArray] = useState([]);
    //קבלת כל השירים המורשים מתוך המאגר

    const [songsArray, setSongsArray] = useState([

        { songContect: "thank to hashem 7", songName: "a6" }
    ]);
    {/* פונקציה המציגה הודעה במשך 10 שניות */ }
    function showError() {

        //למשך 10 שניות הצגת ההודעה
        setTimeout(function () {
            setErrorPlay("none");

        }.bind(this), 5000);

        setErrorPlay("");
    }
    {/* פילטור השירים (פרטי או גלובלי) לתוך רשימת התגיות כתגיות  */ }
    function filterTag() {
        debugger;
        if (window.Store.getState().SongList.length > 0) {





            var cloneTagList = (
                window.Store.getState().SongList.filter(
                    rows =>
                    (
                        (rows.userId == userId && comment == "private") ||
                        ((rows.isPermit == true || rows.userId == userId) && comment == "all")
                    )
                )
            );

            var newTagListToShow = cloneTagList.map(function (o, i) {
                return { tags: o.neatTags, songName: o.songName, songId: o.songId, points: o.pointsTags };
            });

            {/* מפוי השירים מתוך רשימת השירים, כתגיות */ }

            var cloneTagListToShow = [];
            for (var i = 0; i < newTagListToShow.length; i++) {

                var nameSong = newTagListToShow[i].songName;
                var idSong = newTagListToShow[i].songId;
                var tagArr = newTagListToShow[i].tags;
                var tagPoints = newTagListToShow[i].points;
                for (var j = 0; j < tagArr.length; j++) {

                    cloneTagListToShow = cloneTagListToShow.concat({
                        songName: nameSong,
                        songId: idSong,
                        tagName: tagArr[j],
                        points: tagPoints[j]
                    });

                }


            }


            var cloneTagListToShow1 = cloneTagListToShow.sort(function (a, b) {
                if (a.tagName < b.tagName) return parseFloat(b.points) - parseFloat(a.points) || -1;
                if (a.tagName > b.tagName) return parseFloat(b.points) - parseFloat(a.points) || 1;
                return parseFloat(b.points) - parseFloat(a.points) || 0;
                //מיון לפי נקודות ואח''כ לפי א''ב
            });
            debugger;
            setTagsArray(cloneTagListToShow1);
        } else {
            setTimeout(filterTag, 1000); // try again in 1000 milliseconds (1 second)
        }

    }

    useEffect(() => {
        filterTag();
    },
        [comment]
    );


    // פונקציה המזמנת את פונקציה הורדת השיר
    function downloadAllSongs(e) {
        debugger;
        for (var i = 0; i < songsIdArray.length; i++) {
            downloadTxtFile(e, songsIdArray[i]);
        }

    }
    //מתוך כל התגיות שנבחרו עם שם שיר והורדת שורה מידי תגית TXT פונקציה להורדת קובץ
    function downloadTxtFile(e, i) {
        debugger;
        var currentSongAll = songList.filter(p => p.songId == i);
        if (currentSongAll.length == 1) {
            var currentSong = currentSongAll[0];
            var neatTags = currentSong.neatTags;
            const element = document.createElement("a");

            var songi = "\n";
            for (var i = 0; i < neatTags.length; i++) {
                songi = songi + neatTags[i] + "\n";
            }

            element.href = URL.createObjectURL(new Blob([songi],
                { type: 'text/plain;charset=utf-8' }));

            element.download = currentSong.songName + ".txt";
            document.body.appendChild(element);
            element.click();
        }




    }

    {/* לצורך העלאת נקודות התגיות */ }
    const [tagsArray, setTagsArray] = useState([]);

    //STOREלראשונה מתוך התגיות ב COMBOBOXקריאה למלוי ה
    useEffect(function () {

        filterTag();
        return function a() {
            // פונקציה הקוראת כאשר מתבצעת יציאה מהקומפוננטה: alert(" bye bye ");
        }
    }, [])

    //לפי התגית הנלחצת DB פונקציה הקוראת להעלאת הנקודות ב
    function upgrowTagPointReal(e) {
        debugger;
        var v = e.currentTarget.firstElementChild.innerText;
        v = v.substring(0, v.length);//?
        var to = v.indexOf(" מהשיר ");
        var tagush = v.substring(0, to);

        
        var from2 =tagush.length+7;// v.lastIndexOf(" מהשיר ") + 12;
        var to2 = v.length;

        var songush = v.substring(from2, to2);
        var line = tagsArray.filter(i => i.tagName == tagush && i.songName == songush);
        if (line.length != 0) {

            upgrowTagPoint(e, line[0].tagName, line[0].songId);
            debugger;
            var cloneArray = songsArray.concat({ songId: line[0].songId, songContect: line[0].songContect, songName: line[0].songName + " " + line[0].tagName });
            setSongsArray(cloneArray);
            //  alert(" התגית:  " + tagush + ", מהשיר: " + songush);

            var cloneSongsId = [...songsIdArray];
            var newId = line[0].songId;
            cloneSongsId = cloneSongsId.concat(newId);
            setSongsIdArray(cloneSongsId);
            debugger;

        }
        else {
            // alert(" השיר לא נמצא ");
        }

    }

    // DBפונקציה להעלאת הנקודות ב
    function upgrowTagPoint(e, tagName_, songId_) {
        debugger;
        var json4 = JSON.stringify({ text: tagName_, songId: songId_ });

        fetch("http://localhost:62135/api/Tag", {

            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json4
        })

            .then(res => res.json())

            .then((res) => {
                // debugger;
                // alert(res.Data);
            },
                (err) => {
                    //   debugger;
                })
    }

    return (
        <div id="a" style={{ display: "flex", justifyContent: "space-around", flexDirection: "row-reverse", flexWrap: "wrap" }}>

            {/* השלמה אוטומאית לתגיות + קומבובוקס */}
            <Autocomplete
                style={{ color: "white"}}
                multiple
               className="a23"
                // אך לא עובדת בעת הקלדת אנטר במקלדת 🎃 DB פונקציה הרצה רק בזמן לחיצת עכבר על התגית, ומעלה את ערכי הנקודות ב
                onChange={(e) => {
                 //   debugger;
                    if (e.target.checked) {
                     //   debugger;
                        upgrowTagPointReal(e)
                    }
                    else {
                        debugger;
                        if (e.cancelable == true) {
                            // alert('on download it will be showed, sorry.');

                            setSeverity("warning");
                            setAlertContent("בהורדת כלל השירים הנבחרים, גם שיר זה יופיע. ");

                            showError()
                        }

                    }
                    if (e.target.checked)
                        console.log(" good ");
                    else {
                        //alert(" sorry, it isn't an event! ");
                    }

                }}

                //הלחיצה היא על תיבת הטקסט, עליה חל האנטר ולא על הנבחר ספייציפי...

                id="checkboxes-tags-demo"
                // מיון התגיות לפי שמן ואחר כך לפי מספר הנקודות
                options={tagsArray}
                disableCloseOnSelect
                getOptionLabel={(option) => option.tagName}
                renderOption={(option, { selected }) => (

                    <div>

                        <Checkbox
                            dir="rtl"
                            style={{ textAlign: 'right' }}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 20 }}
                            checked={selected}
                        />
                        {option.tagName + "   מהשיר   " + option.songName}
                    </div>)
                }
                style={{ width: 1200 }}
                renderInput={(params) => (

                    //dir="rtl" ; it breaks the X to left, outside...

                    <div>
                        {/* תגית זכוכית המגדלת */}
                        <Icon style={{ width: "250px" }} style={{backgroundColor:"transparent"}} width="40px" icon={magnifyingGlass} />
                        <TextField {...params} variant="outlined"
                            label="" placeholder="הקלד מילה כדי לאתר את התגית" />

                    </div>

                )}
            />
            {/* תגית ההורדה */}
            <IconButton onClick={downloadAllSongs} className="ib"  width="70px"  > <SystemUpdateAltIcon style={{ color: "white", width: "110px" }} width="70px" ></SystemUpdateAltIcon></IconButton>

        </div>
    );
})