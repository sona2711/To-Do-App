import { state } from "../../state";
import { Task } from "../../state";
import './style.scss';

export class Filter {
    filterWrapper = document.getElementById("filter-wrapper");
    form: HTMLFormElement;
    showCompleted: HTMLInputElement;
    dateFrom: HTMLInputElement;
    dateTo: HTMLInputElement;
    textSearch: HTMLInputElement;

    data = state.data
    constructor(){
        this.form = document.createElement("form")
        this.form.className = "filter"
        this.filterWrapper?.appendChild(this.form);

        this.showCompleted = document.createElement("input");
        this.dateFrom = document.createElement("input");
        this.dateTo = document.createElement("input");
        this.textSearch = document.createElement("input");


        this.createShowCompleted(this.showCompleted, this.form);
        this.createDateFromInput(this.dateFrom,this.form);
        this.createDateToInput(this.dateTo,this.form);
        this.createTextInput(this.textSearch, this.form);


        this.createFilterComplete(this.data,  this.showCompleted)
        this.createFilterDate(this.data, this.dateFrom, this.dateTo)
        this.createFilterTitleDescription( this.data, this.textSearch)

    }


    createShowCompleted(checkbox:HTMLInputElement, form:HTMLFormElement){
        checkbox.type = "checkbox";
        checkbox.name = "showCompleted";
        checkbox.id = "showComplTask";
        checkbox.checked = false;


        const label = document.createElement("label");
        label.htmlFor = "showComplTask";
        label.innerHTML = "Show completed";

        form.appendChild(checkbox);
        form.appendChild(label);

    }
    

    createDateFromInput(dateInput:HTMLInputElement, form:HTMLFormElement) {
        dateInput.type = "date";
        dateInput.className = "date";
        dateInput.id = "dateFrom"
        
        const label = document.createElement("label");
        label.htmlFor = "dateFrom";
        label.innerHTML = "Date From:";

        form.appendChild(label);
        form.appendChild(dateInput);

    }
   
    createDateToInput(dateInput:HTMLInputElement, form:HTMLFormElement) {
        dateInput.type = "date";
        dateInput.className = "date";
        dateInput.id = "dateTo";


        const label = document.createElement("label");
        label.htmlFor = "dateTo";
        label.innerHTML = "Date To:";


        form.appendChild(label);
        form.appendChild(dateInput);


    }

    createTextInput(searchInput:HTMLInputElement, form:HTMLFormElement) {
        searchInput.type = "search";
        searchInput.placeholder = "Enter the task Title and Description..."
        searchInput.className = "searchText";


        form.appendChild(searchInput)

    }


    createFilterDate(taskList: Task[], startDate: HTMLInputElement, endDate:HTMLInputElement ){}



    createFilterComplete(taskList: Task[], checkbox:HTMLInputElement ){
        if(checkbox.checked == true) {
        taskList.find(el => {el.completed == true})
        }
    }



    createFilterTitleDescription(taskList: Task[], searchText:HTMLInputElement){
           const text = searchText.value.toLocaleLowerCase()

        taskList.find(el => {
            if(text.includes((el.title).toLocaleLowerCase()) && text.includes((el.description).toLocaleLowerCase())){
                return el
            }
         })

    }
    
}
