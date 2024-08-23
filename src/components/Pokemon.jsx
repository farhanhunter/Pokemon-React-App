// src/components/Pokemon.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import "../assets/Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonName, setPokemonName] = useState("ivysaur");
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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <h2 className="pokemon-title">Pokémon Search</h2>
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group controlId="pokemonName">
              <Form.Control
                type="text"
                placeholder="Enter Pokémon name"
                required
                className="text-center pokemon-input"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Form>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {pokemon && (
            <Card className="pokemon-card text-center shadow-lg">
              <Card.Body>
                <div className="pokemon-circle">
                  <Card.Img
                    variant="top"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                </div>
                <Card.Title className="pokemon-name text-primary mt-3">
                  {pokemon.name.toUpperCase()}
                </Card.Title>
                <Card.Text className="pokemon-details">
                  <strong>Tinggi:</strong> {pokemon.height / 10} m
                  <br />
                  <strong>Berat:</strong> {pokemon.weight / 10} kg
                  <br />
                  <strong>Tipe:</strong>{" "}
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`badge badge-${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </Card.Text>
                <ListGroup variant="flush" className="text-start pokemon-info">
                  <ListGroup.Item>
                    <strong>Kemampuan:</strong>{" "}
                    {pokemon.abilities.map((ability) => (
                      <span key={ability.ability.name}>
                        {ability.ability.name}
                      </span>
                    ))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pengalaman Dasar:</strong> {pokemon.base_experience}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Statistik:</strong>
                    <ul className="list-unstyled mb-0">
                      {pokemon.stats.map((stat) => (
                        <li key={stat.stat.name}>
                          {stat.stat.name}: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pokemon;
