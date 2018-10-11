const { EventEmitter } = require('events');

class DbWatcher extends EventEmitter {
  constructor(getAsyncImplementation) {
    super();
    this.watchedKeys = [];
    this.interval = 2000;
    this.getAsync = getAsyncImplementation;
    setInterval(this.checkSubscriptions.bind(this), this.interval);
  }

  async checkSubscriptions() {
    for (const watchedKey of this.watchedKeys) {
      const data = JSON.parse(await this.getAsync(watchedKey));

      if (data && data.status === 'success') {
        this.emit(watchedKey);
        this.watchedKeys = this.watchedKeys.filter(key => key !== watchedKey);
      }
    }
  }

  addSubscription(userId) {
    if (this.watchedKeys.indexOf(userId) < 0) {
      console.log(` [DEBUG] : WATCHING FOR KEY ${userId}`);
      this.watchedKeys.push(userId);
    }
  }
}

module.exports = {
  DbWatcher,
};
