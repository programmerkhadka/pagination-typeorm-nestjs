export class DataResponse<T> {
  readonly data: T;
  constructor(data: T) {
    if (data === undefined) {
      this.data = null;
    } else {
      this.data = data;
    }
  }
}
