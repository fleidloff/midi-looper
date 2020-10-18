import microtime from "microtime";

export function bootstrap() {
  function now() {
    return microtime.now();
  }

  return {
    now,
  };
}
