import {changeErrorMessage, saveError} from "./decorator";



export class Validator {
    private errors: { [key: string]: string } = {};
    
    constructor() {
        this.errors = {};
    }
    

    @saveError
    createError(textField: string, message: string): void {
        this.errors[textField] = message;
    }


    @changeErrorMessage("The entry is empty. Unexpected value!!!")
    showError(el: HTMLElement): void {
        el.className = 'invalid';
           
        const errorElementId = `${el.id}-error`;
            let errorElement = document.getElementById(errorElementId);
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.id = errorElementId;
                errorElement.className= 'error';
                el.parentNode?.appendChild(errorElement);
            }
            errorElement.innerHTML = this.errors[el.id];
        }

        getErrors(): { [key: string]: string } {
            return this.errors;
        }
    
        clearError(el: HTMLElement): void {
            el.className = 'valid' ;
    
            const errorElementId = `${el.id}-error`;
            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.innerHTML = '';
            }
        }
    
        clearAllErrors(): void {
            for (const textField in this.errors) {
                const el = document.getElementById(textField);
                if (el) {
                    this.clearError(el);
                }
            }
            this.errors = {};
        }


        private loadErrorsFromLocalStorage(): void {
            for (const key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    this.errors[key] = localStorage.getItem(key) || '';
                }
    }
    
    
    }
}