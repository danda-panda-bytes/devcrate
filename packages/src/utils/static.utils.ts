/**
 * This is a decorator used on any EnvUtils class
 *
 * @returns Enforce type on a static property for a class
 */
export function StaticExtends<T>() {
  return <U extends T>(constructor: U) => { constructor }
}
