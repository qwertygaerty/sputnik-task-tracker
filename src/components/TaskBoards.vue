<template>
  <div class="task-activity">
    <h2>Мои доски</h2>
    <ul>
      <li v-for="i in boards" :key="i">
        <span class="task-icon task-icon--edit"></span>
        <b class="task-highlight" @click="$emit(`getBoard`, i)">{{ i.name }}</b>
      </li>
      <li>
        <span class="task-icon task-icon--edit"></span>
        <a href="#" class="btn" @click="openModal">Добавить..</a>
      </li>
    </ul>
  </div>

  <CreateModal
    v-if="openCreateModal"
    :input-name="`Новая доска`"
    @closeModal="closeCreateModal"
    @openModal="addCreateModal"
  ></CreateModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CreateModal from "@/components/CreateModal.vue";
import OneBoardInterface from "@/interfaces/OneBoardInterface";

export default defineComponent({
  props: {
    Board: {
      type: Object as PropType<OneBoardInterface>,
    },
  },
  name: "TaskBoards",
  emits: ["getBoard"],
  components: { CreateModal },
  data() {
    return {
      boards: [
        {
          name: "Доска 1",
          columns: [
            {
              name: "Надо сделать",
              tasks: [
                {
                  title: "Написать апи на ларке",
                  description:
                    "Написать апи на ларкеНаписать апи на ларкеНаписать апи на ларкеНаписать апи на ларкеНаписать апи на ларке",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2021", end: "30.10.2022" },
                  competitions: "Бекэнд",
                },
                {
                  title: "Сверстать что нибудь",
                  description:
                    "Сверстать что нибудьСверстать что нибудьСверстать что нибудьСверстать что нибудьСверстать что нибудь",
                  user: { img: "red", name: "ilia" },
                  date: { start: "3.10.2022", end: "30.10.2023" },
                  competitions: "Фронтенд",
                },
                {
                  title: "Сделать анализ втупую",
                  description:
                    "Сделать анализ втупуюСделать анализ втупуюСделать анализ втупуюСделать анализ втупую",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2024", end: "30.10.2025" },
                  competitions: ["Аналитик", "Фронтенд"],
                },
              ],
            },
            {
              name: "В работе",
              tasks: [],
            },
            {
              name: "Готово",
              tasks: [],
            },
          ],
          users: [
            { img: "red", name: "daniel" },
            { img: "blue", name: "ilya" },
            { img: "purple", name: "masha" },
          ],
        },
      ],
      openCreateModal: false,
    };
  },
  methods: {
    getBoard: function (name: string) {
      console.log(name);
    },
    openModal() {
      this.openCreateModal = !this.openCreateModal;
    },

    closeCreateModal() {
      this.openCreateModal = false;
    },

    addCreateModal: function (Board: string) {
      this.boards.push({
        name: Board,
        columns: [],
        users: [{ img: "", name: "" }],
      });
      this.closeCreateModal();
    },
  },
});
</script>

<style scoped></style>
