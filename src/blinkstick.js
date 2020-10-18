import blinkstick from "blinkstick";

export function bootstrap() {
  const led = blinkstick.findFirst();

  led.blink("#002200", { repeats: 2, delay: 400 });

  function setColor(color) {
    led.setColor(color);
  }
  return {
    setColor,
  };
}
