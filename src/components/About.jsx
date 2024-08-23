// src/components/About.jsx

import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h2>About This App</h2>
      <p>
        This app allows you to search for information about different Pokémon
        using the PokéAPI.
      </p>
      <p>Built with React and React Bootstrap.</p>
    </Container>
  );
};

export default About;
