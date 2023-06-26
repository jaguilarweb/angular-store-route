export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
}


export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}
