export interface Action {
  type: string;
  payload?: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  text: string;
  date: Date;
  authorID: string;
}
