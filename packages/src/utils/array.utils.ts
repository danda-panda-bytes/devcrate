/**
 * Get unique values from an array
 * @example
 * uniq([1,2,2,3]) // => [1,2,3]
 */
export function uniq <A>(arr: A[]): A[] {
  return [ ...new Set(arr) ]
}

/**
 * Diff two arrays efficiently
 * @example
 * diff([ 1, 2, 3 ], [ 2, 3 ]) // => [ 1 ]
 */
export function diff<T>(a: T[], b: T[]): T[] {
  const arr = []
  let l: number = a.length
  while (l--) {
    if (b.indexOf(a[l]) === -1) {
      arr.unshift(a[l])
    }
  }
  return arr
}

/**
 * Get the intersection of two arrays
 * @example
 * intersection([ 1, 2 ], []) // => []
 * intersection([ 1, 2, 3 ], [1, 2]) // => [ 1, 2 ]
 */
export function intersection <T>(xs: T[], ys: T[]): T[] {
  return uniq(xs.filter((el) => ys.includes(el)))
}

/**
 * Get the union of any amount of arrays
 * @example
 * union([ 1, 2, 3 ], [ 2, 3, 4 ]) // => [ 1, 2, 3, 4 ]
 */
export function union<A>(...xs: Array<A[]>): A[] {
  return uniq([].concat.apply([], xs))
}

export function last<T = any>(arr: T[]): T {
  if (!arr) { return null }
  if (arr.length === 0) { return null }
  return arr[arr.length - 1]
}

export function first<T = any>(arr: T[]): T {
  if (!arr) { return null }
  if (arr.length === 0) { return null }
  return arr[0]
}
