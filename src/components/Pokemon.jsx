// src/components/Pokemon.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        setPokemon(response.data);
      } catch (err) {
        setError("Pokémon not found. Please try another name.");
        setPokemon(null);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, [pokemonName]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.pokemonName.value;
    setPokemonName(input);
    form.reset();
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Pokémon Search</h2>
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group controlId="pokemonName">
              <Form.Control
                type="text"
                placeholder="Enter Pokémon name"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              Search
            </Button>
          </Form>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {pokemon && (
            <Card className="text-center">
              <Card.Img
                variant="top"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title>{pokemon.name.toUpperCase()}</Card.Title>
                <Card.Text>
                  <strong>Height:</strong> {pokemon.height}
                  <br />
                  <strong>Weight:</strong> {pokemon.weight}
                  <br />
                  <strong>Type:</strong>{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pokemon;
