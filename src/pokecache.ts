export type CacheEntry<T> = {
  createdAt: number,
  val: T,
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
  }

  add(key: string, val: T){
    this.#cache.set(key, val);
  }

  get(key: string): CacheEntry<any>{
    return this.#cache.get(key);
  }

  remove(key: string){
    this.#cache.delete(key);
  } 

  #reap() {
    this.#cache.forEach((value: T, key: string, map: Map<string, CacheEntry<any>>) => {
      if(value.createdAt<(Date.now() - this.#interval)){
	this.remove(key);
    }
		       );
  }


}
