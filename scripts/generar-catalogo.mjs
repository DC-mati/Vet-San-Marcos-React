import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, '../../fullstack2-subir-assets/js/data.js')
const src = fs.readFileSync(dataPath, 'utf8')
const marker = 'window.VET_DATA = '
const start = src.indexOf(marker)
const braceStart = src.indexOf('{', start)
let depth = 0
let end = braceStart
for (let i = braceStart; i < src.length; i += 1) {
  if (src[i] === '{') depth += 1
  if (src[i] === '}') depth -= 1
  if (depth === 0) {
    end = i
    break
  }
}
const objStr = src.slice(braceStart, end + 1)
const data2 = Function(`return ${objStr}`)()

const out = `// Datos iniciales oficiales (Excel / caso Veterinaria San Marcos)
// Los cambios del usuario se guardan en localStorage mediante services.

export const clinica = ${JSON.stringify(data2.clinic, null, 2)}

export const serviciosIniciales = ${JSON.stringify(data2.services, null, 2)}

export const medicamentosIniciales = ${JSON.stringify(data2.stock, null, 2)}

export const pacientesIniciales = ${JSON.stringify(data2.patients, null, 2)}

export const citasIniciales = ${JSON.stringify(data2.appointments, null, 2)}

export const usuariosIniciales = ${JSON.stringify(data2.users, null, 2)}
`

fs.writeFileSync(path.join(__dirname, '../src/data/catalogoInicial.js'), out)
console.log('OK', data2.services.length, data2.stock.length)
