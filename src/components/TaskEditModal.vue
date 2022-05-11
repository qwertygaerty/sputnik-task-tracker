<template draggable="false">
  <div class="details-modal" draggable="false">
    <div
      class="details-modal-close"
      @click="closeModal"
      v-show="!failedValidation"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
          fill="black"
        />
      </svg>
    </div>
    <div class="details-modal-title">
      <svg class="svg-icon svg-icon-card" viewBox="0 0 20 20">
        <path
          d="M17.728,4.419H2.273c-0.236,0-0.429,0.193-0.429,0.429v10.304c0,0.234,0.193,0.428,0.429,0.428h15.455c0.235,0,0.429-0.193,0.429-0.428V4.849C18.156,4.613,17.963,4.419,17.728,4.419 M17.298,14.721H2.702V9.57h14.596V14.721zM17.298,8.712H2.702V7.424h14.596V8.712z M17.298,6.566H2.702V5.278h14.596V6.566z M9.142,13.005c0,0.235-0.193,0.43-0.43,0.43H4.419c-0.236,0-0.429-0.194-0.429-0.43c0-0.236,0.193-0.429,0.429-0.429h4.292C8.948,12.576,9.142,12.769,9.142,13.005"
        ></path>
      </svg>

      <div class="details-modal-title-text">
        <p
          class="task__tag task__tag--validation-message"
          v-if="!validator(modalTask.title)"
        >
          {{ `Введите имя` }}
        </p>
        <label>
          <input
            type="text"
            class="details-modal-edit-inputs edit-inputs-h1"
            v-model="modalTask.title"
            v-on:focus="autoGrow(this)"
        /></label>
        <p>в колонке <a href="#">Нужно сделать</a></p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        class="svg-icon-card svg-icon"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        style="fill: #000000"
      >
        <path
          d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"
        ></path>
      </svg>
      <input
        class="details-modal-edit-inputs details-modal-edit-date"
        type="date"
        :placeholder="date.start || `Введите дату начала`"
        v-model="date.start"
      />
      |
      <input
        class="details-modal-edit-inputs details-modal-edit-date"
        type="date"
        :placeholder="date.end || `Введите дату конца`"
        v-model="date.end"
      />

      <div class="task__tags details-modal-task-tags">
        <span
          class="task__tag task__tag--copyright"
          v-if="oneTask.competitions"
        >
          {{ oneTask.competitions }}
        </span>
        <span
          class="task__tag task__tag--no-competitions"
          v-for="i in this.competitions"
          @click="addCompetition(i.name)"
          :key="i"
        >
          {{ i.name }}
        </span>
      </div>
    </div>

    <div class="details-modal-content">
      <svg class="svg-icon svg-icon-card" viewBox="0 0 20 20">
        <path
          fill="none"
          d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"
        ></path>
      </svg>
      <h4>Описание</h4>

      <div class="details-modal-content">
        <div class="details-modal-title-text">
          <p
            class="task__tag task__tag--validation-message"
            v-if="!validator(modalTask.description)"
          >
            {{ `Введите Описание` }}
          </p>
          <p>
            <label class="grow-wrap">
              <textarea
                class="details-modal-edit-inputs edit-inputs-textarea"
                v-on:focus="autoGrow(this)"
                v-model="modalTask.description"
              >
              </textarea>
            </label>
          </p>
        </div>
      </div>
    </div>

    <div class="details-modal-content">
      <svg class="svg-icon svg-icon-card" viewBox="0 0 20 20">
        <path
          fill="none"
          d="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
								c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
								s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
								c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
								 M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
								S11.657,15.576,11.304,15.576z"
        ></path>
      </svg>
      <h4>Действия</h4>
      <div class="details-modal-content">
        <div class="details-modal-title-text">
          <p>
            <a href="#" class="btn">Показать</a>
          </p>
        </div>
      </div>
    </div>
    <div class="details-modal-content details-modal-task">
      <div class="task-activity">
        <ul>
          <li>
            <span class="task-icon task-icon--edit"></span>
            <b>Илья</b> написал коммент
            <time>April 13</time>
          </li>
        </ul>
      </div>
    </div>

    <div class="details-modal-content">
      <svg class="svg-icon svg-icon-card" viewBox="0 0 20 20">
        <path
          d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"
        ></path>
      </svg>
      <h4>Комментарии</h4>
      <div class="details-modal-content">
        <div class="details-modal-title-text">
          <p>
            <a href="#" class="btn">Показать</a>
          </p>
        </div>
      </div>
    </div>

    <div class="details-modal-content details-modal-task">
      <div class="task-activity">
        <ul>
          <li>
            <span class="task-icon task-icon--edit"></span>
            <b>Илья</b>
            <p class="task-comment-text">Это не верстка это просто шляпа</p>
            <time>April 1</time>
          </li>
          <li>
            <span class="task-icon task-icon--edit"></span>
            <b>Илья</b>
            <p class="task-comment-text">Это не верстка это просто шляпа</p>
            <time>April 1</time>
          </li>
          <li>
            <span class="task-icon task-icon--edit"></span>
            <b>Илья</b>
            <p class="task-comment-text">Это не верстка это просто шляпа</p>
            <time>April 1</time>
          </li>
        </ul>
      </div>
    </div>

    <div class="details-modal-content">
      <div class="details-modal-content">
        <a href="#" class="btn" @click="closeModal">Сохранить</a>
        <a href="#" class="btn btn-delete" @click="closeModal('remove')"
          >Удалить</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import OneTaskInterface from "../interfaces/OneTaskInterface";
import OneColumnInterface from "@/interfaces/OneColumnInterface";
import OneActivityInterface from "@/interfaces/OneActivityInterface";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

export default defineComponent({
  name: "TaskEditModal",
  props: {
    oneTask: {
      type: Object as PropType<OneTaskInterface>,
      default: Object as PropType<OneTaskInterface>,
    },
    isCreateTask: {
      type: Boolean,
      default: true,
    },
    boardName: {
      type: String,
      default: "",
    },
  },
  emits: ["close-edit-modal", "close-modal", "close-modal-remove"],
  data() {
    return {
      modalTask: this.oneTask,
      date: this.oneTask?.date || { start: "", end: "" },
      failedValidation: false,
      competitions: [{} as OneActivityInterface],
    };
  },
  methods: {
    async reset() {
      this.modalTask = Object.assign({}, this.oneTask);
      this.date = Object.assign(
        {},
        this.oneTask?.date || { start: "", end: "" }
      );
      this.failedValidation = false;
      const allActivity = await getDoc(doc(db, "db", "activity"));
      let indexOfRecent = allActivity
        .data()
        ?.activities.findIndex((el: any) => el.board === this.boardName);
      if (indexOfRecent === -1) {
        return;
      }
      this.competitions =
        allActivity.data()?.activities[indexOfRecent].competitions;
      console.log(this.competitions);
    },

    autoGrow(elem: any) {
      elem.height = elem.scrollHeight + "px";
    },

    addCompetition(competition: string) {
      if (this.modalTask) {
        this.modalTask.competitions.push(competition);
      }
    },
    closeModal(status?: string) {
      if (this.modalTask !== undefined) {
        this.modalTask.date = this.date;
        if (this.modalTask.competitions === undefined) {
          this.modalTask.competitions = [];
        }
      }

      if (status === "remove") {
        this.$emit(`close-modal-remove`, this.oneTask);
        return;
      }

      if (!this.isCreateTask) {
        this.$emit(`close-edit-modal`, this.modalTask);
      } else {
        this.$emit(`close-modal`, this.modalTask);
      }
    },

    validator(data: boolean) {
      return data;
    },
  },
  async mounted() {
    this.reset();
  },
  async created() {
    this.reset();
  },
});
</script>

<style scoped lang="scss">
.details-modal-edit-inputs {
  outline: none;
  font-size: 1rem;
  transition: padding 0.1s;

  padding: 0.2rem;
  &:focus {
    padding: 0.3rem;
  }
}

.details-modal-edit-inputs:not(.details-modal-edit-date) {
  border: 1px solid var(--purple);
}

.details-modal-edit-date {
  text-align: center;
  width: 7rem;
  border: none;
}

.edit-inputs-h1 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
}

.edit-inputs-textarea {
  font-size: 1rem;
  font-weight: 200;
  width: 837px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.details-modal {
  background: #ffffff;
  border-radius: 0.5em;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  left: 50%;
  max-width: 90%;
  position: fixed;
  top: 0;
  transform: translate(-50%, 3%);
  width: 60em;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  height: 95vh;
  overflow-x: hidden;
  -ms-overflow-style: none;
  z-index: 1000;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .details-modal-close {
    align-items: center;
    color: #111827;
    display: flex;
    height: 4.5em;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 4.5em;
    z-index: 8;
  }
  .details-modal-close svg {
    display: block;
    cursor: pointer;
  }
  .details-modal-title {
    color: #111827;
    padding: 1.5em 2em;
    pointer-events: all;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #e0e0e0;
  }
  .details-modal-title a:not(.btn) {
    color: var(--purple);
  }
  .details-modal-title h1 {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: normal;
  }
  .details-modal-content {
    padding: 1rem 2rem;
    pointer-events: all;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .details-modal-task {
    padding: 0 2rem;
    pointer-events: all;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  .details-modal-task .task-activity {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

.details-modal-overlay {
  transition: opacity 0.2s ease-out;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.8);
  position: fixed;
  opacity: 0;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.details-modal-input {
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    margin-left: 1rem;
  }
}

.details-modal-title-text ~ svg {
  margin-left: 1rem;
}

.details-modal-create-task {
  height: auto;
  transform: translate(-50%, 50%);
  width: 30em;
}

.details-modal-task-tags {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.svg-icon {
  width: 2rem;
}
.svg-icon-edit {
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
}

.svg-icon {
  path,
  polygon,
  rect {
    fill: black;
  }
  circle {
    stroke: #4691f6;
    stroke-width: 1;
  }
}

.svg-icon-card {
  margin-right: 1rem;
}

.task__tag--validation-message {
  color: #ff4d4d;
  border-radius: 1rem 1rem 0 0;
  background-color: #ffe6e6;
  text-align: center;
}

.btn-delete {
  margin-left: 2rem;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .edit-inputs-textarea {
    width: auto;
  }
}
</style>
