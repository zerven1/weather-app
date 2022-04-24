<template>
  <div class="hello">
    testowa wiadomość
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router'

Vue.use(VueRouter)
@Component({
})
export default class HelloWorld extends Vue {
   @Prop() private msg!: string;
}
</script>

