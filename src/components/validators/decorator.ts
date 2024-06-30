export function saveError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const returnedMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const [textField, message] = args;

        console.log(`Error created: ${textField} - ${message}`);

        localStorage.setItem(textField, message);

        const fetchData = () => {
            console.log(`Data sent to the server: ${textField} - ${message}`);
        };
        fetchData();

        return returnedMethod.apply(this, args);
    };

    return descriptor;
}

export function changeErrorMessage(message: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function (...args: any[]) {
            const errorElementId = `${args[0].id}-error`;
            let errorElement = document.getElementById(errorElementId);
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.id = errorElementId;
                errorElement.className = 'error';
                args[0].className = 'invalid';
                args[0].parentNode?.appendChild(errorElement);
            }
            errorElement.innerHTML = message;
        };

        return descriptor;
    };
}
