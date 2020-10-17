import { bootstrap as bootstrapBlinkstick } from "./blinkstick.js";
import { bootstrap as bootstrapMidi } from "./midi.js";
import { bootstrap as bootstrapTime } from "./time.js";

export function run() {
  bootstrapTime();
  bootstrapMidi();
  bootstrapBlinkstick();
}

export default run;
