<template>
  <div class="task-activity">
    <h2>Мои доски</h2>
    <ul>
      <li v-for="i in boards" :key="i" class="task-boards hover-bottom-border">
        <span class="task-icon task-icon--edit"></span>
        <b class="task-highlight" @click="openTaskBoard(i)">{{ i.name }}</b>
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
        </div>
      </li>
      <li class="task-boards">
        <span class="task-icon task-icon--edit"></span>
        <a href="#" class="btn" @click="openModal">Добавить..</a>
      </li>
    </ul>
  </div>

  <CreateModal
    v-if="openCreateModal"
    :input-name="createModalMessage"
    :saveOrCreate="saveOrCreate"
    @closeCreateModal="closeCreateModal"
    @closeEditModal="closeCreateModal"
    @closeEditCreateModal="addCreateModal"
    @closeSaveCreateModal="saveModal"
    :message="createMessage"
  ></CreateModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CreateModal from "@/components/Modals/CreateModal.vue";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import BoardsInterface from "@/interfaces/BoardsInterface";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

export default defineComponent({
  props: {
    Board: {
      type: Object as PropType<OneBoardInterface>,
      default: Object as PropType<OneBoardInterface>,
    },
  },
  name: "TaskBoards",
  emits: ["get-board", "get-boards"],
  components: { CreateModal },
  data() {
    return {
      boards: [] as BoardsInterface,
      openCreateModal: false,
      openOneBoard: false,
      createModalMessage: "Новая доска",
      saveOrCreate: "create",
      tempBoard: {} as OneBoardInterface,
      createMessage: "",
    };
  },
  methods: {
    removeBoard: function (board: OneBoardInterface) {
      let index = this.boards.indexOf(board);

      if (this.openOneBoard) {
        this.$emit(`get-board`, this.boards[index] as OneBoardInterface);
        this.$emit(`get-boards`, this.boards);
      }
      this.boards.splice(index, 1);
      this.getBoards(true);
    },

    editBoard: function (board: OneBoardInterface) {
      this.createModalMessage = board.name;
      this.createMessage = "Редактировать Доску";
      this.saveOrCreate = "save";
      this.openCreateModal = !this.openCreateModal;
      this.tempBoard = board;
    },

    openModal() {
      this.saveOrCreate = "create";
      this.createMessage = "Создать новую доску";
      this.createModalMessage = "Новая доска";
      this.openCreateModal = !this.openCreateModal;
    },

    closeCreateModal() {
      this.openCreateModal = false;
    },

    saveModal: function (Board: string) {
      let index = this.boards.findIndex(
        (el) => el.name === this.tempBoard.name
      );
      this.boards[index].name = Board;
      console.log(this.boards[index]);
      this.closeCreateModal();
      this.getBoards(true);
    },

    addCreateModal: async function (Board: string) {
      await updateDoc(doc(db, "db", "boards"), {
        boards: arrayUnion({ name: Board, columns: [], users: [] }),
      });
      this.closeCreateModal();
      this.getBoards(false);
    },
    getBoards: async function (isUpdate: boolean) {
      if (isUpdate) {
        await setDoc(doc(db, "db", "boards"), { boards: this.boards });
      }

      const querySnapshot = await getDocs(collection(db, `db`));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        if (doc.id === "boards") {
          this.boards = doc.data().boards;
        }
      });
    },
    openTaskBoard: function (Board: OneBoardInterface) {
      this.$emit("get-board", Board);
      this.$emit(`get-boards`, this.boards);
      this.openOneBoard = true;
    },
  },
  async mounted() {
    this.getBoards(false);
  },
});
</script>
<style scoped lang="scss">
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

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .task-remove {
    visibility: visible;
  }
}
</style>
