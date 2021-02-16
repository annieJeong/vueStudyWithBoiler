<template>
    <div class="ball" :style="styleObj">{{ number }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class LottoBall extends Vue {
    @Prop({ required: true, type: Number }) readonly number!: Number

    get styleObj() {
        let background
        if (this.number <= 10) {
            background = 'red'
        } else if (this.number <= 20) {
            background = 'orange'
        } else if (this.number <= 30) {
            background = 'yellow'
        } else if (this.number <= 40) {
            background = 'green'
        } else {
            background = 'blue'
        }
        return {
            background
        }
    }
}
</script>

<style>
.ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
}
</style>
