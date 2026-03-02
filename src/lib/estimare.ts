export type TipProiect = 'rezidential' | 'comercial'

export interface EstimareInput {
  latime: number
  inaltime: number
  tip: TipProiect
}

export interface EstimareResult {
  suprafata: number
  min: number
  max: number
  display: string
}

const PRET_PER_MP = 100
const MARJA = 0.1
const SURCHARGE_COMERCIAL = 0.1

export function calculeazaEstimare(input: EstimareInput): EstimareResult {
  const { latime, inaltime, tip } = input

  if (latime <= 0 || inaltime <= 0) {
    throw new Error('Dimensiunile trebuie să fie pozitive')
  }

  const suprafata = Math.round(latime * inaltime * 100) / 100
  let pretBaza = suprafata * PRET_PER_MP

  if (tip === 'comercial') {
    pretBaza = pretBaza * (1 + SURCHARGE_COMERCIAL)
  }

  const min = Math.round(pretBaza * (1 - MARJA))
  const max = Math.round(pretBaza * (1 + MARJA))

  // Romanian number format: period as thousands separator
  const fmt = (n: number) => n.toLocaleString('ro-RO')
  const display = `~${fmt(min)} – ${fmt(max)} EUR`

  return { suprafata, min, max, display }
}
