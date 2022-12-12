let user = document.querySelector('.user')
let chercher = document.querySelector('.chercher')
let body= document.querySelector('.body')
let affiche= document.querySelector('.affiche')
let cityName = document.querySelector('.donnee')

user.addEventListener('click',()=>{
    recupererIp()
})
chercher.addEventListener('click',()=>{
    meteo2()
})
        function recupererIp(){
            let url =`http://api.ipstack.com/check?access_key=35797d1c11bb363070d386bb1a1745d2 `
            fetch(url)
                .then((donnees)=>(donnees.json()))
                .then(donne=>{
                    let coordonnee={
                         longitude  : donne.longitude,
                        latitude: donne.latitude
                    }
                    meteo(coordonnee)
                })
        }
function meteo2(coordonnee){
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=35797d1c11bb363070d386bb1a1745d2 `
    fetch(url)
        .then((donnees)=>(donnees.json()))
        .then(donne=>{
            afficherMeteo(donne)
        })
}

function meteo(coordonnee){
    let url =`
    https://api.openweathermap.org/data/3.0/onecall?lat=${coordonnee.latitude}&lon=${coordonnee.longitude}&units=metric&lang=fr,daily&appid=444f78f7fc53ef28b004df9ce6f27b73`

    fetch(url)
        .then((donnees)=>(donnees.json()))
        .then(donne=>{
            afficherMeteo(donne)
        })
}
function afficherMeteo(donnes) {
    let temperature = donnes.current.temp
    let humidite = donnes.current.humidity
    let vitesseVEnt = donnes.current.wind_speed
    let visiblilite = donnes.current.visibility
    let meteo = donnes.current.weather[0].description
    let icon = donnes.current.weather[0].icon
    let id = donnes.current.weather[0].id
    let     template=`  <p>temps :${meteo}</p> 
                <p> temperature :${temperature} c°</p>
                <p> himidite : ${humidite} %</p>
                <p> vitesse du vent :${vitesseVEnt} km/h</p>
                <p> visibilite : ${ visiblilite} metre</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" height="100px" width="100px">
`
    //_____________________________________________________________________________________________

    function image(){
        if(id>=200&&id<=299){
            body.setAttribute("style", "background-image: url('image/orage.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else if(id>=300&&id<=399){
            body.setAttribute("style","background-image: url('image/nuageux.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else if(id>=500&&id<=599){
            body.setAttribute("style","background-image: url('image/pluie.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else if(id>=600&&id<=699){
            body.setAttribute("style","background-image: url('image/neige.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else if(id>=700&&id<=799){
            body.setAttribute("style","background-image: url('image/brume.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else if(id==800){
            body.setAttribute("style","background-image: url('image/ensoleille.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }
        else{
            body.setAttribute("style","background-image: url('image/quelque_nuage.jpg'); background-size: contain ; background-repeat: no-repeat; background-position: center")
        }

    }
    affiche.innerHTML=template
    image()
}
