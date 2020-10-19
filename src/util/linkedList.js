export function bootstrap() {
  const head = bootstrapItem({ _type: "HEAD", when: 0 });

  function insertBefore(item, newItem) {
    // can't insert before HEAD
    if (item === head) {
      insetAfter(item);
    }

    const newListItem = bootstrapItem(newItem);
    newListItem.setPrev(item.prev());
    if (item.prev()) {
      item.prev().setNext(newListItem);
    }
    item.setPrev(newListItem);
  }

  function insertAfter(item, newItem) {
    const newListItem = bootstrapItem(newItem);
    newListItem.setNext(item.next());
    if (item.next()) {
      item.next().setPrev(newListItem);
    }
    item.setNext(newListItem);
  }

  function reset() {
    head.setNext(null);
  }

  return {
    head: () => head,
    insertBefore,
    insertAfter,
    reset,
  };
}

function bootstrapItem(newItem = null) {
  let prev = null;
  let next = null;
  let item = newItem;

  function setNext(newNext) {
    next = newNext;
  }

  function setPrev(newPrev) {
    prev = newPrev;
  }
  return {
    setPrev,
    setNext,
    prev: () => prev,
    next: () => next,
    item: () => item,
  };
}
