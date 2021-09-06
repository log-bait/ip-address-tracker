const apikey = "at_s2fvwibjxs1xaRXLAxIScXfe19dRd"
const form = document.querySelector('form');
const regx = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g;
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
        const result = regx.test(ip);
        load.classList.remove('d-none');
if(result){
    ipTracker(ip).then((res)=>{
        viewMap(res.location.lat, res.location.lng);
        ipa.innerText = res.ip;
        country.innerText = res.location.country;
        time.innerText = "UTC" + res.location.timezone;
        isp.innerText = res.isp
        error.classList.add('d-none')
        load.classList.add('d-none');
        sec.classList.remove('d-none')
        console.log(res.location.lat, res.location.lng)
    }).catch((err)=>{
        error.classList.remove('d-none')
        console.log(err)
    })
         error.classList.add('d-none')
}
else{
         error.classList.remove('d-none')
         load.classList.add('d-none');

}
})


async function ipTracker(address){

        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_s2fvwibjxs1xaRXLAxIScXfe19dRd&ipAddress= ${ address }`);
        const data = await response.json();

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