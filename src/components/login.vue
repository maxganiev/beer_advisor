<template>
  <section class="login" :style="{ display: store.loginFormIsVisible }">
    <label for="inputEmail"> Enter email of a registered user </label>
    <input type="email" ref="inputEmail" id="inputEmail" />

    <label for="inputPass"> Enter a password </label>
    <input type="text" ref="inputPass" id="inputPass" />

    <button class="btn btn-submit" ref="btnSubmit" v-on:click="login">
      Enter
    </button>
  </section>
</template>

<script>
import { store } from "../store";

export default {
  name: "Login",

  data() {
    return {
      store,
    };
  },

  mounted() {
    if (localStorage.getItem("userLoginFormIsVisible")) {
      store.setLoginFormVisibility(
        localStorage.getItem("userLoginFormIsVisible")
      );
      localStorage.getItem("userLoginFormIsVisible") === "flex" &&
        store.setAlert(
          "alert-hint",
          "A hint: peek into localStorage: user object for details",
          this.$refs.btnSubmit
        );
    } else {
      store.setLoginFormVisibility("flex");
      store.setAlert(
        "alert-hint",
        "A hint: peek into localStorage: user object for details",
        this.$refs.btnSubmit
      );
    }
  },

  methods: {
    login(e) {
      if (localStorage.getItem("user")) {
        if (
          this.$refs.inputEmail.value ===
            JSON.parse(localStorage.getItem("user")).email &&
          this.$refs.inputPass.value ===
            JSON.parse(localStorage.getItem("user")).password
        ) {
          store.setLoginFormVisibility("none");

          localStorage.setItem("userLoginFormIsVisible", "none");
        } else {
          store.setAlert("alert-authErr", "Enter correct details", e.target);
        }
      }
    },
  },
};
</script>