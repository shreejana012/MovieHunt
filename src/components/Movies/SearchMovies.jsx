import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import {InputGroup, InputGroupAddon, Input} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

function SearchMovies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovie] = useState([]);
  const [error, setError] = useState([]);

  const search = () => {
    const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=9973fd8b&s=${searchQuery}`
    axios.get(API_URL)
    .then(function (response) {
      // handle success
      setMovie(response.data.Search)
    })
    .catch(function (error) {
      // handle error
      setError(error);
    })
    return {movies, error};
  };

  const handleMovieInput = e => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `${searchQuery}`;
  });

  return (
    <Container>
      <br/>
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <h3 align="center">Search Movies</h3>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <InputGroup>
                <Input 
                  onChange={handleMovieInput}
                  value={searchQuery}
                  placeholder="Search Movie"/>
                <InputGroupAddon addonType="append">
                  <Button onClick={search} color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
              <br />
              { movies ? (
                <ul>
                  { movies.map(function(movie){
                    return <Card>
                          <CardImg top height="300px" src={movie.Poster} alt="Movie" />
                          <CardBody>
                            <CardTitle>{movie.Title}</CardTitle>
                            <CardSubtitle>{movie.Type}</CardSubtitle>
                            <CardText>{movie.Year}</CardText>
                            <CardText>{movie.imdbID}</CardText>
                          </CardBody>
                        </Card>
                  })}
                </ul>
                ) : (error) ? 'Movie not found' : ""
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMovies;