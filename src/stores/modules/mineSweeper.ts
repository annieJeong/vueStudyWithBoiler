import Vue from 'vue'
import store from '@/stores/index'
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
}

const plantMine = (row: number, cell: number, mine: number) => {
    const candidate = Array(row * cell)
        .fill(0)
        .map((a, i) => i)
    const shuffle = []
    while (candidate.length > row * cell - mine) {
        const pick = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        shuffle.push(pick)
    }
    const data = []
    for (let i = 0; i < row; i++) {
        const rowData: Array<number> = []
        data.push(rowData)
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL)
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell)
        const hor = shuffle[k] % cell
        data[ver][hor] = CODE.MINE
    }

    return data
}
interface DataObj {
    row: number
    cell: number
    mine: number
}

@Module({ dynamic: true, name: 'mineSweeper', namespaced: true, store })
class MineSweeper extends VuexModule {
    //state
    tableData: Array<Array<number>> = [[]]
    data!: DataObj
    timer = 0
    halted = true //중단
    result: String = ''
    opendCount = 0

    //mutation
    @Mutation
    START_GAME(data: { row: number; cell: number; mine: number }) {
        this.data = data
        this.tableData = plantMine(data.row, data.cell, data.mine)
        this.timer = 0
        this.halted = false
        this.opendCount = 0
        this.result = ''
    }
    @Mutation
    OPEN_CELL(data: { row: number; cell: number }) {
        let opendCount = 0
        const checked: Array<String> = []
        const checkAround = (row: number, cell: number): void => {
            if (row < 0 || row >= this.tableData.length || cell >= this.tableData[0].length) {
                //row or cell undefined check
                return
            }
            if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(this.tableData[row][cell])) {
                return
            }
            if (checked.includes(row + '/' + cell)) {
                //재검사 방지
                return
            } else {
                checked.push(row + '/' + cell)
            }
            let around: Array<Number> = []
            if (this.tableData[row - 1]) {
                around = around.concat([this.tableData[row - 1][cell - 1], this.tableData[row - 1][cell], this.tableData[row - 1][cell + 1]])
            }
            around = around.concat([this.tableData[row][cell - 1], this.tableData[row][cell + 1]])
            if (this.tableData[row + 1]) {
                around = around.concat([this.tableData[row + 1][cell - 1], this.tableData[row + 1][cell], this.tableData[row + 1][cell + 1]])
            }
            const counted = around.filter(v => {
                return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(Number(v))
            })
            if (counted.length === 0 && row > -1) {
                // 주변칸에 지뢰 X
                const near = []

                if (row - 1 > -1) {
                    if (cell > 0) {
                        near.push([row - 1, cell - 1])
                    }
                    near.push([row - 1, cell])
                    if (cell + 1 < this.tableData[row].length) {
                        near.push([row - 1, cell + 1])
                    }
                }
                if (cell > 0) {
                    near.push([row, cell - 1])
                }
                if (cell + 1 < this.tableData[row].length) {
                    near.push([row, cell + 1])
                }
                if (row + 1 < this.tableData.length) {
                    if (cell > 0) {
                        near.push([row + 1, cell - 1])
                    }
                    near.push([row + 1, cell])
                    if (cell + 1 < this.tableData[row].length) {
                        near.push([row + 1, cell + 1])
                    }
                }
                near.forEach(n => {
                    if (this.tableData[n[0]][n[1]] !== CODE.OPENED) {
                        checkAround(n[0], n[1])
                    }
                })
            }
            if (this.tableData[row][cell] === CODE.NORMAL) opendCount++

            Vue.set(this.tableData[row], cell, counted.length)
            // return counted.length
        }
        checkAround(data.row, data.cell)
        let halted = false
        let result: String = ''
        if (this.data.row * this.data.cell - this.data.mine === this.opendCount + opendCount) {
            halted = true
            result = `${this.timer}초만에 승리!`
        }
        this.opendCount += opendCount
        this.halted = halted
        this.result = result
    }
    @Mutation
    CLICK_MINE(data: { row: number; cell: number }) {
        this.halted = true
        this.result = '실패'
        Vue.set(this.tableData[data.row], data.cell, CODE.CLICKED_MINE)
    }
    @Mutation
    FLAG_CELL(data: { row: number; cell: number }) {
        if (this.tableData[data.row][data.cell] === CODE.MINE) {
            Vue.set(this.tableData[data.row], data.cell, CODE.FLAG_MINE)
        }
        if (this.tableData[data.row][data.cell] === CODE.NORMAL) {
            Vue.set(this.tableData[data.row], data.cell, CODE.FLAG)
        }
    }
    @Mutation
    QUESTION_CELL(data: { row: number; cell: number }) {
        if (this.tableData[data.row][data.cell] === CODE.FLAG_MINE) {
            Vue.set(this.tableData[data.row], data.cell, CODE.QUESTION_MINE)
        }
        if (this.tableData[data.row][data.cell] === CODE.FLAG) {
            Vue.set(this.tableData[data.row], data.cell, CODE.QUESTION)
        }
    }
    @Mutation
    NORMALIZE_CELL(data: { row: number; cell: number }) {
        if (this.tableData[data.row][data.cell] === CODE.QUESTION_MINE) {
            Vue.set(this.tableData[data.row], data.cell, CODE.MINE)
        }
        if (this.tableData[data.row][data.cell] === CODE.QUESTION) {
            Vue.set(this.tableData[data.row], data.cell, CODE.NORMAL)
        }
    }
    @Mutation
    INCREMENT_TIMER() {
        this.timer++
    }

    //Action
    @Action
    startGame(data: { row: number; cell: number; mine: number }) {
        this.START_GAME(data)
    }
    @Action
    openCell(data: { row: number; cell: number }) {
        this.OPEN_CELL(data)
    }
    @Action
    clickMine(data: { row: number; cell: number }) {
        this.CLICK_MINE(data)
    }
    @Action
    flagCell(data: { row: number; cell: number }) {
        this.FLAG_CELL(data)
    }
    @Action
    questionCell(data: { row: number; cell: number }) {
        this.QUESTION_CELL(data)
    }
    @Action
    normalizeCell(data: { row: number; cell: number }) {
        this.NORMALIZE_CELL(data)
    }
    @Action
    incrementTimer() {
        this.INCREMENT_TIMER()
    }
}

export const mineSweeperModule = getModule(MineSweeper)
