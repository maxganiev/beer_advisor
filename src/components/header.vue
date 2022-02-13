<template>
  <header v-if="initialized">
    <p
      ref="para"
      :style="{
        visibility: store.loginFormIsVisible === 'flex' ? 'hidden' : 'visible',
      }"
    >
      Hi, <i> {{ user.first_name + " " + user.last_name }} </i>!
    </p>
    <input
      type="checkbox"
      class="toggler toggle-checkbox unchecked"
      v-on:change="toggle"
      :style="{
        visibility: store.loginFormIsVisible === 'flex' ? 'hidden' : 'visible',
      }"
    />
    <img
      :src="togglerImg"
      class="toggler toggle-img"
      :style="{
        visibility: store.loginFormIsVisible === 'flex' ? 'hidden' : 'visible',
      }"
    />
    <a
      href="#"
      v-on:click="logout"
      :style="{
        display: store.loginFormIsVisible === 'flex' ? 'none' : 'inline-block',
      }"
    >
      <strong> Logout </strong>
    </a>
  </header>
</template>

<script>
import { store } from "../store";

export default {
  name: "Header",
  data() {
    return {
      store,
      user: null,
      initialized: false,
      togglerImg: require("../assets/bars-staggered-solid.svg"),
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    logout(e) {
      store.setLoginFormVisibility("flex");
      localStorage.setItem("userLoginFormIsVisible", "flex");

      store.setAlert(
        "alert-hint",
        "A hint: peek into localStorage: user object for details",
        e.target
      );
    },

    toggle(e) {
      if (
        Array.from(e.target.classList).some(
          (currClass) => currClass === "unchecked"
        )
      ) {
        e.target.classList.replace("unchecked", "checked");
        this.togglerImg = require("../assets/grip-lines-vertical-solid.svg");

        store.setUserPanelVisibility(true);
      } else {
        e.target.classList.replace("checked", "unchecked");
        this.togglerImg = require("../assets/bars-staggered-solid.svg");

        store.setUserPanelVisibility(false);
      }
    },

    async getUser() {
      try {
        if (!JSON.parse(localStorage.getItem("user"))) {
          const req = await fetch(
            "https://random-data-api.com/api/users/random_user"
          );
          const res = await req.json();
          this.user = res;
          this.initialized = true;
          localStorage.setItem("user", JSON.stringify(res));
        } else {
          this.user = JSON.parse(localStorage.getItem("user"));
          this.initialized = true;
        }
      } catch (error) {
        console.log(error);

        //make another attempt to fetch in 200ms:
        setTimeout(() => {
          this.getUser();
        }, 200);
      }
    },
  },
};
</script>
