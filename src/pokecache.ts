export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache<T> {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val as T;
  }

  has(key: string): boolean {
    return this.#cache.has(key);
  }

  remove(key: string) {
    this.#cache.delete(key);
  }

  #reap() {
    this.#cache.forEach((value, key) => {
      const cutoff = Date.now() - this.#interval;
      if (value.createdAt < cutoff) {
        this.remove(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  printKeys() {
    for (const key of this.#cache.keys()) {
      console.log(key);
    }
  }
}
