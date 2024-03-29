<template>
  <HeaderPanel></HeaderPanel>
  <aside class="task-details">
    <RecentActivity :boardNow="boardNow"></RecentActivity>
    <TaskBoards
      @getBoard="getBoardTask"
      @getBoards="getBoards"
      :Board="newBoard"
    ></TaskBoards>
  </aside>
  <TaskBoard :task="board" v-if="Object.keys(board).length !== 0"></TaskBoard>
</template>

<script lang="ts">
import { provide, ref } from "vue";
import { defineComponent, PropType } from "vue";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import TaskBoards from "./TaskBoards.vue";
import RecentActivity from "../components/RecentActivity.vue";
import HeaderPanel from "./HeaderPanel.vue";
import TaskBoard from "../components/TaskBoard.vue";
import BoardsInterface from "@/interfaces/BoardsInterface";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

export default defineComponent({
  name: "HomePanel",
  setup() {
    const boards = ref({} as BoardsInterface);

    async function updateBoards(item: BoardsInterface) {
      boards.value = item;
      await setDoc(doc(db, "db", "boards"), { boards: boards.value });
    }

    provide("boards", {
      boards,
      updateBoards,
    });

    return {
      updateBoards,
      boards,
    };
  },
  components: { RecentActivity, TaskBoards, HeaderPanel, TaskBoard },
  data() {
    return {
      board: ref({} as OneBoardInterface),
      newBoard: {} as OneBoardInterface,
      boardsItem: {} as BoardsInterface,
      boardNow: "Доска 2",
    };
  },

  methods: {
    getBoards: function (item: BoardsInterface) {
      this.boardsItem = item;
      this.boards = this.boardsItem;
    },
    getBoardTask: function (item: OneBoardInterface) {
      if (this.board == item) {
        this.board = {} as OneBoardInterface;
        this.boardNow = "";
      } else {
        this.board = item;
        this.boardNow = item.name;
        console.log(this.boardNow);
      }
    },
  },
});
</script>

<style lang="scss">
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
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0 2px 8px 0;
    border-color: rgba(162, 179, 207, 0.2) !important;
  }
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    content: "";
    height: 2rem;
    z-index: 0;
  }
  p {
    font-size: 15px;
    margin: 1.2rem 0;
  }
}

.task-highlight {
  transition: color 0.3s;
  &:hover {
    cursor: pointer;
    color: var(--purple);
  }
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

.task__tag--no-competitions {
  color: #a6a6a6;
  background-color: #f2f2f2;
}

.task__tags {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  span:not(:last-of-type) {
    margin-right: 1rem;
  }
  svg {
    margin-right: 5px;
  }
  time {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

.task-activity {
  h2 {
    font-size: 18px;
    margin-bottom: 1rem;
  }
  li {
    list-style: none;
    margin: 1rem 0;
    padding: 0rem 1rem 1rem 3rem;
    position: relative;
  }
  time {
    display: block;
    color: var(--light-grey);
  }
}

.task-icon {
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon-svg {
  width: 15px;
  height: 15px;
}

.task-icon--attachment {
  background-color: #fba63c;
}

.task-icon--comment {
  background-color: #5dc983;
}

.task-icon--edit {
  background-color: #7784ee;
}

.task-comment-text {
  font-size: 0.85rem;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .task-details {
    width: 100%;
    display: flex;
    border: none;
  }

  .svg-icon-card {
    display: none;
  }

  .tag-progress,
  .task-activity {
    flex-basis: 100%;
    background: var(--white);
    width: 100%;
    padding: 1rem 1rem;
    border-radius: 0;
  }

  .task-details {
    flex-wrap: wrap;
    padding: 0;
  }
}
</style>
