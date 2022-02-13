<template>
  <main>
    <Alert />
    <Header />
    <Login />
    <UserPanel />
    <Loader />
    <BeerComponent />
    <Footer />
  </main>
</template>

<script>
import Alert from "./components/alert.vue";
import Header from "./components/header.vue";
import Login from "./components/login.vue";
import Loader from "./components/loader.vue";
import BeerComponent from "./components/beerComponent.vue";
import UserPanel from "./components/userPanel.vue";
import Footer from "./components/footer.vue";

export default {
  name: "App",

  components: {
    Header,
    Login,
    UserPanel,
    Loader,
    BeerComponent,
    Footer,
    Alert,
  },
};
</script>

