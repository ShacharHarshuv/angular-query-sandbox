export function timeoutAsPromise(
  msDelay?: number,
  value?: undefined,
): Promise<void>;
export function timeoutAsPromise<T>(msDelay: number, value: T): Promise<T>;
export function timeoutAsPromise(
  msDelay: number = 0,
  value?: any,
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), msDelay);
  });
}
