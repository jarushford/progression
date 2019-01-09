import { daysInPreviousMonth } from '../daysInPreviousMonth'

describe('daysInPreviousMonth', () => {
  it('should return the number of days in the previous month', () => {
    const expected = [30, 31, 28, 29]
    const result = daysInPreviousMonth()

    expect(expected).toContain(result)
  })
})