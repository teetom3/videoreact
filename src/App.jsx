import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment, removeComment } from "./redux/commentSlice";
import * as yup from "yup";
import "./App.css";
import {
  Card,
  CardImg,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";

function App() {
  const [movie, setMovie] = useState(null);
  const schema = yup.object().shape({
    comment: yup
      .string()
      .max(500, "doit comporter maximum 500 caractères")
      .required("le commentaire est requis"),

    note: yup
      .number()
      .required("La note est requise")
      .oneOf([1, 2, 3, 4, 5], "La note doit être comprise entre 1 et 5"),
    acceptedConditions: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les conditions générales"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
      note: "",
      acceptedConditions: false,
    },
    resolver: yupResolver(schema),
  });

  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const newComment = {
      id: Date.now(),
      comment: data.comment,
      note: parseInt(data.note),
      createdAt: new Date().toLocaleString("fr-FR"),
    };

    dispatch(addComment(newComment));
    reset();
  };
  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };
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
        <Container className="my-4">
          <Row>
            <Col md={6} className="offset-md-3">
              <Card>
                <CardImg variant="top" src={movie.poster_path} />
                <Card.Body>
                  <Card.Title>{movie.original_title}</Card.Title>

                  <Card.Text> Sortie le {movie.release_date}</Card.Text>

                  <Card.Text>{movie.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="offset-md-3 mt-4">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Commentaire</h1>
                <Form.Group className="mb-3">
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Entrez votre commentaire"
                    {...register("comment")}
                    isInvalid={!!errors.comment}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.comment?.message}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Note /5</Form.Label>
                  <Form.Select {...register("note")} isInvalid={!!errors.note}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.note?.message}</p>
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    {...register("acceptedConditions")}
                    label="J'accepte les conditions général"
                    isInvalid={!!errors.acceptedConditions}
                    feedback={errors.acceptedConditions?.message}
                    feedbackType="invalid"
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.acceptedConditions?.message}</p>
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6} className="offset-md-3">
              <Card>
                <Card.Header>
                  <h3>Commentaires ({comments.length})</h3>
                </Card.Header>
                <Card.Body>
                  {comments.length === 0 ? (
                    <p>Aucun commentaire pour le moment.</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="border-bottom pb-2 mb-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>Note: {comment.note}/5</strong>
                            <small className="text-muted">
                              {" "}
                              - {comment.createdAt}
                            </small>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                        <p className="mt-1">{comment.comment}</p>
                      </div>
                    ))
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default App;
