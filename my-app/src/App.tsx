import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NewNote } from "./NewNote";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markDown: string;
  tags: tag[];
};
export type tag = {
  id: string;
  label: string;
};
export type RowNote = {
  id: string;
} & RawNoteData;
export type RawNoteData = {
  title: string;
  markDown: string;
  tagIds: string[];
};
function App() {
  const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<tag[]>("TAGS", []);
  const notesWTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
