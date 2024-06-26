import { state } from "./state";
import { Task } from "./state";

class Observable {
    state:any;
    constructor() {
        this.state = [];
      }
    
      subscribe(event: string | number, handler: any) {
        if (this.state[event]) {
          this.state[event].push(handler);
        } else {
          this.state[event] = [handler];
        }
      }
    
      emit(event: string | number, data: any) {
        if (this.state[event]) {
          this.state[event].forEach((callback: (arg0: any) => any) => callback(data));
        }
      }

}


export const observable = new Observable()
  
 