<template>
    <div>
        <mine-form></mine-form>
        <div>{{ timer }}</div>
        <table-component></table-component>
        <div v-if="result">{{ result }}</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import MineForm from './component/mineForm.vue'
import TableComponent from './component/tableComponent.vue'
import { mineSweeperModule } from '@stores/modules/mineSweeper'

let interval: any
@Component({
    components: {
        MineForm,
        TableComponent
    }
})
export default class MineSweeper extends Vue {
    get halted() {
        return mineSweeperModule.halted
    }
    get timer() {
        return mineSweeperModule.timer
    }
    get result() {
        return mineSweeperModule.result
    }
    @Watch('halted')
    watchHalted(v: boolean, oldV: boolean) {
        if (!v) {
            interval = setInterval(() => {
                mineSweeperModule.incrementTimer()
            }, 1000)
        } else {
            clearInterval(interval)
        }
    }

    //
    beforeDestroy() {
        clearInterval(interval)
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
