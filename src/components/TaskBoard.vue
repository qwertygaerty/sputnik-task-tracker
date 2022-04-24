<template>
  <main class="project">
    <div class="project-info">
      <h1>{{ board.name }}</h1>
      <div class="project-participants">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <button class="project-participants__add"></button>
      </div>
    </div>
    <div class="project-tasks">
      <div class="project-column" v-for="i in board.columns" :key="i">
        <div class="project-column-heading">
          <h2 class="project-column-heading__title">{{ i.name }}</h2>
          <button class="project-column-heading__options"></button>
        </div>
        <OneTask :tasksOfColumns="i" v-if="isEmpty(i)"></OneTask>
        <div class="project-column project-column-center">
          <button
            class="project-participants__add project-participants__add--left"
            @click="addCard(i)"
          ></button>
        </div>
      </div>

      <div class="project-column">
        <button class="project-participants__add" @click="addColumn"></button>
      </div>
    </div>
  </main>

  <CreateModal
    v-if="openCreateModal"
    :input-name="`Новый столбец`"
    @closeModal="closeCreateModal"
    @openModal="addCreateModal"
  ></CreateModal>
</template>

<script lang="ts">
import OneTask from "@/components/OneTask.vue";
import CreateModal from "@/components/CreateModal.vue";
import { defineComponent, PropType } from "vue";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import OneTaskInterface from "@/interfaces/OneTaskInterface";

export default defineComponent({
  name: "TaskBoard",
  props: {
    task: {
      type: Object as PropType<OneBoardInterface>,
    },
  },
  components: { OneTask, CreateModal },
  data() {
    return {
      openCreateModal: false,
      board: this.task,
      newColumn: "",
    };
  },
  methods: {
    isEmpty: function (i: { name: string; tasks: Array<OneTaskInterface> }) {
      if (i.tasks[0]) {
        return !!i.tasks[0].title;
      } else return false;
    },

    addColumn: function () {
      this.openCreateModal = !this.openCreateModal;
    },
    addCard: function (column: unknown) {
      console.log(column);
    },

    closeCreateModal() {
      this.openCreateModal = false;
    },

    addCreateModal: function (newColumn: string) {
      if (this.board !== undefined) {
        this.board.columns.push({
          name: newColumn,
          tasks: [
            {
              title: "",
              description: "",
              user: { img: "", name: "" },
              date: { start: "", end: "" },
              competitions: "",
            },
          ],
        });
        this.closeCreateModal();
      }
    },
  },
  watch: {
    task: function () {
      this.board = this.task;
    },
  },
});
</script>

<style scoped>
.project {
  padding: 0 2rem;
  max-width: 75%;
  width: 100%;
  display: inline-block;
}

.project-info {
  padding: 2rem 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.project-participants {
  display: flex;
  align-items: center;
}

.project-participants span,
.project-participants__add {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: var(--purple);
  border-radius: 100rem;
  margin: 0 0.2rem;
}

.project-participants__add {
  background: transparent;
  border: 1px dashed #969696;
  font-size: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.project-participants__add--left {
  margin-bottom: 1rem;
}

.project-participants__add::after {
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
}
.project-participants__add:hover::after {
  background: var(--purple);
  color: white;
}

.project-tasks {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-column-gap: 1.5rem;
}

.project-column-center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.project-column-heading {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-column-heading__title {
  font-size: 20px;
}

.project-column-heading__options {
  background: transparent;
  color: var(--light-grey);
  font-size: 18px;
  border: 0;
  cursor: pointer;
}

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

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .project {
    max-width: 100%;
  }

  .project-info {
    display: flex;
    flex-wrap: wrap;
  }

  .project-participants__add {
    position: relative;
    overflow: hidden;
  }

  .project-tasks {
    grid-template-columns: 1fr;
    border-bottom: 2px dashed var(--purple);
  }
}
</style>
