<template>
    <div>
        <div>{{ turnMessage }}</div>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{ cellData }}</td>
            </tr>
        </table>

        <div v-if="winner">{{ winner }}님의 승리.</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { GameModule } from '@/stores/modules/game'

@Component
export default class TicTacToe extends Vue {
    //data

    //computed
    get tableData(): Array<Array<String>> {
        return GameModule.tableData
    }
    get turn(): String {
        return GameModule.turn
    }
    get winner(): String {
        return GameModule.winner
    }
    get turnMessage(): String {
        return this.turn + '의 턴입니다.'
    }

    mounted() {
        console.log('TicTacToe Mounted')
    }
    //methods
    onClickTd(rowIndex: number, cellIndex: number) {
        if (this.tableData[rowIndex][cellIndex]) return
        GameModule.clickCell({ rowIndex, cellIndex })

        let win = false
        if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
            // 가로
            win = true
        }
        if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
            //세로
            win = true
        }
        if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
            //좌>우 방향대각선
            win = true
        }
        if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
            //우>좌 방향 대각선
            win = true
        }
        if (win) {
            // this.$store.commit(SET_WINNER, this.turn)
            GameModule.setWinner()
            // this.$store.commit(RESET_GAME)
            GameModule.reset()
        } else {
            let fullFill = true
            this.tableData.forEach(row => {
                row.forEach(cell => {
                    if (!cell) {
                        fullFill = false
                        return
                    }
                })
                if (!fullFill) {
                    return
                }
            })
            if (fullFill) {
                //무승부
                // this.$store.commit(NO_WINNER)
                GameModule.drawGame()
                // this.$store.commit(RESET_GAME)
                GameModule.reset()
            } else {
                // this.$store.commit(CHANGE_TURN)
                GameModule.changeTurn()
            }
        }
    }
}
</script>

<style lang="scss">
table {
    border-collapse: collapse;
}
td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>
