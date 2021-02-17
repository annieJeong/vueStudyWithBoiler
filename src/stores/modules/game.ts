import Vue from 'vue'
import store from '@/stores/index'
import { Module, VuexModule, MutationAction, getModule, Mutation, Action } from 'vuex-module-decorators'
import CardService, { CardResponse } from '@/services/card'

@Module({ dynamic: true, name: 'game', namespaced: true, store })
class Game extends VuexModule {
    //state
    gameList: CardResponse[] = []

    //mutation
    @MutationAction({ mutate: ['gameList'] })
    async getGameList() {
        const gameList = await new CardService().getCardAll()
        return {
            gameList
        }
    }

    tableData: Array<Array<String>> = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    turn: String = 'O'
    winner: String = ''

    //mutation
    @Mutation
    CLICK_CELL(data: { rowIndex: number; cellIndex: number }) {
        // this.tableData[data.rowIndex][data.cellIndex] = this.turn
        Vue.set(this.tableData[data.rowIndex], data.cellIndex, this.turn)
    }
    @Mutation
    RESET() {
        this.turn = 'O'
        this.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }
    @Mutation
    SET_WINNER() {
        this.winner = this.turn
    }
    @Mutation
    DRAW_GAME() {
        this.winner = ''
    }
    @Mutation
    CHANGE_TURN() {
        this.turn = this.turn === 'O' ? 'X' : 'O'
    }

    //Action
    @Action
    clickCell(data: { rowIndex: number; cellIndex: number }) {
        this.CLICK_CELL(data)
    }
    @Action
    reset() {
        this.RESET()
    }
    @Action
    changeTurn() {
        this.CHANGE_TURN()
    }
    @Action
    setWinner() {
        this.SET_WINNER()
    }
    @Action
    drawGame() {
        this.DRAW_GAME()
    }
}

export const GameModule = getModule(Game)
