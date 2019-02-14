var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247';
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        renderHtml(data);
    });

function renderHtml(data) {
    var location = document.createElement('div');
    location.className = 'location';

    var name = document.createElement('p');
    name.textContent = data.name + ', ' + data.sys.country;

    var time = document.createElement('p');
    time.textContent = moment().format('DD.MM.YYYY HH:mm');
    
    var wind = document.createElement('p');
    wind.className = 'wind';
    wind.textContent = data.wind.speed + ' m/s';
    
    var direction = document.createElement('p');
    direction.className = 'direction';
    direction.textContent = getWindDirection(data.wind.deg);
    
    var weather = document.createElement('div');
    weather.className = 'weather';

    var img = document.createElement('img');
    img.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + ".png";
    
    var p = document.createElement('p');
    p.className = 'temp';
    p.textContent = Math.round(data.main.temp - 273) + ' ' + '°C';

    var widget = document.querySelector('.widget');

    location.appendChild(name);
    location.appendChild(time);
    weather.appendChild(img);
    weather.appendChild(p);

    widget.appendChild(location);
    widget.appendChild(wind);
    widget.appendChild(direction);
    widget.appendChild(weather);
}

function getWindDirection(deg) {
    switch (true) {
        case (deg>45 && deg<135):
            return 'East';
            
        case (deg>135 && deg<225):
            return 'South';
            
        case (deg>225 && deg<315):
            return 'West';
            
        case (deg>315 && deg<360 && deg>0 && deg<45):
            return 'North';
        
        default:
            return 'Error';
    }
}