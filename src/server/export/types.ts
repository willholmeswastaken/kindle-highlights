export interface QuoteChild extends CoreChild {
  quote: Quote;
}

export interface CoreChild {
  type: ChildType;
}

export interface Quote {
  rich_text: RichText;
  color?: string;
}

export interface RichText {
  type: InputType;
  text: TextBlock;
}

export interface TextBlock {
  content: string;
}

export type InputType = "text";

export type ChildType = "quote";
