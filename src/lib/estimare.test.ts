import { describe, it, expect } from 'vitest'
import { calculeazaEstimare } from './estimare'

describe('calculeazaEstimare', () => {
  it('calculates area correctly: 4m × 3m = 12m²', () => {
    const result = calculeazaEstimare({ latime: 4, inaltime: 3, tip: 'rezidential' })
    expect(result.suprafata).toBe(12)
  })

  it('calculates residential price range: 12m² = 1080–1320 EUR', () => {
    const result = calculeazaEstimare({ latime: 4, inaltime: 3, tip: 'rezidential' })
    expect(result.min).toBe(1080)
    expect(result.max).toBe(1320)
  })

  it('applies 10% commercial surcharge: 12m² commercial = 1188–1452 EUR', () => {
    const result = calculeazaEstimare({ latime: 4, inaltime: 3, tip: 'comercial' })
    expect(result.min).toBe(1188)
    expect(result.max).toBe(1452)
  })

  it('returns Romanian-formatted display string', () => {
    const result = calculeazaEstimare({ latime: 4, inaltime: 3, tip: 'rezidential' })
    expect(result.display).toContain('1.080')
    expect(result.display).toContain('1.320')
    expect(result.display).toContain('EUR')
  })

  it('handles decimal dimensions: 2.5 × 3.2 = 8m²', () => {
    const result = calculeazaEstimare({ latime: 2.5, inaltime: 3.2, tip: 'rezidential' })
    expect(result.suprafata).toBe(8)
    expect(result.min).toBe(720)
    expect(result.max).toBe(880)
  })

  it('throws for zero width', () => {
    expect(() => calculeazaEstimare({ latime: 0, inaltime: 3, tip: 'rezidential' })).toThrow()
  })

  it('throws for negative height', () => {
    expect(() => calculeazaEstimare({ latime: 4, inaltime: -1, tip: 'rezidential' })).toThrow()
  })
})
