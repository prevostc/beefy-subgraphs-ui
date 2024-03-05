// force resolve Pick<T, K>
// https://stackoverflow.com/a/69976234
export type Noop<T> = T extends (...args: any[]) => any
  ? T
  : T extends abstract new (...args: any[]) => any
    ? T
    : { [K in keyof T]: T[K] };
