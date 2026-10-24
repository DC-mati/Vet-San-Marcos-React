import { describe, expect, it } from 'vitest'
import { formatoPrecio } from './formatoPrecio'

describe('formatoPrecio', () => {
  it('formatea montos en pesos chilenos', () => {
    expect(formatoPrecio(15000)).toContain('15')
    expect(formatoPrecio(15000)).toMatch(/\$/)
  })

  it('trata valores inválidos como cero', () => {
    expect(formatoPrecio(undefined)).toContain('0')
  })
})
