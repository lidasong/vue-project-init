<template>
  <div>
    <h2 :class="['test']">The Vue Project with element-ui</h2>
    <ElButton type="primary" @click.native="resetText">{{ text }}</ElButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'this is text'
    }
  },
  methods: {
    resetText(event) {
      this.text = Math.random()
    }
  }
}
</script>
<style scoped>
.test {
  color: red;
}
</style>
