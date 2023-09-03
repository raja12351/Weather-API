    const apiKey = "48dff6e4d6cb13b4a30482b24d45c365";
    const baseUrl = "https://api.openweathermap.org/data/2.5";
    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

    const country = document.getElementById("top1");
    const detailContainer = document.getElementById("bottom");
    const map = document.getElementById("map");

    function getLocation(){
        navigator.geolocation.getCurrentPosition((success) => {
            let {latitude, longitude} = success.coords;

            fetchLocation(latitude,longitude);
        });
    }

    async function fetchUVIndex(latitude,longitude){
        const endPoint = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`;

        try{
            const response = await fetch(endPoint, { mode: 'no-cors'});
            const result = await response.json();

            console.log(result);
        }catch(error){
            console.log("error occured");
        }
    }

    function windDirection(degree){
        if(degree == 0){
            return "North";
        }
        if(degree == 90){
            return "East";
        }
        if(degree == 180){
            return "South";
        }
        if(degree == 270){
            return "West";
        }
        if(degree > 0 && degree < 90){
            return "North-East";
        }
        if(degree > 90 && degree < 180){
            return "South-East";
        }
        if(degree > 180 && degree < 270){
            return "South-West";
        }
        if(degree > 180 && degree < 360){
            return "North-West";
        }
    }

    function toCelcius(temp){
        // console.log(temp-273.15);
        return temp - 273.15;
    }

    function renderIntopUI(data){
        const ele1 = document.createElement("div");
        ele1.className = "lon-lat";

        ele1.innerHTML = `
        <h4>Lat : ${data.coord.lat}</h4>
        <h4>Long : ${data.coord.lon}</h4>`;

        country.appendChild(ele1);
    }
    function renderInBottomUI(data){
        const ele2 = document.createElement("div");
        ele2.className = "details";

        ele2.innerHTML = `
        <h5>Location: ${data.name}</h5>
        <h5>Wind Speed: ${data.wind.speed} kmph</h5>
        <h5>Humidity : ${data.main.humidity} %</h5>
        <h5>Time Zone : GMT + 5 : 30</h5>
        <h5>Pressure: ${data.main.pressure} mbar</h5>
        <h5>Wind Direction : ${windDirection(data.wind.deg)}</h5>
        <h5>UV Index : 1</h5>
        <h5>Feels like: ${Math.floor(toCelcius(data.main.feels_like))}°</h5>`;

        detailContainer.appendChild(ele2);
    }

    async function fetchLocation(latitude,longitude){
        const endPoint = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try{
            const response = await fetch(endPoint);
            const result = await response.json();

            console.log(result);
            renderIntopUI(result);
            renderInBottomUI(result);
        }
        catch(error){
            console.log("Something went wrong");
        }
    }
    getLocation();
    // toCelcius(309.16);
    // fetchUVIndex(28.5263,77.1915);
