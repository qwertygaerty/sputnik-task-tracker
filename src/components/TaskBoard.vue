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
    <div class="">
      <VueDraggableNext
        :list="board.columns"
        :animation="100"
        ghost-class="ghost-card"
        group="board.columns"
        @start="startDrag"
        class="project-tasks"
      >
        <div class="project-column" v-for="i in board.columns" :key="i">
          <div class="project-column-heading">
            <h2 class="project-column-heading__title">{{ i.name }}</h2>
            <button class="project-column-heading__options"></button>
          </div>
          <VueDraggableNext
            :list="i.tasks"
            :animation="100"
            ghost-class="ghost-card"
            group="tasks"
            @start="startDrag"
          >
            <OneTask
              v-for="j in i.tasks"
              :key="j.title"
              :task="j"
              class="drag-and-drop"
            ></OneTask>
          </VueDraggableNext>
          <div class="project-column project-column-center">
            <button
              class="project-participants__add project-participants__add--left"
              @click="addCard(i)"
            ></button>
          </div>
        </div>
      </VueDraggableNext>

      <div class="project-column">
        <button class="project-participants__add" @click="addColumn"></button>
      </div>
    </div>
  </main>

  <CreateModal
    v-if="openCreateModal"
    :input-name="`Новый столбец`"
    @openModal="addCreateModal"
  ></CreateModal>

  <TaskEditModal
    v-if="openCreateTask"
    :oneTask="oneTask"
    :isCreateTask="true"
    @closeModal="closeTaskModal"
  ></TaskEditModal>
</template>

<script lang="ts">
import OneTask from "@/components/OneTask.vue";
import CreateModal from "@/components/CreateModal.vue";
import { defineComponent, PropType } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import OneTaskInterface from "@/interfaces/OneTaskInterface";
import OneColumnInterface from "@/interfaces/OneColumnInterface";
import TaskEditModal from "@/components/TaskEditModal.vue";

export default defineComponent({
  name: "TaskBoard",
  props: {
    task: {
      type: Object as PropType<OneBoardInterface>,
    },
  },
  components: {
    OneTask,
    CreateModal,
    TaskEditModal,
    VueDraggableNext,
  },
  data() {
    return {
      openCreateModal: false,
      openCreateTask: false,
      board: this.task,
      newColumn: {
        type: {} as OneColumnInterface,
      },
      oneTask: {} as OneTaskInterface,
      indexOfTask: {} as OneColumnInterface,
      isCreateTask: true,
    };
  },
  methods: {
    isEmpty: function (i: OneColumnInterface) {
      return i.tasks[0];
    },
    addColumn: function () {
      this.openCreateModal = !this.openCreateModal;
    },
    addCard: function (num: OneColumnInterface) {
      console.log(num);
      this.indexOfTask = num;
      this.openCreateTask = !this.openCreateTask;
    },
    closeTaskModal: function (task: OneTaskInterface) {
      if (this.board !== undefined) {
        let num = this.getColumnNumber(this.indexOfTask);
        console.log(num);
        this.board.columns[num].tasks.push(task);
      }
      this.openCreateTask = false;
    },

    closeCreateModal() {
      this.openCreateModal = false;
    },

    addCreateModal: function (newColumn: string) {
      if (this.board !== undefined) {
        this.board.columns.push({
          name: newColumn,
          tasks: [],
        });
        this.closeCreateModal();
      }
    },

    getColumnNumber: function (column: OneColumnInterface) {
      if (this.board !== undefined) {
        return this.board.columns.findIndex((i) => i.name === column.name);
      }
      return 0;
    },

    startDrag: function (event: CustomEvent) {
      console.log(event);
      return 0;
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

.ghost-card {
  transform: rotate(2deg);
  cursor: none;
  opacity: 10%;
  position: relative;
  overflow: hidden;
}

.ghost-card::before {
  position: absolute;
  background: var(--tag-4);
  width: 1000px;
  height: 90%;
  content: "";
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
