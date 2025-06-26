import { Card, CardFooter, CardImg, Col, Row } from "react-bootstrap";
import "../css/film.css";
function Film({ movie }) {
  const formatFrenchDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <Row>
      <Col md={6} className="offset-md-3">
        <Card>
          <CardImg
            variant="top"
            src={movie.poster_path}
            alt={`Affiche du film ${movie.original_title}`}
          />
          <Card.Body>
            <Card.Title>{movie.original_title}</Card.Title>
            <Card.Subtitle className="my-2 text-muted">
              <small>Sortie le {formatFrenchDate(movie.release_date)}</small>
            </Card.Subtitle>
            <Card.Text>{movie.overview}</Card.Text>
            <Card.Text>
              Note moyenne: {movie.vote_average} ({movie.vote_count} votes)
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Film;
