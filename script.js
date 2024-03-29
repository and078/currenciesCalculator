const someDate = 82800000 //23:00 1.01.1970
const msPerDay = 86400000
let today = (Math.trunc((Date.now() - someDate) / msPerDay)) * msPerDay + someDate
let weekAgo = today - (msPerDay * 7) 
const currenciesInMDL = {}
let current = ''
let allData = {}

document.getElementById('date').textContent = new Date(Date.now()).toLocaleDateString()
document.getElementById('mdl').value = 100

const inputs = document.querySelectorAll('.form-control')

const url = `https://point.md/curs/methods/money/newrates/?start=${weekAgo}&stop=${today}`

async function fetchUrl(url){
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Object.keys(data).forEach(c => {
                console.log(c);
                currenciesInMDL[c] = data[c][6][1];
            })
            currenciesInMDL['mdl'] = 1
            allData = structuredClone(data)
            allData['mdl'] = allData['usd'].map(x => x.slice())
            allData['mdl'].forEach(d => {
                d[1] = (1 / d[1])
            })
        })
    initFieldsFill()
}

fetchUrl(url)

const initFieldsFill = () => {
    inputs.forEach(el => {
        document.getElementById(el.id).value = +((document.getElementById('mdl').value) * (currenciesInMDL['mdl'] / currenciesInMDL[el.id])).toFixed(4)
    })
}

const validateFloat = (input) => {
    let lastChar = input.value.slice(-1)
    if(!((lastChar.charCodeAt() >= 48) && (lastChar.charCodeAt() <= 57) || (lastChar.charCodeAt() == 46)) || input.value.split('.').length > 2) {
        input.value = input.value.slice(0, -1)
    }
}

const onChangeAnyInput = (currentCurrency) => {
    validateFloat(currentCurrency)
    let currentInp = parseFloat(document.getElementById(currentCurrency.id).value)
    let withoutCurrent = Array.from(inputs).filter(el => el.id !== currentCurrency.id)
    if(!isNaN(currentInp)) {
        withoutCurrent.forEach(el => {
            document.getElementById(el.id).value = +(currentInp * ((currenciesInMDL[currentCurrency.id]) / (currenciesInMDL[el.id]))).toFixed(4)
        })
    }
}

const onFocusInput = (currentCurrency) => {
    current = currentCurrency['id']
    setRates(myChart, allData[current])
    setLabel(myChart, current.toUpperCase())
}

const setLabel = (chart, label) => {
    chart.data.datasets[0].label = label
    chart.update()
}

const setRates = (chart, rates) => {
    chart.data.datasets[0].data.forEach((el, i) => {
        chart.data.datasets[0].data[i] = (rates[i][1])
    })
    chart.update()
}


//chart

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        //labels: [0, 0, 0, 0, 0, 0, 0],
        labels: [
            `${new Date(Date.now() - msPerDay * 6 ).toLocaleDateString()}`, 
            `${new Date(Date.now() - msPerDay * 5 ).toLocaleDateString()}`, 
            `${new Date(Date.now() - msPerDay * 4 ).toLocaleDateString()}`, 
            `${new Date(Date.now() - msPerDay * 3 ).toLocaleDateString()}`, 
            `${new Date(Date.now() - msPerDay * 2 ).toLocaleDateString()}`, 
            `${new Date(Date.now() - msPerDay ).toLocaleDateString()}`, 
            `${new Date(Date.now() ).toLocaleDateString()}`, 
        ],
        datasets: [{
            label: '',
            data: [0, 0, 0, 0, 0, 0, 0],
            tension: 0.3,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(0, 99, 232, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(0, 99, 232, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});
