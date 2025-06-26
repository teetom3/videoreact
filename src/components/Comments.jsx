import { useSelector, useDispatch } from "react-redux";
import { removeComment } from "./../redux/commentSlice";
import { Card, Col, Row, Button } from "react-bootstrap";

function Comments() {
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };

  return (
    <Row className="mt-4">
      <Col md={6} className="offset-md-3">
        <Card>
          <Card.Body>
            {comments.length === 0 ? (
              <div className="alert alert-info mb-0">
                Aucun commentaire pour le moment.
              </div>
            ) : (
              <div>
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className={`py-3 ${
                      index !== comments.length - 1 ? "border-bottom" : ""
                    }`}
                  >
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
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Comments;
