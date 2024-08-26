import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef } from "react";
import { NoteData } from "./App";
type NoteFromProps = {
  onSubmit: (data: NoteData) => void;
};
export function NoteForm({ onSubmit }: NoteFromProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  function handelSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markDown: markDownRef.current!.value,
      tags: [],
    });
    console.log(titleRef);
  }

  return (
    <Form onSubmit={handelSubmit}>
      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="title">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markDownRef} rows={12} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
