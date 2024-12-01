<template>
  <div>Hello World</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  mounted() {
    console.log("Hello World");
  },
});
</script>