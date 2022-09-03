const usd = document.getElementById('usd')
const ron = document.getElementById('ron')
const rub = document.getElementById('rub')
const uah = document.getElementById('uah')
const gbp = document.getElementById('gbp')
const eur = document.getElementById('eur')
//usd.textContent = 'usd'
const someDate = 1661900400000
const msPerDay = 86400000
let now = Date.now()
let start = (((now - someDate) / msPerDay).toFixed(0)) * msPerDay + someDate

const url = `https://point.md/curs/methods/money/newrates/?start=${start}&stop=${start}`

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        usd.textContent = data.usd[0][1]
        ron.textContent = data.ron[0][1]
        rub.textContent = data.rub[0][1]
        uah.textContent = data.uah[0][1]
        gbp.textContent = data.gbp[0][1]
        eur.textContent = data.eur[0][1]
    });

