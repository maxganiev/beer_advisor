<template>
  <section
    class="area-sel-beer"
    v-if="beerDataIsSet"
    :style="{
      top: store.userPanelIsVisible === false ? '14%' : '-100%',
      transition: 'all 0.7s ease-in-out',
    }"
  >
    <div>
      <img
        v-if="beerImgIsSet"
        v-bind:src="beerImgData"
        alt="some fancy photo of beer"
      />
    </div>
    <ul class="list list-beerdesc">
      <li v-for="(value, key, index) in beerData" :key="index">
        <p v-if="index > 1">
          <strong> {{ key.slice(0, 1).toUpperCase() + key.slice(1) }} </strong>:
          {{ value }}
        </p>
      </li>
      <li>
        <button class="btn btn-beer-selection" v-on:click="getBeer">
          Another beer, please
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { store } from "../store";

export default {
  name: "BeerComponent",
  data() {
    return {
      store,
      beerData: null,
      beerImgData: null,
      beerDataIsSet: false,
      beerImgIsSet: false,
      randomNum: 0,
    };
  },

  created() {
    this.getBeer();
  },

  methods: {
    async getBeer() {
      try {
        store.setLoaderVisibility("flex");
        //gettin beer info:
        const req = await fetch(
          "https://random-data-api.com/api/beer/random_beer"
        );

        if (req.status === 200) {
          store.setLoaderVisibility("none");

          const res = await req.json();
          this.beerData = res;
          this.beerDataIsSet = true;
          this.getBeerImg();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getBeerImg() {
      try {
        //getting random beer imgs:
        const req = await fetch("https://api.punkapi.com/v2/beers");

        if (req.status === 200) {
          const res = await req.json();
          this.getRandomNum(0, res.length - 1);
          this.beerImgData = res[this.randomNum].image_url;
        } else {
          this.beerImgData =
            "https://www.creativefabrica.com/wp-content/uploads/2020/02/11/Beer-Logo-Graphics-1-13-580x386.jpg";
        }

        this.beerImgIsSet = true;
      } catch (error) {
        console.log(error);
      }
    },

    getRandomNum: function (min, max) {
      this.randomNum = Math.floor(Math.random() * (max - min) + min);
      return this.randomNum;
    },
  },
};
</script>

