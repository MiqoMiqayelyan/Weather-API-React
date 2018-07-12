import React from 'react';
import Titels from './components/title';
import Form from './components/form';
import Weather from './components/weather';
import './App.css';

const API_KEY = '92bcd7ebb58134effd2a0e821ba52245';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            description: undefined
        }
    }
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
        const data = await api_call.json();
        
        if(city && country){this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            error: ""

        });}else {
            this.setState ({
                temperature: undefined,
                city: undefined,
                country: undefined,
                description: undefined,
                error: "Please enter the value..."
            });
        }
    }

    render() {
        return(
            <div className="wrapper">
            <div className="title"><Titels /></div>
             <div className="form-component">
                <div className="inputs">
                        <Form getWeather={this.getWeather} />
                    <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    />
                </div>
                 
             </div>  
               
            </div>
        );
    }
}

export default App;