import OneTaskInterface from "@/interfaces/OneTaskInterface";

export default interface OneColumnInterface {
  name: string;
  tasks: [(() => OneTaskInterface) | OneTaskInterface];
}
