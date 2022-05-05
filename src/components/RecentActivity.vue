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

    <div class="tag-progress">
      <a href="#" class="task-remove project-participants__add"></a>
    </div>

    <color-picker
      v-model:pureColor="pureColor"
      v-model:gradientColor="gradientColor"
      shape="circle"
    />
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const pureColor = ref("#809fff");
    const gradientColor = ref(
      "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
    );

    return { pureColor, gradientColor };
  },
  name: "RecentActivity",
  watch: {
    pureColor: function () {
      console.log(this.pureColor);
    },
  },
});
</script>

<style scoped lang="scss">
.vc-color-wrap {
  border-radius: 40px;
}

.tag-progress {
  margin: 1.5rem 0;
  h2 {
    font-size: 18px;
    margin-bottom: 1rem;
  }
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
    span {
      color: #b4b4b4;
    }
  }
  .progress {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10px;
    height: 10px;
  }
  p .tag-progress .progress {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10px;
    height: 10px;
  }
  .progress::-webkit-progress-bar,
  .tag-progress .progress::-webkit-progress-value {
    border-radius: 10px;
  }
  .progress--back::-webkit-progress-bar {
    background-color: var(--tag-4);
  }
  .progress--back::-webkit-progress-value {
    background: var(--tag-4-text);
  }
  .progress--analise::-webkit-progress-bar {
    background-color: var(--tag-2);
  }
  .progress--analise::-webkit-progress-value {
    background-color: var(--tag-2-text);
  }
  .progress--front::-webkit-progress-bar {
    background-color: var(--tag-3);
  }
  .progress--front::-webkit-progress-value {
    background-color: var(--tag-3-text);
  }
}

.project-participants__add {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: var(--purple);
  border-radius: 100rem;
  margin: 0 0.2rem;
  font-family: "Poppins", sans-serif;
  background: transparent;
  border: 1px dashed #969696;
  font-size: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::after {
    color: #969696;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    content: "+";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    transition: background-color, color 0.3s;
    font-family: "Poppins", sans-serif;
  }
  &:hover::after {
    background: var(--purple);
    color: white;
  }
}
</style>
