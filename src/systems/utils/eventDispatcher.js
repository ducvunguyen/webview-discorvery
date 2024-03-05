class Dispatcher {
  constructor() {
    this.listeners = [];
    this.incrementId = 1;
  }

  addEventListener(event, callback) {
    let id = this.incrementId;

    this.listeners.push({
      id,
      event,
      callback,
    });

    this.incrementId++;

    return id;
  }

  /**
   * @return {Function} remove listener (react hooks)
   */
  listen(event, callback) {
    const listenerIds = [this.addEventListener(event, callback)];

    return () => {
      this.listeners = this.listeners.filter((listener) => !listenerIds.includes(listener.id));
    };
  }

  dispatch(event, payload) {
    this.listeners.forEach((listener) => {
      if (event === listener.event) {
        listener.callback(event, payload);
      }
    });
  }
}

const eventDispatcher = new Dispatcher();

export default eventDispatcher;
