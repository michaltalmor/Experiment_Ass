<template>
  <div>
    <!-- Modals -->
    <demo-error-modal />


    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"
    />

    <!-- Other -->
<b-container>
      <section class="text-center my-5">
        <h2>
          <b>Hello!</b>
        </h2>
        <p>
            <button class="btn green" @click="openModal">Click here to start</button> 

        </p></section>
</b-container>


  </div>
</template>

<script>

import DemoErrorModal from '../components/popup.vue'

export default {
  name: 'app',
  components: {
    DemoErrorModal
  },
  data() {
    return {
      canBeShown: false
    }
  },
  created() {
    setInterval(() => {
      this.canBeShown = !this.canBeShown
    }, 5000)
  },
  methods: {
    openModal() {
      const modalTimeoutSeconds = 300;
      const modalId = 'error-modal'
      let modalSetTimeout = null;      

      this.$modal.show(modalId)

      modalSetTimeout = setTimeout(() => {
        this.$modal.hide(modalId)
      }, modalTimeoutSeconds * 1000)
    },  
    
   

    dialogEvent(eventName) {
      console.log('Dialog event: ' + eventName)
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-block {
  display: block;
}
.images{
  margin-right: 20px;
  display:inline-block
}
button.btn {
  outline: none;
  background: white;
  border: 0;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 3px;
  color: white;
  box-shadow: 0 4px 8px rgba(#20a0ff, 0.3);
  background: #4db3ff;
  font-weight: 600;
  border-radius: 3px;
  min-width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 8px;
  &:hover {
    background: #20a0ff;
  }
  &.green {
    box-shadow: 0 4px 8px rgba(#50c9ba, 0.3);
    background: #50c9ba;
    &:hover {
      background: mix(#50c9ba, black, 95%);
    }
  }
  &.red {
    box-shadow: 0 4px 8px rgba(#f21368, 0.3);
    background: #f21368;
    &:hover {
      background: mix(#f21368, black, 95%);
    }
  }
}
</style>

