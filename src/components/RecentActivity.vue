<template>
  <div class="tag-progress">
    <h2>Ход выполнения задач</h2>

    <template v-if="activities">
      <div
        class="tag-progress tag-box"
        v-for="j in activities.competitions"
        :key="j"
      >
        <div class="progress-box">
          <p>{{ j.name }} <span>1/8</span></p>
          <progress class="progress" max="8" value="1">1</progress>
        </div>
        <a href="#" class="btn task-remove" @click="removeRecent(j)"
          ><svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
            ></path></svg
        ></a>
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

    removeRecent(recent: { color: ""; name: "" }) {
      let indexOfCompetition = this.activities.competitions.indexOf(recent);
      this.activities.competitions.splice(indexOfCompetition, 1);
      this.allActivities[this.indexOfRecent] = this.activities;
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
.task-remove {
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  align-self: flex-end;
  svg {
    width: 1rem;
    height: 1rem;
  }
}

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

  .tag-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
  .progress-box {
    width: 80%;
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
