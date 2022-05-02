<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-left">
        <h1 class="modal-title">Зарегистрируйтесь</h1>
        <p class="modal-desc">
          Работайте в команде, управляйте проектами и выводите продуктивность на
          новый уровень вместе с Task Tracker.
        </p>
        <div class="input-block">
          <label for="email" class="input-label">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div class="input-block">
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div class="modal-buttons">
          <a href="#" class="btn">Forgot your password?</a>
          <a href="#" class="btn">Login</a>
        </div>
        <p class="sign-up">
          Уже есть аккаунт <a href="#" class="btn">Войти</a>
        </p>
      </div>
      <div class="modal-right">
        <img src="../assets/register.png" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as firebase from "firebase/app";
require("firebase/auth");
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter(); // get a reference to our vue router
const register = () => {
  firebase
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/"); // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
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
