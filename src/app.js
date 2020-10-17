import { bootstrap as bootstrapBlinkstick } from "./blinkstick.js";
import { bootstrap as bootstrapMidi } from "./midi.js";

export function run() {
  bootstrapMidi();
  bootstrapBlinkstick();
}

export default run;
