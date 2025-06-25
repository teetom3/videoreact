import { useEffect, useState } from "react";

import "./App.css";
import { Card, CardImg, Container } from "react-bootstrap";

function App() {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch("https://jsonfakery.com/movies/random/1"); // ID invalide
        // Sans cette condition, seules les erreurs réseaux seraient gérées dans le catch
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          ); // statusText n’est pas toujours disponible selon l’API
        }
        const data = await response.json();
        console.log("Film récupéré :", data);
        setMovie(data[0]);
      } catch (error) {
        console.error(error.message); // Pour le développeur
        alert("Une erreur est survenue lors de la récupération du film."); // Pour le client
      }
    }
    fetchMovie();
  }, []);

  return (
    <>
      {movie && (
        <Container>
          <Card>
            <CardImg variant="top" src={movie.poster_path} />
          </Card>
        </Container>
      )}
    </>
  );
}

export default App;
