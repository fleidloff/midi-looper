import keypress from "keypress";

export function bootstrap() {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  process.stdin.setRawMode && process.stdin.setRawMode(true);
  process.stdin.resume();

  function onKey(handleKey) {
    process.stdin.on("keypress", function (ch, key) {
      if (key && key.ctrl && key.name == "c") {
        process.stdin.pause();
      }

      handleKey(key.name);
    });
  }
  return {
    onKey,
  };
}
