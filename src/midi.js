import easymidi from "easymidi";

export function bootstrap() {
  // const inputs = easymidi.getInputs();
  // console.log("inputs", inputs);

  const input = new easymidi.Input("USB Midi Cable:USB Midi Cable MIDI 1 20:0");
  const output = new easymidi.Output(
    "USB Midi Cable:USB Midi Cable MIDI 1 20:0"
  );

  const DELAY = 400;
  input.on("noteon", function (msg) {
    console.log("noteon", msg);
    setTimeout(() => {
      output.send("noteon", msg);
    }, DELAY);
  });

  input.on("noteoff", function (msg) {
    setTimeout(() => {
      output.send("noteoff", msg);
    }, DELAY);
  });

  input.on("cc", function (msg) {
    console.log("cc", msg);
  });
}