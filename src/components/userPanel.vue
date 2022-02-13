<template>
  <section
    class="user-panel"
    v-if="initialized"
    :style="{
      transform:
        store.userPanelIsVisible === false
          ? 'translate(-100%)'
          : 'translate(0%)',
    }"
  >
    <ul class="list list-userdetails" ref="listUser">
      <li><img v-bind:src="userPrimaryData.avatar" alt="avatar" /></li>
      <li v-for="(value, key, index) in userPrimaryData" :key="index">
        <p v-if="index > 0">
          <strong>
            {{
              (key.slice(0, 1).toUpperCase() + key.slice(1)).replaceAll(
                "_",
                " "
              )
            }} </strong
          >: {{ value }}
        </p>
      </li>
    </ul>

    <button
      class="btn btn-subscr-details"
      v-on:click="setSubscriptionDetailsVisibility"
      ref="btnSubscr"
    >
      Check subscription details
    </button>

    <ul
      class="list list-subscription"
      ref="listSubscr"
      :style="{ transform: subsribtionDetailTransformValue }"
    >
      <li><h3>Subscription details:</h3></li>
      <li v-for="(value, key, index) in subsribtionDetails" :key="index">
        <p>
          <strong> {{ key }} </strong>: {{ value }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { store } from "../store";
export default {
  name: "UserPanel",

  data() {
    return {
      store,
      initialized: false,
      userPrimaryData: {
        avatar: null,
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
      },

      subsribtionDetails: null,
      subsribtionDetailTransformValue: "translateX(-100%)",
    };
  },

  created() {
    this.checkIfUserExists();
  },

  methods: {
    setAddress(address) {
      this.userPrimaryData.address = address;
    },

    setSubscriptionDetailsVisibility(e) {
      if (e.target.innerText === "Check subscription details") {
        e.target.innerText = "Hide details";

        this.$refs.listUser.style.height = "70%";
        this.$refs.listSubscr.style.height = "30%";

        this.subsribtionDetailTransformValue = "translateX(0%)";
      } else if (e.target.innerText === "Hide details") {
        e.target.innerText = "Check subscription details";

        this.$refs.listUser.style.height = "100%";
        this.$refs.listSubscr.style.height = "0%";

        this.subsribtionDetailTransformValue = "translateX(-100%)";
      }
    },

    setSubscribtionDetails(targetUserObject) {
      const { subscription } = targetUserObject;
      const keys = [
        "Your current plan",
        "Status",
        "Payment method",
        "Update term",
      ];

      this.subsribtionDetails = Object.values(subscription)
        .map((val, index) => {
          const newObj = { [keys[index]]: val };
          return newObj;
        })
        .reduce((prev, curr) => {
          return { ...prev, ...curr };
        }, {});
    },

    checkIfUserExists() {
      const parsedUser = JSON.parse(localStorage.getItem("user"));
      if (parsedUser) {
        Object.keys(this.userPrimaryData).map((key) => {
          this.userPrimaryData[key] = parsedUser[key];
        });

        this.setAddress(parsedUser.address.city);
        this.setSubscribtionDetails(parsedUser);
      } else {
        Object.keys(this.userPrimaryData).map(
          (key) => (this.userPrimaryData[key] = "Data not set atm...")
        );

        //attempting to upload a user after 1s:
        setTimeout(() => {
          this.checkIfUserExists();
        }, 200);
      }

      this.initialized = true;
    },
  },
};
</script>
