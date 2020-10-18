import blinkstick from "blinkstick";

import { states } from "./looper.js";

export function bootstrap() {
  const led = blinkstick.findFirst();

  led.blink("#002200", { repeats: 2, delay: 400 });

  function setColor(color) {
    led.setColor(color);
  }

  function setState(state) {
    switch (state) {
      default:
        setColor("#000000");
      case states.STOPPED:
        setColor("#000022");
        break;
      case states.RECORDING:
        setColor("#220000");
        break;
      case states.PLAYING:
        setColor("#002200");
        break;
    }
  }
  return {
    setColor,
    setState,
  };
}
