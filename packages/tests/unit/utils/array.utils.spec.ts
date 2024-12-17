import { diff, union, intersection } from '@devcrate/utils'

describe('array.utils', () => {
  it('union', () => {
    expect(union([], [1, 2])).toEqual([1, 2])
    expect(union([3, 4], [1, 2])).toEqual([3, 4, 1, 2])
    expect(union([1], [1, 2])).toEqual([1, 2])
    expect(union([1], [1, 2], [1, 2])).toEqual([1, 2])
  })

  it('intersection', () => {
    expect(intersection([], [1, 2])).toEqual([])
    expect(intersection([3, 4], [1, 2])).toEqual([])
    expect(intersection([1], [1, 2])).toEqual([1])
  })

  it('diff', () => {
    expect(diff([1, 2, 3], [2, 3])).toEqual([1])
  })
})
