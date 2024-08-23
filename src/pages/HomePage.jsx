import React from "react";
import { Container } from "react-bootstrap";
import PokemonList from "../components/PokemonList";

const Home = () => {
  return (
    <Container className="text-center p-5 my-5 bg-light rounded">
      <h1>Welcome to the Pokémon App</h1>
      <p>Explore information about your favorite Pokémon.</p>
      <PokemonList />
    </Container>
  );
};

export default Home;
