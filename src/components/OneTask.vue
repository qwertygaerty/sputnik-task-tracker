<template>
  <TaskEditModal
    :oneTask="oneTask"
    :task="task.tasks"
    :isCreateTask="false"
    v-if="openTaskModal"
    @closeEditModal="closeModal"
  ></TaskEditModal>
  <div
    class="task"
    draggable="true"
    v-for="j in task.tasks"
    :key="j"
    @click="openModal(j)"
  >
    <div class="task__tags">
      <span
        class="task__tag task__tag--copyright"
        v-bind:class="{ 'task__tag--no-competitions': !j.competitions }"
        >{{ j.competitions || "Без компетенции" }}</span
      >
    </div>
    <p>{{ j.title || "Введите название" }}</p>
    <div class="task__stats">
      <span
        ><time datetime="2021-11-24T20:00:00">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            class="task-icon-svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            style="fill: #000000"
          >
            <path
              d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"
            ></path>
          </svg>
          {{ j.date.start || "Бессрочно" }}
          /
          {{ j.date.end || "Бессрочно" }}
        </time></span
      >
      <span class="task__owner"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TaskEditModal from "@/components/TaskEditModal.vue";
import OneTaskInterface from "@/interfaces/OneTaskInterface";
import OneColumnInterface from "@/interfaces/OneColumnInterface";
export default defineComponent({
  name: "OneTask",
  props: {
    tasksOfColumns: {
      type: Object as PropType<OneColumnInterface>,
    },
  },
  components: { TaskEditModal },
  data() {
    return {
      openTaskModal: false,
      task: this.tasksOfColumns,
      oneTask: {} as OneTaskInterface,
    };
  },
  methods: {
    openModal(task: OneTaskInterface) {
      this.oneTask = task;
      this.openTaskModal = !this.openTaskModal;
    },

    closeModal(task: OneTaskInterface) {
      console.log(task);
      this.openTaskModal = false;
    },
  },
});
</script>

<style scoped>
.task {
  cursor: move;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.1) 0 2px 8px 0;
  margin-bottom: 1rem;
  border: 3px dashed transparent;
  position: relative;
  overflow: hidden;
}

.task:hover {
  box-shadow: rgba(99, 99, 99, 0.3) 0 2px 8px 0;
  border-color: rgba(162, 179, 207, 0.2) !important;
}

.task::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  content: "";
  height: 2rem;
  z-index: 0;
}

.task-highlight {
  transition: color 0.3s;
}

.task-highlight:hover {
  cursor: pointer;
  color: var(--purple);
}

.task p {
  font-size: 15px;
  margin: 1.2rem 0;
}

.task__tag {
  border-radius: 100px;
  padding: 2px 13px;
  font-size: 12px;
}

.task__tag--copyright {
  color: var(--tag-4-text);
  background-color: var(--tag-4);
}

.task__tag--no-competitions {
  color: #a6a6a6;
  background-color: #f2f2f2;
}

.task__tag--design {
  color: var(--tag-3-text);
  background-color: var(--tag-3);
}

.task__tag--illustration {
  color: var(--tag-2-text);
  background-color: var(--tag-2);
}

.task__tags {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task__options {
  background: transparent;
  border: 0;
  color: var(--light-grey);
  font-size: 18px;
}

.task__stats {
  position: relative;
  width: 100%;
  color: var(--light-grey);
  font-size: 12px;
  display: flex;
  align-items: center;
}

.task__stats span:not(:last-of-type) {
  margin-right: 1rem;
}

.task__stats svg {
  margin-right: 5px;
}

.task__stats time {
  display: flex;
  align-items: center;
  justify-content: center;
}

.task__owner {
  width: 25px;
  height: 25px;
  border-radius: 100rem;
  background: var(--purple);
  position: absolute;
  display: inline-block;
  right: 0;
  bottom: 0;
}

.task-hover {
  border: 3px dashed var(--light-grey) !important;
}

.task-details {
  width: 24%;
  display: inline-block;
  height: 100%;
  vertical-align: top;
  padding: 1rem 3rem;
  border-right: 2px dashed var(--purple);
  border-bottom: 2px dashed var(--purple);
  border-radius: 0 0 13px;
}

.bounce-7 {
  animation-name: bounce-7;
  animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  animation-duration: 1s;
}
@keyframes bounce-7 {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(0);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(0);
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
