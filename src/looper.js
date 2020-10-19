export const states = {
  INITIAL: "INITIAL",
  STOPPED: "STOPPED",
  RECORDING: "RECORDING",
  PLAYING: "PLAYING",
};

export function bootstrap({ time, blinkstick, midi, keyboard }) {
  let state = null;
  setState(states.INITIAL);

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

    blinkstick.setState(newState);
  }

  function recordPlay() {
    switch (state) {
      case states.INITIAL:
        start = time.now();
        setState(states.RECORDING);
        break;
      case states.STOPPED:
        setState(states.PLAYING);
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
    if (state === states.INITIAL) return;
    endLoop();
    setState(states.STOPPED);
  }

  midi.onMessage((msg) => {
    if (!state === states.RECORDING) return;

    let when;
    if (length) {
      when = time.now() % length;
    } else {
      when = time.now() - start;
    }

    console.log("save message", msg);
  });

  keyboard.onKey((key) => {
    switch (key) {
      case "space":
        recordPlay();
        break;
      case "b":
        stop();
        break;
    }
  });
}
