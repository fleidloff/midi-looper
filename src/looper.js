export const states = {
  STOPPED: "STOPPED",
  RECORDING: "RECORDING",
  PLAYING: "PLAYING",
};

export function bootstrap({ time, blinkstick }) {
  let state = states.STOPPED;
  let start = null;
  let end = null;
  let length = null;

  function endLoop() {
    if (end) {
      return;
    }
    end = time.now();
    length = end - start;
    console.log("loop ended; length", length);
  }

  function setState(newState) {
    state = newState;

    switch (newState) {
      case states.STOPPED:
        if (length) {
          blinkstick.setColor("#000022");
        } else {
          blinkstick.setColor("#000000");
        }
        break;
      case states.RECORDING:
        blinkstick.setColor("#220000");
        break;
      case states.PLAYING:
        blinkstick.setColor("#002200");
        break;
    }
  }

  function recordPlay() {
    switch (state) {
      case states.STOPPED:
        start = start || time.now();
        setState(states.RECORDING);
        break;
      case states.RECORDING:
        endLoop();
        setState(states.PLAYING);
        break;
      case states.PLAYING:
        setState(states.RECORDING);
        break;
    }
  }

  function stop() {
    endLoop();
    setState(states.STOPPED);
  }

  function handleKey(key) {
    switch (key) {
      case "space":
        recordPlay();
        break;
      case "b":
        stop();
        break;
    }
  }

  return {
    handleKey,
  };
}
