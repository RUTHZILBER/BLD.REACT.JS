// 9879 ניתוב הדפים: ברירת מחדל מכאן מנותבות שאר הקומפוננטות
import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import ResponsiveDrawer from './ResponsiveDrawer.js';//הדף הראשי בפרויקט
import NewAccount from './NewAccount';
import SignInSide from './Login';
import UpdateAccount from './UpdateAccount.js';
import { createMuiTheme, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";

import { create } from 'jss';
import rtl from 'jss-rtl';


function App() {


  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  function RTL(props) {
    return (
      <StylesProvider jss={jss}>
        {props.children}
      </StylesProvider>
    );
  }

  return (
    <Provider className="niceFont" store={Store}>
     
      <div className="App" className="niceFont" style={{ fontFamily: "arial" }}>
          {/* <ThemeProvider theme={theme}> */}

          <Router>

            <Switch>

              {/* הדפים של הפרויקט בניתוב ראוטינג למהירות ויעילות */}

              <Route path="/Login">
                <SignInSide title="hell" />
                {/* דף הלוגין */}
              </Route>

              <Route path="/Home">
                {/* הדף הראשי, דף השירים והטבלה */}
                <ResponsiveDrawer />
              </Route>

              <Route path="/NewAccount">
                {/* לרישום לקוח חדש */}
                <NewAccount />
              </Route>


              <Route path="/UpdateAccount">
                {/* עדכון לקוח */}
                <UpdateAccount />
              </Route>

              <Route path="/">
                {/* ברירת מחדל באין נתיב אחר */}
                <SignInSide />
              </Route>

            </Switch>
          </Router>

          {/* </ThemeProvider> */}
        </div>
     
    </Provider >
  );
}

export default App;
