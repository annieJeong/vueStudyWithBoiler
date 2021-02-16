import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Card from '@pages/card/index.vue'
import Game from '@pages/game/index.vue'
const ticTacToe = () => import('@pages/game/tictactoe.vue')
const lottoGenerate = () => import('@pages/game/lottoGenerate.vue')
const mineSweeper = () => import('@pages/game/mineSweeper.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/card',
        name: 'Card',
        component: Card
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    },
    {
        path: '/game/tic-tac-toe',
        name: 'ticTacToe',
        component: ticTacToe
    },
    {
        path: '/game/lotto-generate',
        name: 'lottoGenerate',
        component: lottoGenerate
    },
    {
        path: '/game/mine-sweeper',
        name: 'mineSweeper',
        component: mineSweeper
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
