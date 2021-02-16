<template>
    <div>
        <div>당첨 숫자</div>
        <div id="result">
            <lotto-ball v-for="ball in winBalls" :key="ball.index" v-bind:number="ball"></lotto-ball>
        </div>
        <template v-if="bonus">
            <div>보너스</div>
            <lotto-ball v-bind:number="bonus"></lotto-ball>
            <button v-if="redo" @click.prevent="onClickRedo">한번 더!</button>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import lottoBall from './component/lottoBall.vue'

function getLottoNumbers() {
    //45개의 임의 숫자 랜덤정렬 후 앞 6자리 당첨번호 보너스 볼은 마지막 번호
    const candidate = new Array(45).fill(0).map((v: number, i: number) => i + 1)
    const order = []
    while (order.length < 45) {
        // order.length < 45
        order.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonus = order[order.length - 1]
    const winBalls = order.slice(0, 6).sort((a, b) => a - b)
    return [...winBalls, bonus]
}
const timeouts: Array<any> = []

@Component({
    components: {
        'lotto-ball': lottoBall
    }
})
export default class LottoGenerate extends Vue {
    winBalls: Array<Number> = []
    winNumbers: Array<Number> = getLottoNumbers()
    bonus: Number | null = null
    redo = false

    mounted() {
        console.log('mounted')
        // this.winBalls = getLottoNumbers()
        this.showBalls()
    }
    beforeDestroy() {
        console.log('beforeDestroy')
        timeouts.forEach(v => clearTimeout(v))
    }
    @Watch('redo')
    watchRedo() {
        if (!this.redo) {
            this.showBalls()
        }
    }

    //methods
    onClickRedo() {
        this.winBalls = []
        this.winNumbers = getLottoNumbers()
        this.bonus = null
        this.redo = false
        // this.showBalls()
    }
    showBalls() {
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
            timeouts.push(
                setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i])
                }, (i + 1) * 1000)
            )
        }
        timeouts.push(
            setTimeout(() => {
                this.bonus = this.winNumbers[this.winNumbers.length - 1]
                this.redo = true
            }, 7000)
        )
    }
}
</script>

<style></style>
