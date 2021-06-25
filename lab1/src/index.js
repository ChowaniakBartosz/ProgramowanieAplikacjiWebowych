window.addEventListener('load', () => {
    const createButton = document.querySelector('button');
    const inputsDiv = document.getElementById('inputs');
    createButton.addEventListener('click', function () {
        const input = document.getElementById('inputCounter');
        for (let i = 0; i < Number(input.value); i++) {
            const el = document.createElement('input');
            el.type = 'number';
            el.value = '0';
            inputsDiv.append(el);
        }
        const inputs = inputsDiv.querySelectorAll('input');
        inputs.forEach(el => {
            el.addEventListener('change', function () {
                let tab = [];
                let sumValue = 0;
                inputs.forEach(el => {
                    tab.push(Number(el.value));
                    sumValue += Number(el.value);
                });
                const sum = document.querySelector('p[data-type="sum"]');
                const avg = document.querySelector('p[data-type="avg"]');
                const min = document.querySelector('p[data-type="min"]');
                const max = document.querySelector('p[data-type="max"]');
                sum.innerHTML = `SUMA: ${sumValue}`;
                avg.innerHTML = `ŚREDNIA: ${sumValue / inputs.length}`;
                max.innerHTML = `MAX: ${findMax(tab)}`;
                min.innerHTML = `MIN: ${findMin(tab)}`;
            });
        });
    });
});
const findMax = (tab) => {
    let current = tab[0];
    tab.forEach(el => {
        if (el > current)
            current = el;
    });
    return current;
};
const findMin = (tab) => {
    let current = tab[0];
    tab.forEach(el => {
        if (el < current)
            current = el;
    });
    return current;
};
//# sourceMappingURL=index.js.map