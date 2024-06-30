import { Calendar } from '../calendar';
import { Validator } from '../validators/validator';
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
    validator: Validator;
    id:number = 1;
    
    
    
    
constructor() {
    this.form = document.createElement("form");
    this.inputTitle = document.createElement("input");
    this.selectOption = document.createElement("select");
    this.description = document.createElement("textarea");
    this.addTaskBtn = document.createElement("button");
    this.dateInputBtn= document.createElement("div")
    this.validator = new Validator()

    
    this.createForm(this.form)
    this.createTitleInput(this.inputTitle)
    this.createPriorityList(this.selectOption)
    this.createDateInput(this.dateInputBtn)
    this. createTextField(this.description)
    this.createSubmitButton(this.addTaskBtn)
    this.getFormValue()
    this.setupFormSubmission(this.form, this.addTaskBtn)
    

}
   
private createForm(form:HTMLFormElement ){
    form.className = "form";
    form.name = "task-form";
    form.id = "form";
    this.formWrapper?.appendChild(form);

}

 private createTitleInput(input:HTMLInputElement) {
    input.type = "text";
    input.placeholder = "Title";
    input.className = "form-title"; 
    input.id = "form-title";
    this.form.appendChild(input); 
 }

 private createPriorityList(select: HTMLSelectElement) {
    select.className = "select-list";
    select.id = "select-list";
    select.name = "priority";
    


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
    this.form.appendChild(textField);
 }



 private createSubmitButton(button: HTMLButtonElement){
    button.className = "add-btn";
    button.id = "addTaskBtn"
    button.innerHTML= "Add";
    this.form.appendChild(button);

 }


 private setupFormSubmission(form: HTMLElement, btn: HTMLButtonElement) {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            this.getValidationErrors();

            if (Object.keys(this.validator.getErrors()).length === 0) {
                this.getFormValue();
                this.form.reset();
            }
        });
    }
 


private getFormValue(){
       let  task = {
            id: this.id++,
            title: this.inputTitle.value,
            description: this.description.value,
            date: "",
            priority:this.selectOption.value,
            completed: true,
        }
       
        
        observable.subscribe("addTask", (task: Task) => {
            state.data.push(task);
            console.log(state.data);
        });

        observable.emit("addTask", task);
    }

    private getValidationErrors (){
      
        let isValid = true;
            
        this.validator.clearAllErrors();
    
        if (!this.inputTitle.value.trim()) {
            this.validator.createError(this.inputTitle.id, 'Title is required.');
            this.validator.showError(this.inputTitle);
            isValid = false;
        }
    
        if (!this.selectOption.value.trim()) {
            this.validator.createError(this.selectOption.id, 'Option is required.');
            this.validator.showError(this.selectOption);
            isValid = false;
        }
    
        if (!this.description.value.trim()) {
            this.validator.createError(this.description.id, 'Description is required.');
            this.validator.showError(this.description);
            isValid = false;
        }
    
        
        if (!this.dateInputBtn.innerHTML?.trim()) {
            this.validator.createError(this.dateInputBtn.id, 'Date is required.');
            this.validator.showError(this.dateInputBtn);
            isValid = false;
        }
    
        if (isValid) {
            console.log("Form is valid!");
          
        } else {
            console.log("Form is not valid!");
            console.log(this.validator.getErrors());
        }
    }
    

}
