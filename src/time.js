import microtime from "microtime";

export function bootstrap() {
  console.log("now is", microtime.now());
}
