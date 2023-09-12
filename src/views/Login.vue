<template>
  <section class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <div class="text-center">
      <h1 class="text-[32px] font-bold leading-tight tracking-tight text-gray-900 text-center">
        {{ pageName }}
      </h1>
      <p v-if="!loginScreen" class="mt-2 text-base font-medium text-gray-400">To confirm your identity, enter the 6-digit sent to your email.</p>
    </div>
    <FeedbackUI
        v-on:close-feedback="removeError()"
        v-if="error"
        type="error"
    >
      <p class="text-xs font-medium text-red-500">
        {{ error }}
      </p>
    </FeedbackUI>
    <div v-if="loginScreen">
      <form class="space-y-4 md:space-y-6">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <TextInput
              type="email"
              id="email"
              placeholder="eg. john@gmail.com"
              v-model="loginData.email"
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <TextInput
              type="password"
              id="password"
              placeholder="(8+ characters)"
              v-model="loginData.password"
          />
        </div>
        <ButtonUI
            :loading="loading"
            :inactive="!allFilled"
            btn-class="w-full"
            @click="handleLogin"
        >
          <span class="font-medium ">Sign in </span>
        </ButtonUI>
        <div class="text-center">
          <a href="#" class="text-sm font-normal text-gray-400">Forgot password?</a>
        </div>
        <ButtonUI
            variant="gray"
            btn-class="w-full"
            @click="$router.push('/')"
        >
          <span class="font-medium">Don’t have an account? Create one</span>
        </ButtonUI>
      </form>
    </div>
    <div v-else>
      <form class="space-y-4 md:space-y-6" action="#">
        <OTPInput
            @allFilled="validateOTP"
            :isClear="isClear"
            id="otp_form"
        />
          <ButtonUI
              :loading="loading"
              :inactive="!isAllFilled"
              type="submit"
              btn-class="w-full"
              @click="handleValidateOTP"
          >
            <span class="font-medium">Submit </span>
          </ButtonUI>
          <div class="text-center">
            <p class="text-sm font-medium text-gray-400">Didn’t receive any code? <a class="text-blue-500 cursor-pointer hover:underline">Resend</a></p>
          </div>
          <ButtonUI
              variant="gray"
              btn-class="w-full"
              @click="switchViews('login')"
          >
          <span class="font-medium flex items-center">
            <IconUI name="arrow-left" view-box="0 0 13 12" />
            <span class="ml-2">
              Go back to login
            </span>
          </span>
          </ButtonUI>
        </form>
    </div>
  </section>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useAuth } from '@/store/auth/useAuth'
import IconUI from "@/components/ui/IconUI.vue";
import ButtonUI from "@/components/ui/ButtonUI.vue";
import OTPInput from "@/components/Input/OTPInput.vue";
import FeedbackUI from '@/components/ui/FeedbackUI.vue';
import TextInput from "@/components/Input/TextInput.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { IconUI, ButtonUI, TextInput, FeedbackUI, OTPInput },
  setup(){
    const auth = useAuth()
    const router = useRouter()
    const error = ref('')
    const otpCode = ref('')
    const loginData = ref({
      email: "",
      password: ""
    })
    const loading = ref(false)
    const isClear = ref(false)
    const loginScreen = ref(true)
    const isAllFilled = ref(false)
    const pageName = ref('Sign in')

    const removeError = () => {
      error.value = ''
    }

    const switchViews = viewName => {
      if (viewName === 'login'){
        loginScreen.value = true
        pageName.value = 'Sign in'
      } else {
        loginScreen.value = false
        pageName.value = 'Enter your OTP'
      }
    }

    const handleLogin = () => {
      loading.value = true
      error.value = ''
      auth
          .handleLogin(loginData.value)
          .then(_ => {
            switchViews('otp')
          })
          .catch(errorResponse => {
            error.value = errorResponse.response.data.message
          })
          .finally(() => {
            loading.value = false
          })
    }

    const handleValidateOTP = () => {
      loading.value = true
      error.value = ''
      auth
          .handleVerifyOtp({ otp: otpCode.value, email: loginData.value.email})
          .then(_ => {
            router.push('/dashboard')
          })
          .catch(errorResponse => {
            error.value = errorResponse.response.data.message
          })
          .finally(() => {
            loading.value = false
          })
    }

    const allFilled = computed(() => {
      const { email, password } = loginData.value
      return (
          email.length &&
          email.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) && password.length >= 8
      )
    })

    const validateOTP = value => {
      isAllFilled.value = value.isFilled
      if (isAllFilled.value) otpCode.value = value.otp
    }

    return { loading, error, isClear, pageName, loginScreen, loginData, handleLogin, handleValidateOTP, switchViews, removeError, allFilled, validateOTP, isAllFilled }
  },
})
</script>