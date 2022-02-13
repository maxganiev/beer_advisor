<template>
  <section class="loader" :style="{ display: store.loaderIsVisible }">
    <img
      v-bind:src="'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'"
      alt="loader image"
    />
  </section>
</template>

<script>
import { store } from "../store";

export default {
  name: "Loader",
  data() {
    return {
      store,
    };
  },
};
</script>
