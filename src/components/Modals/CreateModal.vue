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
        <h2>{{ message }}</h2>
      </div>
    </div>
    <div class="details-modal-title">
      <div class="details-modal-title-text">
        <label
          ><input
            type="text"
            class="details-modal-edit-inputs edit-inputs-h1"
            v-model="boardName"
        /></label>
      </div>
    </div>
    <div class="details-modal-content">
      <a href="#" class="btn" @click="closeWithEdit">
        <template v-if="saveOrCreate === 'save'">Сохранить</template>
        <template v-else>Добавить</template>
      </a>
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
    message: {
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
  transition: padding 0.1s;
  padding: 0.3rem;
  border: 1px solid var(--purple);
}

.edit-inputs-h1 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
}

.details-modal-create-task {
  transform: translate(-50%, 50%);
  width: 30em;
  height: 15rem;
}
</style>
