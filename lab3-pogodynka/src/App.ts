import axios from 'axios'

class Application {
    constructor() {
        this.render();
    }

    public buttonHandle = () : void => {
        const input: HTMLInputElement = document.querySelector('input[id="location"]') as HTMLInputElement;
        if (input != null) {
            const city = input.value;
            
            this.getWeather(city);
            this.render();
        }
    }

    // Gets weather forecast for provided city
    private getWeather = (city: string): any => {
        console.log('pobieram pogode');
        const appid = 'aa8b6dc42b70fe9332a39e81c4b28230';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric&lang=PL`;

        axios.get(url)
        .then((response) => {
            const data = response.data;
            this.addToLocalStorage(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        })
        return;
    }

    // Saves data to localstorage
    private setData(data : any) : void {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }

    // Gets saved data from localstorage
    private getData() : Array<any> {
        const data : string | null = localStorage.getItem('weatherData');
        return data ? JSON.parse(data) : []
    }

    // Adds new data to current saved data in localstorage
    private addToLocalStorage(data : any) : void {
        let tab : Array<any> = [];
        tab = this.getData();
        tab.push(data);

        this.setData(tab);
    }

    // Renders weather info
    private render(): void {
        // gets section with weather items
        const cities: HTMLElement | null = document.getElementById('widgets');

        if (cities !== null) {
            let elements = this.getData();
            elements.forEach(item => {
                const cityItem: HTMLElement = document.createElement('div');
                cityItem.classList.add('card');

                const cityName: HTMLElement = document.createElement('h2.cityName');
                cityName.classList.add('cityName');
                cityName.innerHTML = item.name;

                const description: HTMLElement = document.createElement('p');
                description.classList.add('description');
                description.innerHTML = item.weather[0].description;

                const temperature: HTMLElement = document.createElement('p');
                temperature.classList.add('temperature');
                temperature.innerHTML = `${item.main.temp} <sup>o</sup>C`;

                const image = document.createElement('img');
                image.classList.add('weatherIcon');
                const imgSource: string = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                image.src = imgSource;

                cityItem.append(cityName);
                cityItem.append(image);
                cityItem.append(temperature);
                cityItem.append(description);

                cities.append(cityItem);
            })
        }
    }
};

export default Application;