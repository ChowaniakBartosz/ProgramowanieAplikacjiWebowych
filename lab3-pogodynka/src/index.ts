import Application from './App'

// On windows load
window.addEventListener('load', () => {
    const app: Application = new Application();

    // Get submit button
    const submitButton = document.getElementById('addCityButton') as HTMLButtonElement;

    // If there's any and is clicked then app.buttonHandle()
    submitButton.addEventListener('click', (event: Event) => {
        event.preventDefault(); // Disables refreshing of the website

        app.buttonHandle();
    })
})