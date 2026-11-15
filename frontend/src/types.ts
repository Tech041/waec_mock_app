export interface Subject {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  subjectId: string;
  text: string;
  options: string[];
  answer: number; // index of the correct option
  explanation: string;
}

export interface User {
  email: string;
  username: string;
}
