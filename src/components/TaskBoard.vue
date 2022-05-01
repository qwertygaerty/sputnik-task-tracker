<template>
  <main class="project">
    <div class="project-info">
      <h1>{{ board.name }}</h1>

      <div class="project-column">
        <a href="#" class="btn" @click="addColumn">Добавить столбец</a>
      </div>

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
        class="project-tasks"
      >
        <div
          class="project-column tasks-column"
          v-for="i in board.columns"
          :key="i"
        >
          <div class="project-column-heading task-boards">
            <h2 class="project-column-heading__title">
              {{ i.name }}
            </h2>
            <div class="task-boards--edit-panel">
              <a href="#" class="btn task-remove" @click="editBoard(i)">
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"
                  ></path>
                </svg>
              </a>

              <a href="#" class="btn task-remove" @click="removeBoard(i)"
                ><svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
                  ></path></svg
              ></a>

              <a
                href="#"
                class="task-remove project-participants__add"
                @click="addCard(i)"
              ></a>
            </div>
          </div>
          <VueDraggableNext
            :list="i.tasks"
            :animation="100"
            ghost-class="ghost-card"
            group="tasks"
            @start="flipDrag"
            @end="flipDrag"
          >
            <OneTask
              v-for="j in i.tasks"
              :key="j.title"
              :task="j"
              class="drag-and-drop"
            ></OneTask>
          </VueDraggableNext>
        </div>
      </VueDraggableNext>
    </div>
  </main>

  <CreateModal
    v-if="openCreateModal"
    :input-name="createModalMessage"
    :saveOrCreate="saveOrCreate"
    @closeEditCreateModal="addCreateModal"
    @closeCreateModal="closeCreateModal"
    @closeSaveCreateModal="saveModal"
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
      columnNumber: 0,
      createModalMessage: "Новый столбец",
      saveOrCreate: "create",
      tempColumn: {} as OneColumnInterface,
    };
  },
  methods: {
    isEmpty: function (i: OneColumnInterface) {
      return i.tasks[0];
    },
    addColumn: function () {
      this.columnNumber++;
      this.createModalMessage = "Новый столбец " + this.columnNumber;
      this.saveOrCreate = "create";
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

    flipDrag: function (event: CustomEvent) {
      console.log(event);
      let massOfEl = Array.from(document.getElementsByTagName("div"));
      massOfEl.forEach((el) => {
        if (el.getAttribute("animation") === "100") {
          el.classList.toggle("min-height-40");
        }
      });
      return 0;
    },

    removeBoard: function (column: OneColumnInterface) {
      if (this.board != undefined) {
        let index = this.board.columns.indexOf(column);
        this.board.columns.splice(index, 1);
      }
    },

    editBoard: function (column: OneColumnInterface) {
      this.createModalMessage = column.name;
      this.saveOrCreate = "save";
      this.openCreateModal = !this.openCreateModal;
      this.tempColumn = column;
    },

    saveModal: function (column: string) {
      this.tempColumn.name = column;
      this.closeCreateModal();
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
  cursor: pointer;
}

.project-column-heading__options {
  background: red;
  color: var(--light-grey);
  font-size: 18px;
  border: 0;
  cursor: pointer;
  width: 10px;
  height: 10px;
}

.min-height-40 {
  min-height: 40rem;
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
  cursor: none;
  opacity: 10%;
  position: relative;
  overflow: hidden;
}

.ghost-card::before {
  position: absolute;
  background: var(--tag-4-text);
  width: 1000px;
  height: 90%;
  content: "";
  top: 0;
  left: 0;
  z-index: 1000;
}

.task-remove {
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  visibility: hidden;
  align-self: flex-end;
}

.task-remove svg {
  width: 1rem;
  height: 1rem;
}

.task-boards {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed transparent;
}

.hover-bottom-border {
  transition: 0.1s;
}

.hover-bottom-border:hover {
  border-bottom: 2px dashed var(--purple);
}

.task-boards:hover .task-remove {
  visibility: visible;
}

.task-boards--edit-panel {
  display: flex;
  gap: 1rem;
}
</style>
