import HttpError from './HttpError';

/*
  Repare no uso da classe abstrata.
  ela só pode ser estendida. Neste caso,
  quem herda seus atributos é a classe BadRequest
  essa sim poderá ser instânciada
*/
export class BadRequest extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'BadRequest';
  }
}
