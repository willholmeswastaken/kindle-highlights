export class KindleEntry {
  private _bookTitleAndAuthors: string;
  private _metdataClipp: string;
  private _contentClipp: string;

  constructor(bookTitle: string, metdataClipp: string, contentClipp: string) {
    this._bookTitleAndAuthors = bookTitle;
    this._contentClipp = contentClipp;
    this._metdataClipp = metdataClipp;
  }

  get bookTitleAndAuthors(): string {
    return this._bookTitleAndAuthors;
  }
  get metdataClipp(): string {
    return this._metdataClipp;
  }
  get contentClipp(): string {
    return this._contentClipp;
  }

  static createKindleClipp(clipp: Array<string>): KindleEntry {
    /*
        0 -> title
        1 -> metadata 
        2 -> blank
        3 -> content
        */

    if (clipp.length === 4) {
      return new KindleEntry(clipp[0]!, clipp[1]!, clipp[3]!);
    } else {
      throw new Error(`clipp array invalid: ${clipp}`);
    }
  }

  toJSON() {
    return {
      bookTitle: this.bookTitleAndAuthors,
      metdataClipp: this.metdataClipp,
      contentClipp: this.contentClipp,
    };
  }
}
