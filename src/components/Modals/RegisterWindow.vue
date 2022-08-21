<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-left">
        <h1 class="modal-title">{{ this.title }}</h1>
        <p class="modal-desc">
          Работайте в команде, управляйте проектами и выводите продуктивность на
          новый уровень вместе с Task Tracker.
        </p>
        <div class="task__tag task__tag--error-message" v-if="errors.message">
          {{ errors.message }}
        </div>
        <div class="input-block">
          <label for="email" class="input-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="input-block">
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="modal-buttons">
          <a href="#" class="btn" v-show="title === 'Войти'"
            >Forgot your password?</a
          >
          <a href="#" class="btn" @click="register">{{ this.btn }}</a>
          <e-button
            :data="{
              leftIcon: 'google',
              rounded: '40px',
              size: '0.4rem',
              softColors: true,
            }"
            :styleConfig="{
              border: '2px solid var(--purple)',
              textDecoration: 'none',
              fontWeight: '400',
              fontFamily: `-apple-system, system-ui, 'Segoe UI', 'Liberation Sans'`,
              fontSize: '13px',
              padding: '8px 0.8em',
              hover: {
                background: 'none',
                color: 'var(--purple)',
              },
              background: 'var(--purple)',
              color: 'var(--bg)',
            }"
            class="btn"
            @click="google"
            >Войти</e-button
          >
        </div>
        <p class="sign-up" v-if="title === 'Зарегистрируйтесь'">
          Уже есть аккаунт?
          <a href="#" class="btn" @click="login">Войти</a>
        </p>
      </div>
      <div class="modal-right">
        <img src="../../assets/register.png" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "RegisterLogin",
  props: {
    titleProp: {
      type: String,
      default: "Зарегистрируйтесь",
    },
    btnProp: {
      type: String,
      default: "Зарегистрироваться",
    },
  },
  data() {
    return {
      title: this.titleProp,
      btn: this.btnProp,
      email: "",
      password: "",
      user: {},
      token: "",
      errors: {},
      action: "register",
      provider: new GoogleAuthProvider(),
    };
  },
  methods: {
    login: function () {
      this.btn = "Войти";
      this.title = "Войти";
      this.action = "login";
      this.register();
    },

    google: function () {
      this.action = "google";
      this.register();
    },
    register: function () {
      const auth = getAuth();
      if (this.action === "login") {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.user = userCredential.user;
            console.log(this.user);
            this.$router.push("/");
          })
          .catch((error) => {
            this.errors = error;
          });
      } else if (this.action === "register") {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.user = userCredential.user;
            console.log(this.user);
            this.$router.push("/");
          })
          .catch((error) => {
            this.errors = error;
          });
      } else if (this.action === "google") {
        signInWithPopup(auth, this.provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
              if (credential.accessToken) {
                this.token = credential.accessToken;
              }
              this.user = result.user;
              console.log(this.user);
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.errors = error;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
      }
    },
  },
});
</script>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  height: 100%;
}
.modal-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  transition-duration: 0.3s;
  background: #fff;
  z-index: 123;
}
.modal-title {
  font-size: 38px;
  font-weight: 400;
  color: var(--tag-3-text);
}
.modal-desc {
  margin: 6px 0 30px 0;
}
.modal-left {
  padding: 60px 30px 20px;
  background: #fff;
  flex: 1.5;
  transition-duration: 0.5s;
  transform: translateY(80px);
}
.modal-right {
  flex: 3;
  transition: 0.3s;
  overflow: hidden;
}
.modal-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 1.2s;
  transform: rotate(45deg) scale(2);
}

.modal.is-open .modal-container {
  opacity: 1;
  transition-duration: 0.6s;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
.modal.is-open .modal-right img {
  transform: scale(1);
}
.modal.is-open .modal-left {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign-up {
  margin: 60px 0 0;
  font-size: 14px;
  text-align: center;
}

.input-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--purple);
  transition: 0.3s;
  display: none;
}
.input-block {
  display: flex;
  flex-direction: column;
  padding: 8px 0.8em;
  border: 2px solid var(--purple);
  border-radius: 40px;
  margin-bottom: 20px;
  transition: 0.3s;
}

.input-block input {
  outline: none;
  border: none;
  font-size: 1rem;
}

.input-block:focus-within .input-label {
  color: var(--purple);
}

.task__tag--error-message {
  color: #ff4d4d;
  background-color: #ffe6e6;
  margin-bottom: 1rem;
}

@media (max-width: 750px) {
  .modal-container {
    padding: 1rem;
  }
  .modal-right {
    display: none;
  }
  .modal-left {
    padding: 0;
  }
}
</style>
