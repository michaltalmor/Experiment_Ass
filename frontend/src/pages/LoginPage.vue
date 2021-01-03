<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Email"
        label-cols-sm="3"
        label="Email:"
        label-for="Email"
      >
        <b-form-input
          id="Email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback>Email is required</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Login failed: {{ form.submitError }}</b-alert>   
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "login",
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      form: {
        email: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      email: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        console.log(this.form.email);
        const response = await this.axios.post(
          "http://localhost:4000/auth/Login",
          {
              email: this.form.email          
          }
        );
        console.log(response);
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.email);
        this.$router.push("/exp").catch(() => {
        this.$forceUpdate();
      });
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
.title {
  text-align:center;
}
.mt-2{
  text-align:center;
}
</style>