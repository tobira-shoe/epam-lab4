const table = document.querySelector('.data-table tbody')
const barsList = document.querySelector('.bars')
const addButton = document.querySelector('.add-button')
const barTooltip = document.querySelector('.bar-tooltip')

const nextIndex = (() => {
    let i = 1
    return () => i++
})()

function chooseRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

const HEX_VALUES = '0123456789abcdef'
function randomHex() {
    const hex = '------'.split('').map(() => chooseRandom(HEX_VALUES)).join('')

    return '#' + hex
}

function randomScore() {
    return Math.random() * 40 + 60
}

function newStudent() {
    return {
        id: nextIndex(),
        name: chooseRandom(['Joe', 'Bob', 'Maria', 'Helen', 'Tacica', 'Robert', 'Arbert', 'Ginna', 'Elza', 'Lue', 'Summer', 'Choe', 'Betty']),
        score: randomScore(),
    }
}

function removeStudent(id) {
    const bar = document.querySelector(`.bars [data-id='${id}']`)
    const row = document.querySelector(`.data-table tbody [data-id='${id}']`)

    barsList.removeChild(bar)
    table.removeChild(row)
}

function buildBar(student) {
    const bar = document.createElement('div')
    bar.classList.add('bar')
    bar.dataset.id = student.id


    const barBlock = document.createElement('div')
    barBlock.classList.add('bar__block')
    barBlock.style.height = `${student.score}px`
    barBlock.style.backgroundColor = randomHex()
    barBlock.addEventListener('mousemove', (e) => {
        barTooltip.style.top = `${e.pageY + 10}px`
        barTooltip.style.left = `${e.pageX + 10}px`
    })
    barBlock.addEventListener('mouseleave', () => {
        barTooltip.style.visibility = 'hidden'
    })

    barBlock.addEventListener('mouseenter', () => {
        barTooltip.style.visibility = 'visible'
        barTooltip.innerText = student.score.toFixed(1)
    })


    const barTick = document.createElement('div')
    barTick.classList.add('bar__tick')
    barTick.innerText = student.name


    bar.appendChild(barBlock)
    bar.appendChild(barTick)

    return bar
}

function buildRow(student) {
    const tr = document.createElement('tr')
    tr.dataset.id = student.id


    const th = document.createElement('th')
    th.scope = 'row'
    th.innerText = `${student.id}`
    tr.appendChild(th)


    const td1 = document.createElement('td')
    td1.innerText = student.name
    td1.dataset.name = student.name
    tr.appendChild(td1)


    const td2 = document.createElement('td')
    td2.innerText = student.score.toFixed(1)
    td2.dataset.score = student.score.toFixed(1)
    tr.appendChild(td2)


    const removeButton = document.createElement('button')
    removeButton.classList.add('data-table__remove-button', 'btn', 'btn-danger')
    removeButton.innerText = 'X'
    removeButton.addEventListener('click', () => {
        // table.removeChild(tr)
        removeStudent(student.id)
    })

    const td3 = document.createElement('td')
    td3.appendChild(removeButton)
    tr.appendChild(td3)


    return tr
}

function addNewStudent() {
    const student = newStudent()

    const row = buildRow(student)
    const bar = buildBar(student)

    table.appendChild(row)
    barsList.appendChild(bar)
}



addButton.addEventListener('click', () => {
    addNewStudent()
})
addNewStudent()
addNewStudent()
addNewStudent()