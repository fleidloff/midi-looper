import keypress from "keypress";

export function bootstrap({ callback }) {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on("keypress", function (ch, key) {
    if (key && key.ctrl && key.name == "c") {
      process.stdin.pause();
    }

    callback(key.name);
  });

  process.stdin.setRawMode && process.stdin.setRawMode(true);
  process.stdin.resume();
}
