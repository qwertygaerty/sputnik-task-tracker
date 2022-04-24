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
import { defineComponent } from "vue";
import CreateModal from "@/components/CreateModal.vue";

export default defineComponent({
  props: ["Board"],
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
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Бекэнд",
                },
                {
                  title: "Сверстать что нибудь",
                  description:
                    "Сверстать что нибудьСверстать что нибудьСверстать что нибудьСверстать что нибудьСверстать что нибудь",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Фронтенд",
                },
                {
                  title: "Сделать анализ втупую",
                  description:
                    "Сделать анализ втупуюСделать анализ втупуюСделать анализ втупуюСделать анализ втупую",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: ["Аналитик", "Фронтенд"],
                },
              ],
            },
            {
              name: "В работе",
              tasks: [
                {
                  title: "Написать апи на ларке",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Бекэнд",
                },
                {
                  title: "Сверстать что нибудь",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Фронтенд",
                },
                {
                  title: "Сделать анализ втупую",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Аналитик",
                },
              ],
            },
            {
              name: "Готово",
              tasks: [
                {
                  title: "Написать апи на ларке",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Бекэнд",
                },
                {
                  title: "Сверстать что нибудь",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Фронтенд",
                },
                {
                  title: "Сделать анализ втупую",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Аналитик",
                },
              ],
            },
          ],
          users: [
            { img: "red", name: "daniel" },
            { img: "red", name: "daniel" },
            { img: "red", name: "daniel" },
          ],
        },
        {
          name: "Доска 2",
          columns: [
            {
              name: "Готово",
              tasks: [
                {
                  title: "Написать апи на ларке",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Бекэнд",
                },
                {
                  title: "Сверстать что нибудь",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Фронтенд",
                },
                {
                  title: "Сделать анализ втупую",
                  description:
                    "https://github.com/qwertygaerty/sputnik-task-tracker/tree/063dedc04955f103b6c563cf2ca6b0a7aeb8e70a",
                  user: { img: "red", name: "ilia" },
                  date: { start: "30.10.2022", end: "30.10.2021" },
                  competitions: "Аналитик",
                },
              ],
            },
          ],
          users: [
            { img: "red", name: "daniel" },
            { img: "red", name: "daniel" },
            { img: "red", name: "daniel" },
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
    createBoard: function (Board: string) {
      console.log(Board);
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
        columns: [
          {
            name: "Надо сделать",
            tasks: [
              {
                title: "",
                description: "",
                user: { img: "", name: "" },
                date: { start: "", end: "" },
                competitions: "",
              },
            ],
          },
          {
            name: "В работе",
            tasks: [
              {
                title: "",
                description: "",
                user: { img: "", name: "" },
                date: { start: "", end: "" },
                competitions: "",
              },
            ],
          },
          {
            name: "Готово",
            tasks: [
              {
                title: "",
                description: "",
                user: { img: "", name: "" },
                date: { start: "", end: "" },
                competitions: "",
              },
            ],
          },
        ],
        users: [{ img: "", name: "" }],
      });
      this.closeCreateModal();
    },
  },
});
</script>

<style scoped></style>
