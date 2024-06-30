import { state } from "../../state";

import './style.scss';


export class TaskList {
  taskTableWrapper = document.getElementById("task-table-wrapper");
  table:HTMLTableElement
  constructor(){
    this.table = document.createElement('table');
    this.table.className = "task-table"
    this.taskTableWrapper?.appendChild(this.table);


    this.getTasks()

  }


  getTasks():void {
    state.data.forEach(el => {
      // console.log(el)
      const newRow = document.createElement("tr")
      Object.keys(el).forEach(key => {
        const rowTitle = document.createElement("th")
        rowTitle.innerHTML = key
        newRow.appendChild(rowTitle)
      }) 
       const dataValue = document.createElement("td")
       dataValue.innerHTML = el.date
       

    });
   
  }
}