import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import bld from './bld.JPG';
function LoginStyles() {

    const [colorE, setColorE] = useState("blue");
    const [colorP, setColorP] = useState("blue");
    const [errorMessageE, setErrorMessageE] = useState("");
    const [errorMessageP, setErrorMessageP] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        image: {

            backgroundImage: `url(${bld})`, // bld,require('./logo.jpeg') 
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'contain, cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
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
    }));
    const classes = useStyles();
}
export default LoginStyles;