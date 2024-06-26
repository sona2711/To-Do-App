export class Validator {
    element:any
    constructor(element:any){
        this.element
        this.createError(this.element)

    }

    createError(el:any){
        const errorMessage = document.createElement('div')
        errorMessage.className = "error"
        errorMessage.innerHTML = "This field is required"

        
        if(!el.value || el.value.trim() === "") {
            el.className = "invalid";
            el.parentNode?.appendChild(errorMessage)
       
        }    
    }

}