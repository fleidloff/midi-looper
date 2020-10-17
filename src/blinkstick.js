import blinkstick from "blinkstick";

export function bootstrap() {
  const led = blinkstick.findFirst();

  led.blink("#220000", { repeats: 2 }, function () {
    console.log("blinking ended");
    led.setColor("#002200");
  });
}
