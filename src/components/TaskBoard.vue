<template>
  <main class="project" @click="closeAllModals">
    <div class="project-info">
      <h1>{{ board.name }}</h1>
      <div class="project-participants">
        <a href="#" class="btn" style="margin-right: 1rem" @click="addColumn"
          >Добавить столбец</a
        >
        <a href="#" class="btn" style="margin-right: 1rem" @click="addRule"
          >Правила</a
        >
      </div>
    </div>
    <div class="">
      <VueDraggableNext
        :list="board.columns"
        :animation="100"
        ghost-class="ghost-card"
        group="board.columns"
        class="project-tasks"
        @end="flipDrag"
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
              <a
                href="#"
                class="task-remove project-participants__add"
                @click="addCard(i)"
              ></a>
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
            </div>
          </div>
          <VueDraggableNext
            :list="i.tasks"
            :animation="100"
            ghost-class="ghost-card"
            group="tasks"
            :move="onMoveCallback"
            @start="flipDrag(i.name)"
            @end="flipDrag"
          >
            <OneTask
              v-for="j in i.tasks"
              :key="j.title"
              :task="j"
              :boardName="board.name"
              class="drag-and-drop"
              @editTask="editTask"
              @click="setTempValue(i)"
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
    :message="createMessage"
    @closeEditCreateModal="addCreateModal"
    @closeEditModal="closeCreateModal"
    @closeCreateModal="closeCreateModal"
    @closeSaveCreateModal="saveModal"
    @closeModal="closeCreateModal"
  ></CreateModal>

  <TaskEditModal
    v-if="openCreateTask"
    :oneTask="oneTask"
    :isCreateTask="true"
    @closeModal="closeTaskModal"
  ></TaskEditModal>

  <RulesModal
    v-if="openRules"
    :rules="rules"
    :columns="board.columns"
    :boardName="board.name"
    @closeRulesModal="closeRules"
  ></RulesModal>
</template>

<script lang="ts">
import OneTask from "@/components/OneTask.vue";
import CreateModal from "@/components/CreateModal.vue";
import { defineComponent, PropType, inject, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import OneTaskInterface from "@/interfaces/OneTaskInterface";
import OneColumnInterface from "@/interfaces/OneColumnInterface";
import TaskEditModal from "@/components/TaskEditModal.vue";
import BoardsInterface from "@/interfaces/BoardsInterface";
import { setup } from "vue-class-component";
import RulesModal from "@/components/RulesModal.vue";
import RulesInterface from "@/interfaces/RulesInterface";
import OneRuleInterface from "@/interfaces/OneRuleInterface";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

export default defineComponent({
  name: "TaskBoard",
  props: {
    task: {
      type: Object as PropType<OneBoardInterface>,
      default: Object as PropType<OneBoardInterface>,
    },
  },
  setup() {
    const b = inject("boards") as {
      updateBoards: any;
      boards: any;
    };
    const updateBoards = b.updateBoards;
    const boards = ref(b.boards);
    return {
      boards,
      updateBoards,
    };
  },
  components: {
    OneTask,
    CreateModal,
    TaskEditModal,
    VueDraggableNext,
    RulesModal,
  },
  data() {
    return {
      isClose: false,
      openCreateModal: false,
      openCreateTask: false,
      createMessage: "",
      openRules: false,
      board: this.task,
      newColumn: {
        type: {} as OneColumnInterface,
      },
      oneTask: {} as OneTaskInterface,
      indexOfTask: {} as OneColumnInterface,
      isCreateTask: true,
      createModalMessage: "Новый столбец",
      saveOrCreate: "create",
      tempColumn: {} as OneColumnInterface,
      rules: [
        { start: "Надо сделать", end: "готово" },
        { start: "В работе", end: "Надо сделать" },
      ],
      indexOfRule: 0,
      allRules: [
        { board: "Доска 2", rules: [{ start: "Надо сделать", end: "готово" }] },
      ],
    };
  },
  methods: {
    isEmpty: function (i: OneColumnInterface) {
      return i.tasks[0];
    },
    addColumn: function () {
      this.createModalMessage = "Новый столбец";
      this.createMessage = "Добавить столбец";
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
      this.updateDB();
    },

    closeCreateModal() {
      this.openCreateModal = false;
      this.isClose = false;
    },
    closeAllModals() {
      if (this.openCreateModal || this.openCreateTask || this.openRules) {
        this.isClose = !this.isClose;
      } else {
        this.isClose = false;
      }
      console.log(this.isClose);

      if (!this.isClose) {
        this.openCreateModal = false;
        this.openCreateTask = false;
        this.openRules = false;
      }
    },

    addCreateModal: function (newColumn: string) {
      if (this.board !== undefined) {
        this.board.columns.push({
          name: newColumn,
          tasks: [],
        });
        this.closeCreateModal();
        this.updateDB();
      }
    },

    getColumnNumber: function (column: OneColumnInterface) {
      if (this.board !== undefined) {
        return this.board.columns.findIndex(
          (i: { name: string }) => i.name === column.name
        );
      }
      return 0;
    },

    rulesSearch: function (massFrom: any, massTo: any): boolean {
      let temp = massTo[0].toLowerCase();
      let tempEl: any = [];
      this.rules.forEach((el: { start: string; end: string }) => {
        if (massFrom[0].toLowerCase() === el.start.toLowerCase()) {
          tempEl.push(el.end.toLowerCase());
        }
      });
      let temper = true;
      tempEl.forEach((el: string) => {
        console.log(tempEl);
        console.log(el, temp);
        if (temp === el) {
          temper = false;
        }
      });
      return temper;
    },

    onMoveCallback: function (evt: {
      draggedContext: any;
      from: any;
      to: any;
    }) {
      let massFrom = evt.from.parentElement.innerText.split("\n");
      let massTo = evt.to.parentElement.innerText.split("\n");

      let res = this.rulesSearch(massFrom, massTo);

      if (!res) {
        return false;
      }

      return massFrom[0].toLowerCase() !== "готово";
    },

    flipDrag: function (evt: { draggedContext: any; from: any }) {
      let massOfEl = Array.from(document.getElementsByTagName("div"));
      massOfEl.forEach((el) => {
        if (el.getAttribute("animation") === "100") {
          el.classList.toggle("min-height-40");
          let b = Array.from(document.getElementsByTagName("body"));
          b[0].style.overflow =
            b[0].style.overflow === "hidden" ? "auto" : "hidden";
        }
      });
      this.updateDB();
      return 0;
    },

    removeBoard: function (column: OneColumnInterface) {
      if (this.board != undefined) {
        let index = this.board.columns.indexOf(column);
        this.board.columns.splice(index, 1);
        this.updateDB();
      }
    },

    setTempValue: function (column: OneColumnInterface) {
      this.tempColumn = column;
    },

    editBoard: function (column: OneColumnInterface) {
      this.createMessage = "Изменить столбец";
      this.createModalMessage = column.name;
      this.saveOrCreate = "save";
      this.openCreateModal = !this.openCreateModal;
      this.tempColumn = column;
    },

    editTask: function (tasks: {
      taskOld: OneTaskInterface;
      taskNew: OneTaskInterface;
      status?: string;
    }) {
      let indexBoard = this.findInBoards(this.task.name, this.boards);
      let indexColumn = this.findInBoards(
        this.tempColumn.name,
        this.boards[indexBoard].columns
      );
      let indexTask = this.boards[indexBoard].columns[
        indexColumn
      ].tasks.findIndex(
        (el: { title: string }) => el.title == tasks.taskOld.title
      );

      if (tasks.status === "remove") {
        console.log(indexTask);
        console.log(
          this.boards[indexBoard].columns[indexColumn].tasks.splice(
            indexTask,
            1
          )
        );
      } else {
        this.boards[indexBoard].columns[indexColumn].tasks[indexTask] =
          tasks.taskNew;
      }

      this.updateBoards(this.boards);
    },

    saveModal: function (column: string) {
      let indexBoard = this.findInBoards(this.task.name, this.boards);
      let indexColumn = this.findInBoards(
        this.tempColumn.name,
        this.boards[indexBoard].columns
      );
      this.boards[indexBoard].columns[indexColumn].name = column;
      this.updateBoards(this.boards);
      this.closeCreateModal();
    },
    findInBoards: function (name: string, obj: []) {
      return obj.findIndex((el: { name: string }) => el.name == name);
    },

    addRule: function () {
      this.openRules = true;
    },
    closeRules: function (rul: RulesInterface) {
      this.openRules = false;
      console.log(rul);
      this.rules = rul;
      this.allRules[this.indexOfRule].rules = this.rules;
      this.updateRules();
    },
    getRules: async function () {
      const allRules = await getDoc(doc(db, "db", "rules"));
      let allRule = allRules.data()?.rules;
      let indexOfRule = allRule.findIndex(
        (el: any) => el.board === this.board.name
      );
      console.log(this.board.name);
      if (indexOfRule === -1) {
        indexOfRule = allRule.length;
        allRule.push({ board: this.board.name, rules: [] });
      }
      this.allRules = allRule;
      this.rules = allRule[indexOfRule].rules;
      this.indexOfRule = indexOfRule;
    },
    updateRules: async function () {
      await setDoc(doc(db, "db", "rules"), {
        rules: this.allRules,
      });
    },
    updateDB: function () {
      let index = this.findInBoards(this.task.name, this.boards);
      this.boards[index] = this.board;
      this.updateBoards(this.boards);
    },
  },
  mounted() {
    this.getRules();
  },

  watch: {
    task: function () {
      this.board = this.task;
      this.getRules();
    },
  },
});
</script>

<style scoped lang="scss">
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
  font-family: "Poppins", sans-serif;
}

.project-participants span,
.project-participants__add {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: var(--purple);
  border-radius: 100rem;
  margin: 0 0.2rem;
  font-family: "Poppins", sans-serif;
}

.project-participants__add {
  background: transparent;
  border: 1px dashed #969696;
  font-size: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
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

.project-participants__add--left {
  margin-bottom: 1rem;
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
  &::before {
    position: absolute;
    background: var(--tag-4-text);
    width: 1000px;
    height: 90%;
    content: "";
    top: 0;
    left: 0;
    z-index: 1000;
  }
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
  svg {
    width: 1rem;
    height: 1rem;
  }
}

.task-boards {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed transparent;
  &:hover .task-remove {
    visibility: visible;
  }
}

.hover-bottom-border {
  transition: 0.1s;
  &:hover {
    border-bottom: 2px dashed var(--purple);
  }
}

.task-boards--edit-panel {
  display: flex;
  gap: 1rem;
}
</style>
