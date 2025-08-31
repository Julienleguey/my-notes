type Note = {
  id?: number;
  title: string;
  content: string | null;
  type: "textNote" | "listNote";
};

export default Note;
