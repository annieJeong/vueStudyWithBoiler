<template>
    <div>
        <h1>Hi!! Game Page</h1>
        <ul>
            <li>
                <router-link to="./game/tic-tac-toe">TicTacToe</router-link>
            </li>
            <li>
                <router-link to="./game/lotto-generate">lottoGenerate</router-link>
            </li>
            <li>
                <router-link to="./game/mine-sweeper">MineSweeper</router-link>
            </li>
            <!-- <li>TicTacToe</li> -->
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GamePage extends Vue {
    mounted() {
        console.log('gamePage Mounted')
    }
}
</script>

<style lang="scss"></style>
