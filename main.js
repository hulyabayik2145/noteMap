//! farklı dosyalardan gelen veriler

import { setStorage, getStorage, icons, userIcon, } from "./helpers.js";


//* html den form alanı çağırma
const form = document.querySelector('form');
const noteList = document.querySelector('ul');


//! global değişkenler (sayfanın heryerinden ulaşılabilen değişkenler)
var map;
var coords; // koordinatlar için değişkene atama
var notes = getStorage() || [];
var markerLayer = [];

//console.log(notes);

//* L leafleden referans gelen fonsiyon demek, setView içindeki sayılar is
//*sayfa ilk açıldığında gösterilen konumu ifade eder 1. enlem 2. boylamdır en sondaki sayı ise zoom oranı
//* var map = L.map('map').setView([51.505, -0.09], 13);


//! tileLayer hazır fonk. haritanın katmanını oluşturur. link ile harita gelir addTo(mapp) ile de harita görüntü katmanına eklenir
/*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 19,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);
*/



//* haritayı ekrana basan fonk.

function loadMap(coords) {

    map = L.map('map').setView(coords, 13);


    //* tileLayer hazır fonk. haritanın katmanını oluşturur. link ile harita gelir addTo(mapp) ile de harita görüntü katmanına eklenir
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //* imleçleri tutacağımız ayrı bir katman oluşturma

    markerLayer = L.layerGroup().addTo(map);

    //* kullanıcının konumuna imleç bas
    L.marker(coords, { icon: userIcon }).addTo(map);



    //* lokalden gelen verileri ekrana bas

    renderNoteList(notes);

    //* haritadaki tıklanma olayları izle

    map.on('click', onMapClick);



}

//loadMap();



//* iptal butonuna basınca formu temizle ve kapat
form[3].addEventListener("click", () => {

    //formu temizle

    form.reset();
    //formu kapat
    form.style.display = "none";
});



//* form gonderilirse yeni bir not oluştur ve storage kaydet

form.addEventListener('submit', (e) => {
    //sayfanın yenilenmesini engeller

    e.preventDefault();

    //inputlardaki not objesi oluşturuluyor
    console.log('not objesi oluşturuluyor')

    //inputlardaki verilerden bir note objesi oluştur
    const newNote = {
        id: new Date().getTime(),
        title: form[0].value,
        date: form[1].value,
        status: form[2].value,
        coords: coords,
    };

    //* 3dizinin başına yeni notu ekle
    notes.unshift(newNote);

    //* 4 notları ekrana bas
    renderNoteList(notes);

    //* 5 local storage guncelle
    setStorage(notes);

    //* 6 formu kapat
    form.style.display = "none";
    form.reset();


});

//* not için imleç katmanına yeni bir imleç ekler

function renderMarker(note) {

    //console.log(renderMarker);
    //imleç ıoluştur

    L.marker(note.coords, { icon: icons[note.status] })
        //imleci katmana ekle
        .addTo(markerLayer).bindPopup(note.title)


}




//* ekrana notları bas

function renderNoteList(items) {


    //önceden eklenen elemanları temizle
    noteList.innerHTML = '';
    markerLayer.clearLayers();


    //dizideki her bir obje için not kartı bas
    items.forEach((note) => {
        //li elemanı oluştur
        const listEle = document.createElement('li');

        //data-id ekle

        listEle.dataset.id = note.id;



        // içeriğini belirle

        listEle.innerHTML = `

              
           <div class="info">
               <p>${note.title}</p>
               <p>
                   <span>Tarih</span>
                   <span>${note.date}</span>
               </p>
               <p>
                   <span>DURUM:</span>
                   <span>${note.status}</span>
               </p>
           </div>
           <div class="icons">
               <i id= "fly" class="bi bi-airplane-engines-fill"></i>
               <i id= "delete" class="bi bi-trash-fill"></i>
           </div>
    
        `;

        //elemanı listeye ekle

        noteList.appendChild(listEle);

        //elemanı haritaya ekle
        renderMarker(note);

    });

}


//!kullanıcının konumunu alma
navigator.geolocation.getCurrentPosition(
    //konumu alırsa haritayı kullanıcının konumuna göre yükler

    (e) => {

        loadMap([e.coords.latitude, e.coords.longitude])
        console.log("konum alındı", e)
    },

    //konumu alamaz ise varsayılan olarak ankaradan başlar
    () => {

        loadMap([39.953925, 32.858552]);
        console.log("konum alınamadı")
    }
);

//!haritadaki tıklanma olaylarında çalışır

function onMapClick(event) {
    //tıklanan yerin konuma eriş. tıklanan yerin konumuna eriş global değişken aktarıldı
    coords = [event.latlng.lat, event.latlng.lng];
    //gizli formu göstermek için
    form.style.display = 'flex';
    //console.dir(form);//console.dir yapınca obje halinde geldi
    form[0].focus();//haritaya tıklandığında imleci focuslayacağımız yeri işaretledik
}
//iptal butonuna tıklanırsa formu temizle ve kapat
//console.dir(form);




// silme uçuş

noteList.addEventListener("click", (e) => {

    const found_id = e.target.closest("li").dataset.id;
    if (e.target.id === "delete" && confirm("Silme işlemini onaylıyor musunuz?")) {
        //* console.log(found_id);
        //**id sini bildiğimiz elemanı listeden çıkarmak */
        notes = notes.filter((note) => note.id != found_id);

        //locali güncelle

        setStorage(notes);

        //ekranı guncelle

        renderNoteList(notes);

    }

    if (e.target.id === "fly") {

        //id sini bildiğimiz elemanın dizideki haline erişme

        const note = notes.find((note) => note.id == found_id);

        //notun koordinatlarına git

        map.flyTo(note.coords);

    }
})

