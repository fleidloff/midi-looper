import { bootstrap as bootstrapLinkedList } from "./util/linkedList.js";

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
  let length = null;

  function endLoop() {
    if (length) {
      return;
    }
    const end = time.now();
    length = end - start;
    current = messages.head();
    handleStep();
    console.log("loop ended; length", length);
  }

  function setState(newState) {
    state = newState;

    blinkstick.setState(newState);
  }

  function recordPlay() {
    switch (state) {
      case states.INITIAL:
        setState(states.RECORDING);
        runLoop();
        break;
      case states.STOPPED:
        setState(states.PLAYING);
        runLoop();
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
    stopLoop();
    setState(states.STOPPED);
  }

  let messages = bootstrapLinkedList();
  let current = null;

  function runLoop() {
    start = time.now();
    current = messages.head();

    handleStep();
  }

  function handleStep() {
    if (state !== states.PLAYING && state !== states.RECORDING) return;
    setTimeout(
      () => {
        midi.send(current.item());
        current = current.next();
        if (current) {
          handleStep();
        } else {
          current = messages.head();
          if (length) {
            setTimeout(
              () => handleStep(),
              Math.max((length - (time.now() % length)) / 1000, 0)
            );
          }
        }
      },
      Math.max((current.item().when - (time.now() % length)) / 1000),
      0
    );
  }

  function stopLoop() {
    start = null;
  }

  midi.onMessage((msg) => {
    if (state !== states.RECORDING) return;

    let when;
    if (length) {
      when = (time.now() - start) % length;
    } else {
      when = time.now() - start;
    }

    console.log("insert after", when, length);
    if (current.item().when < when) {
      messages.insertAfter(current, { ...msg, when });
    } else {
      messages.insertBefore(current, { ...msg, when });
    }
    current = current.next();
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
