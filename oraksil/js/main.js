function getLocation(successCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback);
  }
}

function onButtonClick() {
  getLocation(function(position) {
    document.write(
      'Latitude: ' +
        position.coords.latitude +
        '<br>Longitude: ' +
        position.coords.longitude
    );
  });
}

for (let i = 0; i < arcades.length; i++) {
  let div = document.createElement('div');
  let name = document.createElement('h2');
  let location = document.createElement('p');
  let businessHours = document.createElement('p');

  name.textContent = arcades[i].name;

  location.textContent = arcades[i].location;
  location.classList.add('location');

  businessHours.textContent = arcades[i].businessHours;
  businessHours.classList.add('businessHours');

  div.appendChild(name);
  div.appendChild(location);
  div.appendChild(businessHours);
  div.classList.add('arcade');

  document.querySelector('.arcade-list').appendChild(div);
}
