//הטבלה
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Table_Row from './Table_Row.js';

function mapStateToProps(state) {
  return {
    userId: state.UserId,
    comment: state.Comment,
    songList: state.SongList
  };
}




export default connect(mapStateToProps)(function CollapsibleTable(props) {

  const { text, setText, userId, comment, dispatch,songList, songListseverity , severity,setSeverity, alertContent,setAlertContent, errorPlay, setErrorPlay} = props;
  const [songListToShow, setSongListToShow] = useState(songList);
  


  function getTagsSong() {//קבלת כל השירים לטבלה
    var val = String(userId);
    var jsonObj = JSON.stringify({ texts: val });
    
    fetch("http://localhost:62135/api/values/getTableInform", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: jsonObj
    })

      .then(res => res.json())
      .then((res) => {
        if (res.Status) {
          debugger;
          if (songList.length == 0) {
           //כאשר זו הפעם הראשונה, יש לפלטר את רשימת השירים
           // ולמלא את רשומות הטבלה וכן את התגיות, אך מלוי התגיות 
           //בפונקציה המשתמשת במשתנים המוצהרים בקומפוננטה אחרת
            dispatch({ type: 'SET_SONG_LIST', payload: res.Data });
          // insteade of: 5 lines  filterSong();

            var res = res.Data.filter(
              rows =>
              (
                (rows.userId == userId && comment == "private") ||
                ((rows.isPermit == true || rows.userId == userId) && comment == "all")
              )
            );
            setSongListToShow(res);

          }
          else
            dispatch({ type: 'SET_SONG_LIST', payload: res.Data });

         
        }

      },
        (err) => {

        })

  }

  // בפעם הראשונה יש לשלף את כל השירים מהדטה בייס.
  useEffect(() => {
    getTagsSong();
  },
    []
  );
 // בכל שנוי של המתג (מצב השירים פרטי או גלובלי) יש לפלטר את רשימת השירים מחדש
  useEffect(() => {
    filterSong();
  },
    [comment]
  );

 //פילטור השירים מתוך רשימת השירים שנשלפו עבור המשתמש מבסיס הנתונים, אם רק את שלו או גם את של רעיו
  function filterSong() {
    debugger;
    
    var res = songList.filter(
      rows =>
      (
        (rows.userId == userId && comment == "private") ||
        ((rows.isPermit == true || rows.userId == userId) && comment == "all")
      )
    )
    setSongListToShow(res);
  }

  return (

    <>

      <TableContainer component={Paper}>

        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {/* כותרות הטבלה */}
  <TableCell align="right">מספר התגיות</TableCell>
    <TableCell align="right">תגית נפוצה</TableCell>

 <TableCell align="right">תגית משנה</TableCell>
 <TableCell align="right">תגית  ראשית</TableCell>
<TableCell align="right"> הרשאה לשיתוף במאגר </TableCell>
<TableCell align="right">משתמש שהעלה</TableCell>
              <TableCell>שם השיר</TableCell>
              
              
             
             
          
            
              <TableCell style={{display:"none"}} align="right">מזהה השיר </TableCell>

            </TableRow>
          </TableHead>
          {/* הצגת גוף הטבלה, ע"י מפוי רשימת השירים המפולטרת */}
          <TableBody>
            {songListToShow.map((row) => (
              <Table_Row severity={severity}setSeverity={setSeverity} alertContent={alertContent}setAlertContent={setAlertContent} errorPlay={errorPlay} setErrorPlay={setErrorPlay} key={row.songId} row={row} text={text} setText={setText} />
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
})