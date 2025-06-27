import { useSelector, useDispatch } from "react-redux";
import { removeComment } from "./../redux/commentSlice";
import {
  Card,
  Col,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
  Alert,
} from "react-bootstrap";

function Comments() {
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };

  return (
    <Row className="mt-4">
      <Col md={6} className="offset-md-3">
        {comments.length === 0 ? (
          <Alert variant={"info"}>Aucun commentaire pour le moment.</Alert>
        ) : (
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroupItem key={comment.id} className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="d-flex align-items-center mb-1">
                      <strong>Note {comment.note}/5</strong>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <p className="mb-0">{comment.comment}</p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default Comments;
