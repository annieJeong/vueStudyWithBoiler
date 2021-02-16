<template>
    <div>
        <h1>Hi!! Game Page</h1>
        <ul>
            <li>TicTacToe</li>
            <li>SpeedCheck</li>
            <li>MineSweeper</li>
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
