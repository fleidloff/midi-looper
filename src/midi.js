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

  function send(msg) {
    const { _type } = msg;
    output.send(_type, msg);
  }

  function onMessage(messageHandler) {
    input.on("noteon", function (msg) {
      messageHandler(msg);
    });

    input.on("noteoff", function (msg) {
      messageHandler(msg);
    });
  }

  return {
    send,
    onMessage,
  };
}
