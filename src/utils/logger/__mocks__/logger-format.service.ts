type IMessage = string | boolean;

export class LoggerFormatService {
  public static whiteBright(message: Readonly<IMessage>): string {
    return `whiteBright-${message}`;
  }

  public static yellowBright(message: Readonly<IMessage>): string {
    return `yellowBright-${message}`;
  }

  public static magenta(message: Readonly<IMessage>): string {
    return `magenta-${message}`;
  }

  public static cyan(message: Readonly<IMessage>): string {
    return `cyan-${message}`;
  }

  public static yellow(message: Readonly<IMessage>): string {
    return `yellow-${message}`;
  }

  public static white(message: Readonly<IMessage>): string {
    return `white-${message}`;
  }

  public static green(message: Readonly<IMessage>): string {
    return `green-${message}`;
  }

  public static red(message: Readonly<IMessage>): string {
    return `red-${message}`;
  }

  public static blue(message: Readonly<IMessage>): string {
    return `blue-${message}`;
  }

  public static bold(message: Readonly<IMessage>): string {
    return `bold-${message}`;
  }
}
