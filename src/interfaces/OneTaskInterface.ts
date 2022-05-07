export default interface OneTaskInterface {
  title: string;
  description: string;
  date: { start: string; end: string };
  competitions: Array<string>;
  user?: any;
}
