<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td
                v-for="(cellData, cellIndex) in rowData"
                :key="cellIndex"
                :style="cellDataStyle(rowIndex, cellIndex)"
                @click.right.prevent="onRightClickTd(rowIndex, cellIndex)"
                @click.left.prevent="onClickTd(rowIndex, cellIndex)"
                @mousewheel="onRightClickTd(rowIndex, cellIndex)"
            >
                {{ cellDataText(rowIndex, cellIndex) }}
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mineSweeperModule, CODE } from '@stores/modules/mineSweeper'

@Component
export default class TableCompnent extends Vue {
    get halted() {
        return mineSweeperModule.halted
    }
    get tableData(): Array<Array<number>> {
        return mineSweeperModule.tableData
    }
    cellDataStyle(rowIndex: number, cellIndex: number) {
        switch (this.tableData[rowIndex][cellIndex]) {
            case CODE.MINE:
            case CODE.NORMAL:
                return {
                    background: '#ddd'
                }
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
                return {
                    background: 'white'
                }
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                return {
                    background: 'red'
                }
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return {
                    background: 'yellow'
                }
            default:
                return {}
        }
    }
    cellDataText(rowIndex: number, cellIndex: number) {
        switch (this.tableData[rowIndex][cellIndex]) {
            case CODE.MINE:
                return 'X'
            case CODE.NORMAL:
            case 0:
                return ''
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                return '!'
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return '?'
            case CODE.CLICKED_MINE:
                return '펑'
            default:
                return this.tableData[rowIndex][cellIndex]
        }
    }

    //methods
    onClickTd(rowIndex: number, cellIndex: number) {
        if (this.halted) return
        switch (this.tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
                mineSweeperModule.openCell({ row: rowIndex, cell: cellIndex })
                return
            case CODE.MINE:
                mineSweeperModule.clickMine({ row: rowIndex, cell: cellIndex })
                return
            default:
        }
    }
    onRightClickTd(rowIndex: number, cellIndex: number) {
        if (this.halted) return
        switch (this.tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                mineSweeperModule.flagCell({ row: rowIndex, cell: cellIndex })
                return
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                mineSweeperModule.questionCell({ row: rowIndex, cell: cellIndex })
                return
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                mineSweeperModule.normalizeCell({ row: rowIndex, cell: cellIndex })
                return
            default:
        }
    }
}
</script>

<style></style>
