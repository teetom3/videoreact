import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Film from "./components/Film";
import CommentForm from "./components/CommentForm";
import Comments from "./components/Comments";
import "./App.css";

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://jsonfakery.com/movies/random/1");

        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }

        const data = await response.json();
        console.log("Film récupéré :", data);
        setMovie(data[0]);
      } catch (error) {
        console.error(error.message);
        setError("Une erreur est survenue lors de la récupération du film.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2">Chargement du film...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {movie && (
        <>
          <Film movie={movie} />
          <CommentForm />
          <Comments />
        </>
      )}
    </Container>
  );
}

export default App;
