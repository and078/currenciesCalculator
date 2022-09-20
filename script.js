import fn from "./modules/diagramm.js"

fn()

const someDate = 82800000
const msPerDay = 86400000
let start = (Math.trunc((Date.now() - someDate) / msPerDay)) * msPerDay + someDate
const currenciesInMDL = {}
document.getElementById('date').textContent = new Date(Date.now()).toLocaleDateString()
document.getElementById('mdl').value = 100

const inputs = document.querySelectorAll('.form-control')

const url = `https://point.md/curs/methods/money/newrates/?start=${start}&stop=${start}`

async function fetchUrl(url){
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            Reflect.ownKeys(data).forEach(c => {
                currenciesInMDL[c] = data[c][0][1]
            })
            currenciesInMDL['mdl'] = 1
        })
    initFieldsFill()    
}

fetchUrl(url)

const initFieldsFill = () => {
    inputs.forEach(el => {
        document.getElementById(el.id).value = +((document.getElementById('mdl').value) * (currenciesInMDL['mdl'] / currenciesInMDL[el.id])).toFixed(4)
    })
}

const onChangeAnyInput = (currentCurrency) => {
    let currentInp = +(document.getElementById(currentCurrency.id).value)
    inputs.forEach(el => {
        document.getElementById(el.id).value = +(currentInp * (currenciesInMDL[currentCurrency.id] / currenciesInMDL[el.id])).toFixed(4)
    })
}

inputs.forEach( el => el.addEventListener('input', () => {
    onChangeAnyInput(el)
}))