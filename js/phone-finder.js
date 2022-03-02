const main = document.getElementById('main')
const phoneDetails = document.getElementById('phone-details');

searchButton = () => {
    const searchField = document.getElementById('search-field');
    const error = document.getElementById("error");
    const searchText = searchField.value;
    searchField.value = '';
    phoneDetails.innerHTML = '';
    // console.log(searchText);
    if (searchText == '') {
        error.innerText = 'Enter a mobile name';
        main.innerHTML="";
    }
    else{
        main.innerHTML="";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))

        error.innerHTML=""
    }

    
}

const displayPhone = (phones) =>{
    const first20Data = phones.slice(0,20);
    for(const phone of first20Data){
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="Phone-Name">${phone.phone_name}</h5>
                        <p class="Brand-Name">Brand: ${phone.brand}</p>
                        <button onclick="PhoneDetails('${phone.slug}')" class="btn btn-primary">see details</button>
                    </div>
                </div>
        `;
        main.appendChild(div);
    }
}

const PhoneDetails = (IdSlug) => {
    // console.log(IdSlug);
    fetch(`https://openapi.programming-hero.com/api/phone/${IdSlug}`)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = (details) => {
    console.log(details);
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('col-lg-4');
    div.classList.add('mb-5');
    div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${details.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="ID-Name">${details.slug}</h5>
                        <p><b>Release Date:</b> ${details.releaseDate}</p>
                        <p><b>Mainfeatures:</b><br>
                            <b>Chipset:</b> ${details.mainFeatures.chipSet}<br>
                            <b>Memory:</b> ${details.mainFeatures.storage}<br>
                            <b>Display:</b> ${details.mainFeatures.displaySize}
                        </p>
                        <p>Others-<br> <b>Blutooth:</b> ${details.others ? details.others.Bluetooth:''}<p/>
                        <p><b>Sensor:</b> ${details.mainFeatures.sensors ? details.mainFeatures.sensors[0]:''}<p/>
                    </div>
                </div>
        `;
    phoneDetails.appendChild(div);
    
}