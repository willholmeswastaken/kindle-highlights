// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import * as kindleClippings from "../../parser";
import { prisma } from "../../server/db/client";

import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { Book, HighlightImport, User } from "@prisma/client";
import { ApiResponse } from "../../models/apiResponse";

const fileUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (!session) {
    res.status(401).json({
      errorMessage: "Unauthenticated user",
      responseCode: "401",
    } as ApiResponse<string>);
    return;
  }

  try {
    const test = kindleClippings.readKindleClipping(req.body);
    console.log(test);
  } catch (err) {
    console.log(err);
    return;
  }

  const entries = kindleClippings.readKindleClipping(req.body);
  const parsedEntries = kindleClippings.parseKindleEntries(entries);
  const books = kindleClippings.organizeKindleEntriesByBookTitle(parsedEntries);

  if (!session.user?.email) {
    res.status(401).json({
      errorMessage: "User email not found in session",
      responseCode: "401",
    } as ApiResponse<string>);
    return;
  }

  const highlightsImport: HighlightImport | null =
    await prisma.highlightImport.create({
      data: {
        userId: session.user.email,
      },
    });
  if (!highlightsImport) {
    res.status(422).json({
      errorMessage: "Unable to create highlights import",
      responseCode: "422",
    } as ApiResponse<string>);
    return;
  }

  let bookTitles: string = "";
  let totalBookCount: number = 0;
  for (let [key, value] of books.entries()) {
    bookTitles += `${key} `;
    totalBookCount++;
    const book: Book | null = await prisma.book.create({
      data: {
        title: key,
        importId: highlightsImport.id,
        author: value[0]?.authors ?? "",
      },
    });
    if (!book) continue;
    for (const highlight of value) {
      await prisma.highlight.create({
        data: {
          page: highlight.page.toString(),
          bookId: book.id,
          content: highlight.content,
          location: highlight.location,
        },
      });
    }
  }

  await prisma.highlightImport.update({
    where: {
      id: highlightsImport.id,
    },
    data: {
      containsTitles: bookTitles.trimEnd(),
      totalBookCount: totalBookCount,
    },
  });

  res.status(201).json({
    responseCode: "201",
    data: highlightsImport.id,
  } as ApiResponse<string>);
};

export default fileUpload;
