export type ThrottleFunction = (...args: any[]) => void;

export function throttle(
  fn: ThrottleFunction,
  delay: number,
): ThrottleFunction {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: any[]) {
    const now = Date.now();

    if (now - lastCallTime < delay) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          lastCallTime = now;
          fn(...args);
        },
        delay - (now - lastCallTime),
      );
    } else {
      lastCallTime = now;
      fn(...args);
    }
  };
}
