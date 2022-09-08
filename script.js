const someDate = 82800000
const msPerDay = 86400000
let start = (Math.trunc((Date.now() - someDate) / msPerDay)) * msPerDay + someDate

const url = `https://point.md/curs/methods/money/newrates/?start=${start}&stop=${start}`

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        ['usd', 'ron', 'rub', 'uah', 'gbp', 'eur'].forEach((c) => {
            document.getElementById(c).textContent = data[c][0][1]
        })
    });