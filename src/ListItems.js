import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {useStyles,useStyles2} from './ListItemsStyle.js';

export default function ListItems(props) {

  const { searchesArray, setSearchesArray, dis, setDis, rows, setRows } = props;
  debugger;
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ position: "fixed", display: dis, top: "30px", right: "30px", boxShadow: "0 0 10px #999999" }}>
      <Divider />
      {/* רשימת השירים שאותרו ע''י החפוש המיוחד ממופה לרשימה וממוש פעולת לחיצה עבור כל שדה=שורה , המבטא את שם השיר שאותר. ניווט לשורה זו בטבלה, */}
      <List>
        {[...searchesArray].map((i) => (
          <ListItem button key={i.songId}>

            <ListItemText primary={i.songName}
              onClick={() => {
                var row = document.querySelectorAll('#row_id_' + i.songId)[0];
                var numSerchesResult=searchesArray.length;
                var tempTop=row.offsetTop+10*numSerchesResult;
                //הזזת המסך למיקום בהתאם לשיר שנבחר
                window.scroll({
                  behavior: 'smooth',
                  left: 0,
                  top: tempTop
                });
              }
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}