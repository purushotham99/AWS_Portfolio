/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";

import './Works.css';

// Import ../../assets/recentprojects/
import Portfolio from '../../assets/recentprojects/react-portfolio.png';
import Veritru from '../../assets/recentprojects/veritru.png';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
  },
}));

export const Works = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([
    { 
      id: 1,
      title: 'Project Spyglass - J&J', 
      description: `I combined diverse techniques in NLP including entity extraction, 
                    text preprocessing and extracting contextual similarity from clinical studies 
                    to extract key insights from the studies. Additionally, I was instrumental in 
                    shaping the architecture of an NLP project, ensuring its successful implementation.`,
      alter: 'Project Spyglass',
      image: `${Portfolio}`,
    },
    { 
      id: 2,
      title: 'VLife - Virtusa', 
      description: `Virtusa’s Centre of Excellence team - vLife, Our focus was to develop cutting-edge ML solutions for healthcare. vLife has a suite of 300 plus solutions supporting companies such as J&J, Cigna etc.
Here, I developed multiple ML solutions in the domain of Medicine. Claims adjudication, Medical Entity Extraction, ColBERT are some of the prominent solutions that I built.`,
      alter: 'VeriTru Project',
      image: `${Veritru}`,
    }
  ]);

  return (
    <section id="works">
      <Container component="main" className={classes.main} maxWidth="md">
        {projects.map((project) => (
          <div className="project" key={ project.id }>
            <div className="__img_wrapper">
              <img src={ project.image } alt={ project.alter }/>
            </div>
            <div className="__content_wrapper">
              <h3 className="title">
                <TextDecrypt text={ project.id + '. ' + project.title } />
              </h3>
              <p className="description">
                { project.description }
              </p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};
