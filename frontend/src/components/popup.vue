<template>
  <modal
    name="error-modal"
    :classes="['error-modal', hasBugs && 'has-bugs']"
    :width="400"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
  >
    <div class="error-modal-content">

      <div style="padding: 15px;">
        Your ID: {{userID}}<br>
        Current step: {{ stepCount }}<br>
        Message: {{ mess }}<br>
      <button @click="nextStep">next step</button>

      </div>

    </div>
  </modal>
</template>
<script>
export default {
  name: 'DemoErrorModal',
  data() {
    return {
      mess: '',
      userID: '',
      stepCount: 1,
      message: '',
      hasBugs: false
    }
  },
  mounted() {
    this.getUserID();
    this.getStepMessage();
  },
  methods: {
    nextStep() {
      if(this.stepCount < 3){
        this.stepCount++
        this.getStepMessage()
      }
      else{
        this.$modal.hide('error-modal')
      }
    },
    async getUserID() {
      try {
        const response = await this.axios.get(
          "http://localhost:4000/auth/getUserID",
          {
            params: {
              email: this.$root.store.username
            }
          }
        );
        console.log(response.data.user.ID)
        this.userID = response.data.user.ID;
      } catch (error) {
        console.log(error);
      }
    },
    async getStepMessage() {
      try {
        const response = await this.axios.get(
          "http://localhost:4000/auth/getStepMessage",
          {
            params: {
              step: this.stepCount
            }
          }
        );
        console.log(response.data.message.message)
        this.mess = response.data.message.message;
      } catch (error) {
        console.log(error);
      }
    },

    beforeOpen() {
      this.stepCount = 1
      this.getStepMessage()
      setTimeout(200)
    },
    
  }
}
</script>
<style lang="scss">
.error-modal {
  transition: box-shadow 1s;
  &.has-bugs {
    box-shadow: 0 24px 80px -2px rgba(255, 0, 0, 0.4) !important;
  }
}
.error-modal-content {
  padding: 10px;
  text-align: center;
  .bugs-label {
    text-transform: uppercase;
    font-size: 60px;
    font-weight: 300;
    letter-spacing: 2px;
    padding: 40px;
  }
  button {
    width: 180px;
  }
  sub {
    color: #ec625f;
    transition: opacity 0.25s;
  }
}
</style>