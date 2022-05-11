<template>
  <div class="details-modal" draggable="false">
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
        <h2>Правила перемещения тасков {{ boardName }}</h2>
      </div>
    </div>
    <div class="details-modal-title">
      <p>
        Таски внизу не будут иметь возможности переноситься из начала в конец,
        но не наоборот
      </p>
    </div>
    <div class="details-modal-content rules">
      <div class="rule rule-start rule-title"><h3>Начало</h3></div>
      <div class="rule rule-end rule-title"><h3>Конец</h3></div>
      <div v-for="i in rulesMass" :key="i" class="rules">
        <div class="rule rule-start">
          {{ i.start }}
        </div>
        <div class="rule rule-end">
          {{ i.end }}
        </div>
        <a href="#" class="btn task-remove" @click="removeRule(i)"
          ><svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
            ></path></svg
        ></a>
      </div>
      <div class="rules" v-if="isCreateRule">
        <div class="rule rule-start">
          <select
            v-model="tempRule.start"
            class="details-modal-edit-inputs edit-inputs-h1"
          >
            <option v-for="i in columns" :key="i">{{ i.name }}</option>
          </select>
        </div>
        <div class="rule rule-end">
          <select
            v-model="tempRule.end"
            class="details-modal-edit-inputs edit-inputs-h1"
          >
            <option v-for="i in columns" :key="i">{{ i.name }}</option>
          </select>
        </div>
        <a href="#" class="btn" @click="addRule()">Добавить</a>
      </div>
    </div>
    <div class="details-modal-content">
      <a
        v-show="!isCreateRule"
        href="#"
        class="task-remove project-participants__add"
        @click="openAddRule()"
      ></a>
    </div>

    <div class="details-modal-content">
      <div class="details-modal-content">
        <a href="#" class="btn" @click="closeModal">Сохранить</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop, PropType } from "vue";
import OneRuleInterface from "@/interfaces/OneRuleInterface";
import RulesInterface from "@/interfaces/RulesInterface";
import OneBoardInterface from "@/interfaces/OneBoardInterface";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase_config";

export default defineComponent({
  name: "RulesModal",
  props: {
    rules: {
      type: Array as PropType<RulesInterface>,
      default: {} as PropType<RulesInterface>,
    },
    columns: {
      type: Object as PropType<OneBoardInterface>,
      default: Object as PropType<OneBoardInterface>,
    },
    boardName: String,
  },
  data: function () {
    return {
      rulesMass: this.rules,
      isCreateRule: false,
      tempRule: {} as OneRuleInterface,
    };
  },
  emits: ["close-rules-modal"],
  methods: {
    closeModal: function () {
      this.$emit("close-rules-modal", Object.assign(this.rulesMass));
    },
    openAddRule: function () {
      this.isCreateRule = true;
    },
    addRule: function () {
      this.rulesMass.push(this.tempRule);
      this.tempRule = {} as OneRuleInterface;
      this.isCreateRule = false;
    },
    removeRule: function (rule: OneRuleInterface) {
      let index = this.rulesMass.indexOf(rule);
      this.rulesMass.splice(index, 1);
    },
  },
  watch: {
    rules: function () {
      this.rulesMass = this.rules;
    },
  },
});
</script>

<style scoped lang="scss">
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
    font-size: 1rem;
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
.details-modal-edit-inputs {
  outline: none;
  font-size: 1rem;
  transition: padding 0.1s;

  padding: 0.2rem;
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
.rules {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  color: #2e2e2f;
  width: 100%;
  .rule {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    p {
      color: white;
    }
    border-bottom: var(--purple) 1px dotted;
  }
  a.btn {
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
  .rule-title {
    background: var(--purple);
  }
}
.project-participants__add {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: var(--purple);
  border-radius: 100rem;
  margin: 0 0.2rem;
  overflow: hidden;
  background: transparent;
  border: 1px dashed #969696;
  font-size: 0;
  cursor: pointer;
  position: relative;
  font-family: "Poppins", sans-serif;
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
