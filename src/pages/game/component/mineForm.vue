<template>
    <div>
        <input type="number" placeholder="세로" v-model="row" />
        <input type="number" placeholder="가로" v-model="cell" />
        <input type="number" placeholder="지뢰" v-model="mine" />
        <button @click.prevent="onClickBtn">시작</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mineSweeperModule } from '@/stores/modules/mineSweeper'

@Component
export default class MineForm extends Vue {
    //data
    row: Number = 0
    cell: Number = 0
    mine: Number = 0

    //methods
    onClickBtn() {
        mineSweeperModule.startGame({ row: Number(this.row), cell: Number(this.cell), mine: Number(this.mine) })
    }
}
</script>

<style></style>
