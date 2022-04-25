import OneTaskInterface from "@/interfaces/OneTaskInterface";
import OneColumnInterface from "@/interfaces/OneColumnInterface";

export default interface OneBoardInterface {
  name: string;
  columns: Array<OneColumnInterface>;
  users: any;
}
