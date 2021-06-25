// When window loads
window.addEventListener('load', () => {
    const createButton: HTMLButtonElement = document.querySelector('button') as HTMLButtonElement;

    createButton.addEventListener('click', function () {
        // Gets number of inputs to create
        const inputsQuantity: HTMLInputElement = document.getElementById('inputsQuantity') as HTMLInputElement;
        const inputsSection: HTMLDivElement = document.getElementById('inputsSection') as HTMLDivElement;

        // resets rendered inputs
        inputsSection.innerHTML = null;

        for (let i: number = 0; i < Number(inputsQuantity.value); i++) {
            const newInput: HTMLInputElement = document.createElement('input');
            newInput.type = 'number';
            newInput.value = '0';

            // Appends new input at the end
            inputsSection.append(newInput);
        }

        // Gets all rendered inputs
        const inputs: NodeListOf<HTMLInputElement> = inputsSection.querySelectorAll('input');

        // Each input has onChange eventListener that recalculates sum, avg, min and max
        inputs.forEach(inputItem => {
            inputItem.addEventListener('change', function() {
                let tab: Array<number> = [];
                let sumValue: number | null = null;

                // Sums all of the values
                inputs.forEach(inputItem => {
                    tab.push(Number(inputItem.value));
                    sumValue += Number(inputItem.value);
                })

                const sum: HTMLParagraphElement = document.getElementById('sum') as HTMLParagraphElement;
                const avg: HTMLParagraphElement = document.getElementById('avg') as HTMLParagraphElement;
                const min: HTMLParagraphElement = document.getElementById('min') as HTMLParagraphElement;
                const max: HTMLParagraphElement = document.getElementById('max') as HTMLParagraphElement;

                sum.innerHTML = `Sum = ${sumValue}`;
                avg.innerHTML = `Average = ${sumValue/inputs.length}`;
                max.innerHTML = `Maximum = ${findMax(tab)}`;
                min.innerHTML = `Minimum = ${findMin(tab)}`;
            })
        })
    });
});

const findMax = (tab : Array<number>) : number => {
    let current = tab[0];
    tab.forEach(el => {
        if (el > current)
            current = el;
    })
    return current;
}

const findMin = (tab : Array<number>) : number => {
    let current = tab[0];
    tab.forEach(el => {
        if (el < current)
            current = el;
    })
    return current;
}