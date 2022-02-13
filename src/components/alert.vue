<template>
  <div :class="[store.className]">
    <p>{{ store.msg }}</p>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "Alert",

  data() {
    return {
      store,
    };
  },
};
</script>