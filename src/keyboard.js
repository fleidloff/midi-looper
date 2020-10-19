import blinkstick from "blinkstick";
import keypress from "keypress";

export function bootstrap({ blinkstick }) {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  process.stdin.setRawMode && process.stdin.setRawMode(true);
  process.stdin.resume();

  function onKey(handleKey) {
    process.stdin.on("keypress", function (ch, key) {
      if (key && key.ctrl && key.name == "c") {
        process.stdin.pause();
        blinkstick.setColor("#000000");
        process.exit(1);
      }

      handleKey(key.name);
    });
  }
  return {
    onKey,
  };
}
