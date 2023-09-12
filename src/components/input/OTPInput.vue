<template>
  <div ref="otpInput" class="justify-center">
    <div class="text-center">
      <div id="otp" class="d-flex align-items-center" :class="otpClass">
        <input
          v-for="index in inputSize"
          class="m-2 text-center form-control border border-gray-20 border-solid bg-gray-80"
          type="number"
          :ref="`${this.id}otpBox${index - 1}`"
          :id="`${this.id}otpBox${index - 1}`"
          maxlength="1"
          :key="index"
          autofocus
          v-on:keydown="handleInput($event, index - 1)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, ref, watch, onMounted} from "vue";

export default defineComponent({
  name: 'OTP',
  props: {
    inputSize: {
      type: Number,
      default: 6,
    },
    isClear: {
      type: Boolean,
    },
    otpClass: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, {emit}){
    const otpCode = ref(Array(props.inputSize).fill(null));

    const allFilled = () => {
      for (let i in otpCode.value) {
        if (otpCode.value[i] === null) {
          emit('allFilled', { isFilled: false, otp: [] });
          return;
        }
      }
      emit('allFilled', {
        isFilled: true,
        otp: otpCode.value.join(''),
      });
    };

    const handleInput = (event, i) => {
      let ele = document.getElementById(`${props.id}otpBox${i}`);
      if (event.key === 'Backspace') {
        ele.value = '';
        otpCode.value[i] = null;
        if (i !== 0) document.getElementById(`${props.id}otpBox${i - 1}`).focus();
      } else {
        if (i === otpCode.value.length - 1 && ele.value !== '') {
          event.preventDefault();
          return true;
        }
        if (!isNaN(parseInt(event.key))) {
          ele.value = event.key;
          otpCode.value[i] = event.key;
          if (i !== otpCode.value.length - 1) {
            document.getElementById(`${props.id}otpBox${i + 1}`).focus();
          }
          event.preventDefault();
        } else {
          ele.value = '';
          event.preventDefault();
        }
      }
      allFilled();
    };

    const getElementById = (id) => {
      return document.getElementById(id);
    };

    // Watch for changes in isClear prop
    watch(
        () => props.isClear,
        (value) => {
          if (value === true) {
            for (let i = 0; i < 6; i++) {
              let ele = getElementById(`${props.id}otpBox${i}`);
              ele.value = '';
            }
          }
        }
    );

    // Initialize OTP input values on mount
    onMounted(() => {
      otpCode.value.forEach((_, i) => {
        let ele = getElementById(`${props.id}otpBox${i}`);
        ele.value = otpCode.value[i];
      });
    });

    return { otpCode, handleInput}
  }
})
</script>
<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.form-control {
  -webkit-transition: none;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  transition: color 0.15s ease, background-color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease;
}
</style>
