// Classes abstatas são pricipalmente destinadas a Herançã
// Uma instância de uma classe abstrata não é possível
// Apenas uma classe que estende uma classe abstrata pode 
// herdar seus atributos.

// Lembre que: Como esssa class estende a classe Error, 
// A classe HttpError acessa a propriedade name de Error
// e é adicionado a propriedade httpCode.
// A classes derivadas de HttpError irão herdar esses atributos
// e, como a instrunção `super()` irão acessar a classe pai (Error),
// e buscar o atributo `message`.
export default abstract class HttpError extends Error {
  public abstract httpCode: number;
  public abstract name: string;
}
