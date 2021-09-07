const apikey = "at_s2fvwibjxs1xaRXLAxIScXfe19dRd"
const form = document.querySelector('form');
const sec = document.querySelector('section');
let ipa = document.querySelector('.ipa');
let country = document.querySelector('.locate');
let time = document.querySelector('.utc');
let isp = document.querySelector('.is');
let error = document.querySelector('.error');
const load = document.querySelector('#loading');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
        const ip = document.querySelector('input[type="text"]').value;
        load.classList.remove('d-none');
if(ip == ''){
    error.classList.remove('d-none')
    load.classList.add('d-none');
}
else{
    error.classList.add('d-none')
         ipTracker(ip).then((res)=>{
            ipa.innerText = res.ip;
            country.innerText = res.location.country;
            time.innerText = "UTC" + res.location.timezone;
            isp.innerText = res.isp
            sec.classList.remove('d-none')
            viewMap(res.location.lat, res.location.lng);
        }).catch((err)=>{
            error.classList.remove('d-none')
            error.innerText= `${err.message}`
            load.classList.add('d-none');
        })
}
})


async function ipTracker(address){

        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_s2fvwibjxs1xaRXLAxIScXfe19dRd&ipAddress= ${ address }`);
        const data = await response.json();
if(response.status !==200){
    throw new Error("Enter valid IP address")
}
        return data;
}

function viewMap(lat, lng){
        var map = L.map('map').setView([lat, lng], 13);    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

        L.marker([lat, lng]).addTo(map)
        .bindPopup('Someone is there!!')
        .openPopup();
}
