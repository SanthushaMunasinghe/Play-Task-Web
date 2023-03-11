export interface Teacher {
  [key: string]: string | string[];
  _id: string;
  name: string;
  email: string;
  contactno: string;
  home: string;
  institution: string;
  subjects: string[];
  classrooms: string[];
  dp: string;
}
