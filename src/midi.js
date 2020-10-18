import easymidi from "easymidi";

export function bootstrap() {
  //const inputs = easymidi.getInputs();
  //console.log("inputs", inputs);

  const input = new easymidi.Input(
    "Circuit:Circuit MIDI 1 20:0"
    //"USB Midi Cable:USB Midi Cable MIDI 1 20:0"
  );
  const output = new easymidi.Output(
    "Circuit:Circuit MIDI 1 20:0"
    //"USB Midi Cable:USB Midi Cable MIDI 1 20:0"
  );

  // noteon { channel: 0, note: 48, velocity: 81, _type: 'noteon' }
  // noteoff { channel: 0, note: 48, velocity: 0, _type: 'noteoff' }
  const DELAY = 400;
  input.on("noteon", function (msg) {
    console.log("noteon", msg);
    setTimeout(() => {
      output.send("noteon", msg);
    }, DELAY);
  });

  input.on("noteoff", function (msg) {
    setTimeout(() => {
      console.log("noteoff", msg)
      output.send("noteoff", msg);
    }, DELAY);
  });

  input.on("cc", function (msg) {
    console.log("cc", msg);
  });

  output.send("cc", { channel: 1, controller: 87, value: 127 });
}
