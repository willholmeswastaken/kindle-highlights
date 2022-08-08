import { Client } from "@notionhq/client";
import { Book, Highlight } from "@prisma/client";

const exportBooksToNotion = async (
  books: (Book & {
    highlights: Highlight[];
  })[]
) => {
  const client = new Client({ auth: process.env.NOTION_INTEGRATION_ID });
};
