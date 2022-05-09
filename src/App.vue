<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

#app {
  background-color: var(--bg);
  width: 100%;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 0;
}

:root {
  --bg: #ebf0f7;
  --header: #fbf4f6;
  --text: #2e2e2f;
  --white: #ffffff;
  --light-grey: #c4cad3;
  --tag-1: #ceecfd;
  --tag-1-text: #2e87ba;
  --tag-2: #ccffe6;
  --tag-2-text: #00cc66;
  --tag-3: #cce6ff;
  --tag-3-text: #3399ff;
  --tag-4: #e0ccff;
  --tag-4-text: #8533ff;
  --purple: #809fff;
}

a.btn {
  border-radius: 40px;
  border: 2px solid var(--purple);
  box-sizing: border-box;
  color: var(--tag-1-text);
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s;
}

a.btn:hover {
  background: var(--purple);
  color: var(--bg);
}

a.btn-delete {
  border: 2px solid #ff4d4d;
  color: #ff4d4d;
}

a.btn-delete:hover {
  background: #ff4d4d;
  color: var(--bg);
}
</style>
