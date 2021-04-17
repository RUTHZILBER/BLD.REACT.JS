// התראת שגיאה לדף הלוגין כאשר מתרחשת תקלה כללית 
import React from 'react';
import Alert from '@material-ui/lab/Alert';

export default function ErrorMessage(props) {

  const { message } = props;
  if (message && message.length > 0)
    return <Alert  severity="error" dir="rtl">
     {message}
    </Alert>;
  return false;

}