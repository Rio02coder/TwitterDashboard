import AsyncStorage from '@react-native-async-storage/async-storage';

class Memory<T> {
  private MEMORY_STRING;

  constructor(tokenString: string) {
    this.MEMORY_STRING = tokenString;
  }

  /**
   * This function returns if the token is null or not
   * If null then it returns false
   * else true
   */
  public isDataValid(data: string | null): boolean {
    return data !== null;
  }

  public deleteData = () => {
    AsyncStorage.removeItem(this.MEMORY_STRING);
  };

  public getData = () => {
    return AsyncStorage.getItem(this.MEMORY_STRING)
      .then(data =>
        this.isDataValid(data) ? (JSON.parse(data as string) as T) : undefined,
      )
      .catch(() => {});
  };

  public setData(data: T) {
    AsyncStorage.setItem(this.MEMORY_STRING, JSON.stringify(data))
      .then(() => true)
      .catch(() => false);
  }
}

export default Memory;
