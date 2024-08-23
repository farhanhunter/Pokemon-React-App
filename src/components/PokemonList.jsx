import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const offset = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const results = response.data.results;

        const pokemonDetails = await Promise.all(
          results.map((pokemon) =>
            axios.get(pokemon.url).then((res) => res.data)
          )
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Pokémon List</h1>
      <Row>
        {pokemonList.map((pokemon, index) => (
          <Col key={index} xs={6} md={4} lg={3} className="text-center mb-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="img-fluid"
            />
            <p>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between my-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="primary"
        >
          Previous
        </Button>
        <span className="align-self-center">Page {currentPage}</span>
        <Button onClick={handleNextPage} variant="primary">
          Next
        </Button>
      </div>
    </Container>
  );
};

export default PokemonList;
