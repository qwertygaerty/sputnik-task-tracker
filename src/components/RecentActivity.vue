<template>
  <div class="tag-progress">
    <h2>Ход выполнения задач</h2>

    <template v-if="activities">
      <div class="tag-progress" v-for="j in activities.competitions" :key="j">
        <p>{{ j.name }} <span>1/8</span></p>
        <progress
          class="progress"
          max="8"
          value="1"
          :style="{ this.webkitProgressValue: j.color }"
        >
          1
        </progress>
      </div>
    </template>

    <div>
      <a href="#" class="project-participants__add" @click="openAddRecent"></a>
    </div>

    <div class="tag-create" v-if="isCreate">
      <color-picker
        v-model:pureColor="pureColor"
        v-model:gradientColor="gradientColor"
        shape="circle"
      />
      <div class="tag-create-text tag-progress">
        <label
          ><input
            type="text"
            class="details-modal-edit-inputs"
            v-model="tagTitle"
        /></label>
      </div>
      <a href="#" class="btn" @click="addRecent">Добавить</a>
    </div>
  </div>
  <div class="task-activity">
    <h2>Недавняя активность</h2>
    <ul>
      <li>
        <span class="task-icon task-icon--edit"></span>
        <b>Илья</b> написал коммент
        <time>April 10</time>
      </li>
      <li>
        <span class="task-icon task-icon--attachment"></span>
        <b>avgus</b> написал коммент
        <time>April 11</time>
      </li>
      <li>
        <span class="task-icon task-icon--comment"></span>
        <b>Агаев</b> написал коммент
        <time>April 12</time>
      </li>
      <li>
        <span class="task-icon task-icon--edit"></span>
        <b>Илья</b> написал коммент
        <time>April 13</time>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";
import ActivityInterface from "@/interfaces/ActivityInterface";
import OneActivityInterface from "@/interfaces/OneActivityInterface";

export default defineComponent({
  setup() {
    const pureColor = ref("#809fff");
    const gradientColor = ref(
      "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
    );

    return { pureColor, gradientColor };
  },
  name: "RecentActivity",
  data: function () {
    return {
      isCreate: false,
      activities: {} as OneActivityInterface,
      competitions: [{ color: "", name: "" }],
      tagTitle: "",
      allActivities: [] as ActivityInterface,
      indexOfRecent: 0,
    };
  },
  methods: {
    openAddRecent() {
      this.isCreate = !this.isCreate;
    },
    addRecent() {
      this.activities.competitions.push({
        color: this.pureColor,
        name: this.tagTitle,
      });
      this.allActivities[this.indexOfRecent] = this.activities;
      console.log(this.allActivities);
      this.isCreate = !this.isCreate;
      this.updateDB();
    },
    async updateDB() {
      await setDoc(doc(db, "db", "activity"), {
        activities: this.allActivities,
      });
    },
  },
  watch: {
    pureColor: function () {
      console.log(this.pureColor);
    },
  },
  async mounted() {
    const allActivity = await getDoc(doc(db, "db", "activity"));
    this.allActivities = allActivity.data()?.activities;
    this.indexOfRecent = this.allActivities.findIndex(
      (el: any) => el.board === "Доска 2"
    );
    this.activities = allActivity.data()?.activities[this.indexOfRecent];
  },
});
</script>

<style scoped lang="scss">
.tag-create {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.tag-create input {
  width: 75%;
}

.details-modal-edit-inputs {
  outline: none;
  font-size: 1rem;
  border: none;
  transition: padding 0.1s;
  &:focus {
    border: 1px solid var(--purple);
    padding: 0.2rem;
  }
}

.vc-color-wrap {
  border-radius: 40px;
}

.tag-progress {
  margin: 1.5rem 0;
  h2 {
    font-size: 18px;
    margin-bottom: 1rem;
  }
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
    span {
      color: #b4b4b4;
    }
  }
  .progress {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10px;
    height: 10px;
  }
  p .tag-progress .progress {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10px;
    height: 10px;
  }
  .progress::-webkit-progress-bar,
  .tag-progress .progress::-webkit-progress-value {
    border-radius: 10px;
  }

  .progress--back::-webkit-progress-bar {
    background-color: var(--tag-4);
  }
  .progress--back::-webkit-progress-value {
    background: var(--tag-4-text);
  }
  .progress--analise::-webkit-progress-bar {
    background-color: var(--tag-2);
  }
  .progress--analise::-webkit-progress-value {
    background-color: var(--tag-2-text);
  }
  .progress--front::-webkit-progress-bar {
    background-color: var(--tag-3);
  }
  .progress--front::-webkit-progress-value {
    background-color: var(--tag-3-text);
  }
}

.project-participants__add {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: var(--purple);
  border-radius: 100rem;
  margin: 0 0.2rem;
  font-family: "Poppins", sans-serif;
  background: transparent;
  border: 1px dashed #969696;
  font-size: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
</style>
