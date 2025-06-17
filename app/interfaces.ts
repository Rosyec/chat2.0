export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: Date;
  isOwn: boolean;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: Message) => void;
}

export interface TypingUser extends User {}
