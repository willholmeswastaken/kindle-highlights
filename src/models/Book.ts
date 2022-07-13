import Highlight from "./Highlight";

interface Book {
  name: string;
  author: string;
  highlights: Highlight[];
  lastHighlighted: Date;
}
