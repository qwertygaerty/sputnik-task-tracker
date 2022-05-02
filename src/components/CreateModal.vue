<template>
  <div class="details-modal details-modal-create-task">
    <div class="details-modal-close" @click="closeModal">
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
      <div class="details-modal-title-text">
        <label
          ><input
            type="text"
            class="details-modal-edit-inputs edit-inputs-h1"
            v-model="boardName"
        /></label>
        <a href="#" class="btn" @click="closeWithEdit">
          <template v-if="saveOrCreate === 'save'">Сохранить</template>
          <template v-else>Добавить</template>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateModal",
  props: {
    inputName: {
      type: String,
      default: "",
    },
    saveOrCreate: { type: String, default: "create" },
  },
  emits: [
    "close-edit-modal",
    "close-create-modal",
    "close-save-create-modal",
    "close-edit-create-modal",
  ],
  data() {
    return {
      boardName: this.inputName,
    };
  },

  methods: {
    closeModal: function () {
      if (this.saveOrCreate === "save") {
        this.$emit(`close-edit-modal`, this.boardName);
      } else {
        this.$emit(`close-create-modal`, this.boardName);
      }
    },
    closeWithEdit: function () {
      if (this.saveOrCreate === "save") {
        this.$emit("close-save-create-modal", this.boardName);
      } else {
        this.$emit(`close-edit-create-modal`, this.boardName);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.details-modal-edit-inputs {
  outline: none;
  font-size: 1rem;
  border: none;
  transition: padding 0.1s;
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
}

.edit-inputs-textarea::-webkit-scrollbar {
  width: 0;
}

.details-modal-edit-inputs:focus {
  border: 1px solid var(--purple);
  padding: 0.2rem;
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

    .task-activity {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
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
}

.details-modal-input .btn {
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

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: black;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}

.svg-icon-card {
  margin-right: 1rem;
}

.grow-wrap {
  display: grid;
  &::after {
    content: attr(data-replicated-value) " ";
    white-space: pre-wrap;
    visibility: hidden;
  }
  > textarea {
    resize: none;
  }
  &::after {
    grid-area: 1 / 1 / 2 / 2;
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
