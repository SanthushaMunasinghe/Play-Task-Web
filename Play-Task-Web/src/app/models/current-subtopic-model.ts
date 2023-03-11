export interface Subtopic {
  [key: string]: string | string[];
  _id: string;
  title: string;
  topic: string;
  description: string;
  instructions: string[];
}
