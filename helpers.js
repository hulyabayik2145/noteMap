//* lokalden parameter olarak gelen elemanı alır
export const getStorage = () => {
    const strData = localStorage.getItem('notes');//string şeklinde alır

    //* gelen string veriyi js verisine çevir ve döndür

    return JSON.parse(strData);

};


//*  lokale parametre olarak gelen elemanı kaydeder

export const setStorage = (data) => {

    //*stringe çevir
    const strData = JSON.stringify(data);

    //* Lokale kaydet
    localStorage.setItem("notes", strData);

}

//İkonlar

export var userIcon = L.icon({
    iconUrl: '/images/Person.png',
    iconSize: [50, 50],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var homeIcon = L.icon({
    iconUrl: '/images/Home_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var jobIcon = L.icon({
    iconUrl: '/images/Briefcase_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var gotoIcon = L.icon({
    iconUrl: '/images/Aeroplane_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var parkIcon = L.icon({
    iconUrl: '/images/Parking_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});


export const icons = {
    goto: gotoIcon,
    home: homeIcon,
    job: jobIcon,
    park: parkIcon,
};

