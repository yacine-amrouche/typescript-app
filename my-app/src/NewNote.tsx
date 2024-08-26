import { NoteData } from "./App";
import { NoteForm } from "./NoteForm";
type newNoteProps = {
  onSubmit: (data: NoteData) => void;
};
export function NewNote({ onSubmit }: newNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
