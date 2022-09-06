import { Client } from "@notionhq/client";
import {
  CreateDatabaseResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Book, Highlight } from "@prisma/client";

export class Notion {
  private readonly notionClient: Client;

  constructor(accessToken: string) {
    this.notionClient = new Client({ auth: accessToken });
  }

  public async exportBooks(
    pageId: string,
    books: (Book & { highlights: Highlight[] })[]
  ): Promise<string> {
    const result: CreateDatabaseResponse =
      await this.notionClient.databases.create({
        cover: {
          type: "external",
          external: {
            url: "https://bookriot.com/wp-content/uploads/2020/03/library-libraries-feature-700x375-1-1280x720.jpg",
          },
        },
        icon: {
          type: "emoji",
          emoji: "📚",
        },
        title: [
          {
            text: {
              content: `Kindle Highlights - ${new Date().toLocaleString()}`,
            },
            type: "text",
          },
        ],
        properties: {
          "Book Name": {
            type: "title",
            title: {},
          },
          "Book Author": {
            type: "rich_text",
            rich_text: {},
          },
          "Highlights Count": {
            type: "number",
            number: {
              format: "number",
            },
          },
          "Imported On": {
            type: "date",
            date: {},
          },
        },
        parent: {
          type: "page_id",
          page_id: pageId,
        },
      });

    for (const book of books) {
      const highlightQuotes: any = [];
      for (const highlight of book!.highlights!) {
        highlightQuotes.push({
          type: "quote",
          quote: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `${highlight.content} \n Page ${highlight.page}, Location ${highlight.location}`,
                },
                annotations: {
                  bold: false,
                  italic: true,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
              },
            ],
            color: "default",
          },
        });
      }
      await this.notionClient.pages.create({
        cover: {
          type: "external",
          external: {
            url: "https://bookriot.com/wp-content/uploads/2020/03/library-libraries-feature-700x375-1-1280x720.jpg",
          },
        },
        icon: {
          type: "emoji",
          emoji: "📚",
        },
        parent: {
          database_id: result.id,
        },
        properties: {
          "Book Name": {
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: book.title,
                },
              },
            ],
          },
          "Book Author": {
            type: "rich_text",
            rich_text: [
              {
                type: "text",
                text: {
                  content: book.author,
                },
              },
            ],
          },
          "Highlights Count": {
            type: "number",
            number: book.totalHighlights,
          },
          "Imported On": {
            type: "date",
            date: {
              start: new Date().toISOString().slice(0, 10),
            },
          },
        },
        children: highlightQuotes,
      });
    }
    return (result as DatabaseObjectResponse).url;
  }
}
