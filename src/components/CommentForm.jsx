import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import * as yup from "yup";
import { Col, Row, Form, Button } from "react-bootstrap";

function CommentForm() {
  const schema = yup.object().shape({
    comment: yup
      .string()
      .max(500, "doit comporter maximum 500 caractères")
      .required("le commentaire est requis"),
    note: yup
      .number()
      .typeError("La note doit être un nombre")
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

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!data.acceptedConditions) {
      return;
    }

    const newComment = {
      id: Date.now(),
      comment: data.comment,
      note: parseInt(data.note),
      createdAt: new Date().toLocaleString("fr-FR"),
    };

    dispatch(addComment(newComment));
    reset();
  };

  const generateRatingOptions = () => {
    const options = [
      <option key="default" value="">
        Sélectionner une note
      </option>,
    ];
    for (let i = 1; i <= 5; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <Row>
      <Col md={6} className="offset-md-3 mt-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Commentaire</h1>

          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Ajouter votre commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Entrez votre commentaire"
              {...register("comment")}
              isInvalid={!!errors.comment}
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNote">
            <Form.Label>Votre note</Form.Label>
            <Form.Select {...register("note")} isInvalid={!!errors.note}>
              {generateRatingOptions()}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.note?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConditions">
            <Form.Check
              type="checkbox"
              {...register("acceptedConditions")}
              label="J'accepte les conditions générales"
              isInvalid={!!errors.acceptedConditions}
              feedback={errors.acceptedConditions?.message}
              feedbackType="invalid"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Publier le commentaire
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default CommentForm;
