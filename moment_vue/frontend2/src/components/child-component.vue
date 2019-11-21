<template>
  <div>
    <button @click="sendEvent()">Print11</button>
  </div>
</template>

<script>
export default {
  name: "child-component",
  props: {
    parentMessage: {
      type: String,
      default: void 0
    },
    message: {
      type: String,
      default: void 0
    }
  },
  methods: {
    sendEvent() {
      this.$emit("print", this.parentMessage);
    }
  }
};
</script>
