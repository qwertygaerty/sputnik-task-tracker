<template>
  <div class="tag-progress">
    <h2>Ход выполнения задач</h2>
    <div class="tag-progress">
      <p>Бэкенд <span>1/8</span></p>
      <progress class="progress progress--back" max="8" value="1">1</progress>
    </div>
    <div class="tag-progress">
      <p>Фронтенд <span>1/10</span></p>
      <progress class="progress progress--front" max="10" value="1">1</progress>
    </div>
    <div class="tag-progress">
      <p>Аналитик <span>1/7</span></p>
      <progress class="progress progress--analise" max="7" value="1">
        1
      </progress>
    </div>
  </div>
  <div class="task-activity">
    <h2>Недавняя активность</h2>
    <ul>
      <li>
        <span class="task-icon task-icon--edit"></span>
        <b>Илья</b> написал коммент
        <time>April 10</time>
      </li>
      <li>
        <span class="task-icon task-icon--attachment"></span>
        <b>avgus</b> написал коммент
        <time>April 11</time>
      </li>
      <li>
        <span class="task-icon task-icon--comment"></span>
        <b>Агаев</b> написал коммент
        <time>April 12</time>
      </li>
      <li>
        <span class="task-icon task-icon--edit"></span>
        <b>Илья</b> написал коммент
        <time>April 13</time>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RecentActivity",
});
</script>

<style scoped>
.tag-progress {
  margin: 1.5rem 0;
}

.tag-progress h2 {
  font-size: 18px;
  margin-bottom: 1rem;
}

.tag-progress p {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.tag-progress p span {
  color: #b4b4b4;
}

.tag-progress .progress {
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 10px;
  height: 10px;
}

.tag-progress .progress::-webkit-progress-bar,
.tag-progress .progress::-webkit-progress-value {
  border-radius: 10px;
}

.tag-progress .progress--back::-webkit-progress-bar {
  background-color: var(--tag-4);
}

.tag-progress .progress--back::-webkit-progress-value {
  background: var(--tag-4-text);
}

.tag-progress .progress--analise::-webkit-progress-bar {
  background-color: var(--tag-2);
}

.tag-progress .progress--analise::-webkit-progress-value {
  background-color: var(--tag-2-text);
}

.tag-progress .progress--front::-webkit-progress-bar {
  background-color: var(--tag-3);
}

.tag-progress .progress--front::-webkit-progress-value {
  background-color: var(--tag-3-text);
}
</style>
