export type Task = {
    id: number,
    title: string,
    description: string,
    date: string,
    priority: string,
    completed: boolean,
  }
  
interface IState  {
    data:Task[];
}
  export const state: IState = {
    data:[],
  };
