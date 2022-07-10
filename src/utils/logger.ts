import fs from 'fs/promises';
import path from 'path';

export default class Logger {
  // Caso não exista, será criado um arquivo txt que conterá os logs da API
  private static _filePath = path.resolve(__dirname, '../../logs.txt');

  public static async save(info: string): Promise<void> {
    const sentence = `${new Date().toLocaleString('pt-BR')}: ${info}\n`;
    // Acessa recursivamente? A classe e escreve a sentença definida
    // A flag 'a' sinaliza a abertura do arquivo e que o arquivo deve ser criado
    // caso não exista?
    // https://nodejs.org/api/fs.html#fs_file_system_flags
    fs.writeFile(Logger._filePath, sentence, { flag: 'a' });
  }
}
