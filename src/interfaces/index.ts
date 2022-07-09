export interface IUser extends IUserCreateRequest {
  id: number;
}

export interface IUserCreateRequest {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string | undefined | null;
}

// Partial permite que possamos usar uma interface parcialmente.
// Util para quando precisamos atualizar o valor de campos específicos
// da interface e não definir todos os campos como opcionais (?), por exemplo
// Esse conceito é chamado de mapeamento de tipos.
export interface IUserUpdateRequest extends Partial<IUserCreateRequest> {}
