<template>
  <TaskEditModal
    :oneTask="oneTask"
    :task="task.tasks"
    v-if="openTaskModal"
    @closeModal="closeModal"
  ></TaskEditModal>
  <div
    class="task"
    draggable="true"
    v-for="j in task.tasks"
    :key="j"
    @click="openModal(j)"
  >
    <div class="task__tags">
      <span class="task__tag task__tag--copyright">{{ j.competitions }}</span>
    </div>
    <p>{{ j.title }}</p>
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
          {{ j.date.end }}
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
      oneTask: Object as PropType<OneTaskInterface>,
    };
  },
  methods: {
    openModal(task: PropType<OneTaskInterface>) {
      this.oneTask = task;
      this.openTaskModal = !this.openTaskModal;
    },

    closeModal(task: PropType<OneTaskInterface>) {
      this.oneTask = task;
      this.openTaskModal = false;
    },
  },
});
</script>

<style scoped></style>
