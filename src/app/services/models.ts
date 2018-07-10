export class Login {
  username: string;
  password: string;
}

export class User {
  username: string;
  _id: string;
}

export class LoginResponce {
  jwt: string;
}

export class SuccessResponce {
  success: boolean;
}

export class GetChatId {
  userId: number;
}

export class GetChatIdResponce {
  _id: number;
}

export class GetChat {
  chatId: number;
}

export class GetChatResponce {
  _id: number;
}

export class Message {
  chatId: number;
  message: string;
}

export class getFile {
  datetime: string;
  chatId: number;
}
