<template>
  <header class="header">
    <h4 class="header-info">
      <img src="../assets/logo.png" alt="logo" class="header-logo" />Task
      Tracker
    </h4>
  </header>
  <BoardCreateModal
    v-if="openCreateModal"
    @closeModal="closeModal"
  ></BoardCreateModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoardCreateModal from "@/components/Modals/CreateModal.vue";

export default defineComponent({
  name: "HeaderPanel",
  components: { BoardCreateModal },
  data() {
    return {
      openCreateModal: false,
    };
  },
  methods: {
    openModal() {
      this.openCreateModal = !this.openCreateModal;
    },

    closeModal() {
      this.openCreateModal = false;
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 4rem;
  border-bottom: solid 2px var(--purple);
  padding: calc(2rem - 10px);
  .header-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.header-logo {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  padding: 0.1rem;
}

.header-elements {
  padding: calc(2rem - 10px);
}
</style>
