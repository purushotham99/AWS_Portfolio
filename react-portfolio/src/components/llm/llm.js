import React from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './llm.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "3em",
  },
  form: {
    width: '100%',
  },
  formfield: {
    width: '100%',
    marginBottom: '2rem',
  },
}));

export const SimpleForm = () => {
  const classes = useStyles();

  return (
    <section id="simple-form" className="contact">
      <Container component="main" className={classes.main} maxWidth="md">
        <div className="_form_wrapper">
          <form className={classes.form}>
            <TextField
              id="small-input"
              label="Paste the job description here!"
              type="text"
              size="small"
              variant="filled"
              className={classes.formfield}
            />
            <TextField
              id="large-input"
              label="How I fit in."
              type="textarea"
              size="small"
              multiline
              minRows={5}
              variant="filled"
              className={classes.formfield}
            />
            <button type="submit" className="submit-btn">
              <i className="fas fa-terminal"></i>
              <Typography component='span'> See how I fit into your role</Typography>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
