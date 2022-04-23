import OneTaskInterface from "@/interfaces/OneTaskInterface";

export default interface OneBoardInterface {
  name: string;
  columns: [
    {
      name: string;
      tasks: Array<OneTaskInterface>;
    }
  ];
  users: any;
}
