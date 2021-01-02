<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-userID"
        label-cols-sm="3"
        label="ID:"
        label-for="userID"
      >
        <b-form-input
          id="userID"
          v-model="$v.form.userID.$model"
          type="text"
          :state="validateState('userID')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.userID.required">ID is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.userID.alpha"
        >ID should contain only numbers.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">First Name is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.firstName.alpha"
        >First Name should contain only letters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">Last Name is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.lastName.alpha"
        >Last Name should contain only letters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-email" label-cols-sm="3" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.email">Email is not valid.</b-form-invalid-feedback>
      </b-form-group>

      
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login">Log in here</router-link>
      </div>
    </b-form>

    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Register failed: {{ form.submitError }}</b-alert>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  numeric,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        userID: "",
        firstName: "",
        lastName: "",
        email: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      userID: {
        required,
        numeric
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
    }
  },

  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:4000/auth/Register",
          {
            
              userID: this.form.userID,
              email: this.form.email,
              firstName: this.form.firstName,
              lastName: this.form.lastName
             
          }
        );
        this.$router.push("/login").catch(() => {
          this.$forceUpdate();
        });
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },

    onReset() {
      this.form = {
        userID: "",
        firstName: "",
        lastName: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
