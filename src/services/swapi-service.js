class SwapiService{
    //повтораящаяся часть url
    _apiBase = 'https://swapi.co/api';


    getResources = async (url) => {
        let res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error (`error with ${url}` +
            ` and receive ${res.status}`);
        }
        let body = await res.json();
        return body;
    }

    //создаем функции обертки, которые возвращают getResources 
    //с уникальным url - все люди, корабли ...
    getPeople = async () => {
        //хотим только получить массив данных людей
        const result = await this.getResources(`/people/`);
        return result.results.map(this._transformPerson);
    }

    _transformPerson = (person) =>{      

        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color

        };
    }

    getPerson = async (id) => {        
         let person = await this.getResources(`/people/${id}`);
        //  console.log(person);
         return this._transformPerson(person);
    }

    getAllStarships = async () => {
        //хотим только получить массив данных людей
        const result = await this.getResources(`/starships/`);
        return result.results.map(this._transformStarship);
    }

    getStarship = async (id) => {
        const starship = await this.getResources(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _transformStarship = (starship) =>{      

        return{
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
          }
    }

    getAllPlanets = async () => {
        //хотим только получить массив данных людей
        const result = await this.getResources(`/planets/`);
        return result.results.map(this._transformPlanet);
    }

    getPlanet = async (id) => {
        let planet = await this.getResources(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    //приводим трансформацию получаемых данныех через API
    //т.е. выделяем только нужные данные, приводим в нужный формат
    _transformPlanet = (planet) =>{      

        return{
            id: this._extractId(planet),
            name: planet.name,
            rotationPeriod: planet.rotation_period,
            population:planet.population,
            diameter: planet.diameter
          }
    }

    _extractId(item){
         //id в конце url, между двумя слешами
         const idRegExp = /\/(\d*)\/$/;
         //обращаемся к url объекта и извлекаем ID
         return item.url.match(idRegExp)[1];
    }

    getPersonImgUrl = (item) => {
        return `https://starwars-visualguide.com/assets/img/characters/${item.id}.jpg`
    }

    getStarshipImgUrl = (item) => {
        return `https://starwars-visualguide.com/assets/img/starship/${item.id}.jpg`
    }

    getPlanetImgUrl = (item) => {
        return `https://starwars-visualguide.com/assets/img/starship/${item.id}.jpg`
    }


};

export default SwapiService;