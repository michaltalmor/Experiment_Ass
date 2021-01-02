 
<template>
  <div id="app">
    <div>
      <!----------------Guest --------------------------->
      <span v-if="!$root.store.username">
        <b-navbar toggleable="lg" type="dark" variant="dark">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" disabled>Hello Guest</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item router-link :to="{ name: 'register' }">
                <b-icon icon="person-plus" style="color: #6fa86a; margin-right: 10px"></b-icon>Register
              </b-nav-item>
              <b-nav-item></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item></b-nav-item>
              <b-nav-item></b-nav-item>
              <b-navbar-nav>
                <b-nav-item></b-nav-item>
                <b-nav-item></b-nav-item>
              </b-navbar-nav>
              <b-nav-item router-link :to="{ name: 'login' }">
                <b-icon icon="box-arrow-in-right" style="color: #6fa86a; margin-right: 10px"></b-icon>Login
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </span>
      <!------------------- User ------------------------>
      <span v-else>
        <b-navbar toggleable="lg" type="dark" variant="dark">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" disabled>Hello {{$root.store.username}}</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
             
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">

              <b-nav-item></b-nav-item>
              <b-nav-item></b-nav-item>
              <b-navbar-nav>
                <b-nav-item></b-nav-item>
                <b-nav-item></b-nav-item>
              </b-navbar-nav>
              <b-nav-item @click="Logout">
                <b-icon icon="box-arrow-left" style="color: #6fa86a; margin-right: 10px"></b-icon>Logout
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </span>
    </div>
    <br>

    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "App",

  methods: {
    async Logout() {
      try {
        console.log(this.$root.store.username);
        const response = await this.axios.post(
          "http://localhost:4000/auth/Logout"
        );
        console.log(response);
      } catch (err) {
        console.log(err.response);
      }
      this.$root.store.logout();
      localStorage.clear();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

