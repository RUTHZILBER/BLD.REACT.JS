import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';
// הפרטים המאוחסנים בכל הקומפוננטות-פרטי המשתמש, הערה=מצב המתג (פרטי או גלובלי) ורשימת השירים הניתנים לצפיה ללקוח זה
const userDetails = {
  UserId: "",
  UserName: "",
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  NotingTime: "",
  Comment: "private",
  SongList: []
}
const reducer = produce((state, action) => {

  switch (action.type) {
    case 'SET_USER':
      {

        state.UserId = action.payload.userId;
        state.UserName = action.payload.userName;
        state.FirstName = action.payload.firstName;
        state.LastName = action.payload.lastName;
        state.Email = action.payload.email;
        state.Password = action.payload.password;
        state.NotingTime = action.payload.notingTime;
        state.Comment = action.payload.comment;

        break;
      }

    case 'SET_STATE': {
      if (state.Comment == "all") {
        state.Comment = "private";
      }
      else {
        state.Comment = "all";
      }

      break;
    }

    case 'SET_SONG_LIST': {
      state.SongList = action.payload;
      break;
    }

    default:
      break;
  }
}, userDetails);



const Store = createStore(reducer);
window.Store = Store;
export default Store;