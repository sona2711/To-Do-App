import { Calendar } from '../calendar';
import { Validator } from '../validator';
import { observable } from "../../observable";
import { state } from "../../state";
import { Task } from "../../state";
import './style.scss';


export class  AddTaskForm {
    formWrapper = document.getElementById("form-wrapper");
    form : HTMLFormElement;
    inputTitle: HTMLInputElement;
    selectOption: HTMLSelectElement;
    description: HTMLTextAreaElement;
    addTaskBtn: HTMLButtonElement;
    dateInputBtn: HTMLDivElement;
    id:number = 1;
    task: Task = {
        id: 0,
        title: "",
        description: "",
        date: "",
        priority: "",
        completed: false,
    };
    
    
    
    
constructor() {
    this.form = document.createElement("form");
    this.inputTitle = document.createElement("input");
    this.selectOption = document.createElement("select");
    this.description = document.createElement("textarea");
    this.addTaskBtn = document.createElement("button");
    this.dateInputBtn= document.createElement("div")

    
    this.createForm(this.form)
    this.createTitleInput(this.inputTitle)
    this.createPriorityList(this.selectOption)
    this.createDateInput(this.dateInputBtn)
    this. createTextField(this.description)
    this.createSubmitButton(this.addTaskBtn)
    this.getFormValue(this.form, this.task, this.addTaskBtn)
    
    console.log(this.inputTitle.value)

}
   
private createForm(form:HTMLFormElement ){
    form.className = "form"
    form.name = "task-form"
    form.id = "form"
    // this.form.method = "POST"
    this.formWrapper?.appendChild(form)

}

 private createTitleInput(input:HTMLInputElement) {
    input.type = "text";
    input.placeholder = "Title"
    input.className = "form-title"; 
    input.id = "form-title";
    input.required = true;
    input.value = ""
    this.form.appendChild(input); 
 }

 private createPriorityList(select: HTMLSelectElement) {
    select.className = "select-list";
    select.id = "select-list";
    select.name = "priority"


    const options:string[] = ["High", "Medium","Low"];

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }
    this.form.appendChild(select); 
 }


 private createDateInput(buttonDate: HTMLDivElement){
    buttonDate.innerHTML = "Date";
    buttonDate.className = "add-btn" 
    this.form.appendChild(buttonDate); 

    buttonDate.addEventListener("click", () => {
       const calendar = new Calendar();
    
    })

 }

 private createTextField(textField: HTMLTextAreaElement){
    textField.className = "task-body";
    textField.id= "task-body";
    textField.placeholder = "Description";
    textField.value = ""
    this.form.appendChild(textField);
 }



 private createSubmitButton(button: HTMLButtonElement){
    button.className = "add-btn";
    button.innerHTML= "Add";
    this.form.appendChild(button);

 }

private getFormValue(form:HTMLElement, task:Task, btn: HTMLButtonElement){
    form.addEventListener('submit', (event)=> {
        task = {
            id: this.id++,
            title: this.inputTitle.value,
            description: this.description.value,
            date: "",
            priority:this.selectOption.value,
            completed: true,
        }
        console.log(task)

        
        // if(task.title.length === 0) {
        //     const requiredError = new Validator(this.inputTitle)
        // }else if(task.description.length === 0){
        //     const requiredError = new Validator(this.description)
        // }else if(task.date.length === 0){
        //     const requiredError = new Validator(this.dateInputBtn)
        // }else if(task.priority.length === 0){
        //     const requiredError = new Validator(this.selectOption)
        // }else {

        observable.subscribe("addTask", (task:Task) => {
            state.data.push(task);
            console.log(state.data);
          });
         
         
        btn.addEventListener("click", () => {
            observable.emit("addTask", task)
        })  
 
        
        event.preventDefault();
        this.form.reset()
        // }
    })

    

}

}
