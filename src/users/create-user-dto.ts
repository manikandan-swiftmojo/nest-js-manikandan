export class creteUserDto {
  name: string;
  email: string;
}

export class updateUserDto {
  email?: string;
  name?: string;
  password?: string;
}