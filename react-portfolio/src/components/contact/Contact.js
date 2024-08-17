import React, { useState } from "react";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";

import './Contact.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100%',  // Increased the maximum width
    marginTop: '3em',
    marginBottom: "3em",
    width: '90vw', // Set the width closer to the full viewport width
  },
  form: {
    width: '100%',
  },
  formfield: {
    width: '100%',  // This makes each field take full width of the form
    marginBottom: '2rem',
  },
  scrollableTextField: {
    width: '100%',  // Ensure the text field is full width
    overflowY: 'auto',  // Enable vertical scrolling
    minHeight: '100px',  // Minimum height to ensure enough room for multiple lines
  }
}));

export const Contact = () => {
  const classes = useStyles();
  const greetings = "See how I fit in.";
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDescription = { jobDescription: message };
    console.log(1);
    console.log(process.env.REACT_APP_API_URL + "/llm");
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/llm", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDescription)
      });

      const data = await response.json();
      console.log(data); // Printing the response to the console
      setResponseMessage(data.response);  // Setting the response to the state
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to fetch data.');
    }
  };

  return (
    <section id="contact">
      <Container component="main" className={classes.main} maxWidth="false">
        <div className="contact">
          <div className="_form_wrapper">
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                id="outlined-name-input"
                label="Paste your Job Description here."
                type="text"
                size="small"
                variant="filled"
                name="name"
                className={classes.formfield}
                onChange={(e) => setMessage(e.target.value)}
              />
              <TextField
                id="outlined-response-input"
                label="Response"
                type="textarea"
                size="small"
                multiline
                minRows={5}
                variant="filled"
                name="response"
                className={[classes.formfield, classes.scrollableTextField].join(' ')}
                value={responseMessage}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button type="submit" className="submit-btn" variant="contained" color="primary">
                <i className="fas fa-terminal"></i>
                <Typography component='span'>Send Message</Typography>
              </Button>
            </form>
          </div>
          <h1 className="contact_msg">
            <TextDecrypt text={greetings}/>
          </h1>
        </div>
      </Container>
    </section>
  );
};
