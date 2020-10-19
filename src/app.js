import { bootstrap as bootstrapBlinkstick } from "./blinkstick.js";
import { bootstrap as bootstrapMidi } from "./midi.js";
import { bootstrap as bootstrapTime } from "./time.js";
import { bootstrap as bootstrapKeyboard } from "./keyboard.js";
import { bootstrap as bootstrapLooper } from "./looper.js";

export function run() {
  const blinkstick = bootstrapBlinkstick();
  const time = bootstrapTime();
  const midi = bootstrapMidi();
  const keyboard = bootstrapKeyboard({ blinkstick });
  const looper = bootstrapLooper({ time, blinkstick, midi, keyboard });
}

export default run;
