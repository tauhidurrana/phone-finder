const main = document.getElementById('main')

searchButton = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}

const displayPhone = (phones) =>{
    for(const phone of phones){
        console.log(phone.brand);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="Phone-Name">${phone.phone_name}</h5>
                        <p class="Brand-Name">Brand: ${phone.brand}</p>
                        <button onclick="cardDetails('')" class="btn btn-primary">see details</button>
                    </div>
                </div>
        `;
        main.appendChild(div);
    }
}