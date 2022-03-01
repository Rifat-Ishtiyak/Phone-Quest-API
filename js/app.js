//!-------------- load all phone from API --------------
const loadPhone = () =>{
    const searchField = document.getElementById('search-input');
    const mobileName = (searchField.value).toLowerCase();

    if (mobileName == "") {
        document.getElementById('search-error').innerText = 'input box is empty';
    }
    else if(isNaN(mobileName)==false){
        document.getElementById('search-error').innerText = 'type only string';
    }
    else {
        document.getElementById('search-error').innerText = '';
        document.getElementById('spinner').style.display = 'block';

        fetch(`https://openapi.programming-hero.com/api/phones?search=${mobileName}`)
        .then(resonse => resonse.json())
        .then(mobile => showMobile(mobile.data))

        document.getElementById('search-input').value = '';
    }
}

//!-------------- Show all phone from API --------------
const showMobile = (mobileData) =>{
    const phoneField = document.getElementById('all-phone');

    phoneField.innerText = '';
    detailsRemove();
    
    if(mobileData.length === 0){
        const div =  document.createElement('div');
        div.classList.add('col-12');
        div.innerHTML = `<div class="phone-card">
                            <div class="text-center">
                                <h1 class="text-danger">No phone found on that name</h1>
                            </div>
                        </div>`;
        phoneField.appendChild(div);
        document.getElementById('spinner').style.display = 'none';
    }
    else{
        mobileData.slice(0,20).forEach(element => {
            const div =  document.createElement('div')
            div.classList.add('col-lg-4', 'col-md-6');
            div.innerHTML = `<div class="phone-card">
                                <div class="text-center">
                                    <img src="${element.image}" width="120" alt="">
                                    <h6 class="mt-4">Phone Name : ${element.phone_name}</h6>
                                    <h6 class="">Brand : ${element.brand}</h6>
                                    <button class="btn btn-success mt-3 w-50" onclick="phoneDetails('${element.slug}')">Details</button>
                                </div>
                            </div>`;
            phoneField.appendChild(div);
        });
        document.getElementById('spinner').style.display = 'none';
    }  
}


//!-------------- search in API --------------
const phoneDetails = (searchID) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${searchID}`;
    
    fetch(url)
        .then(resonse => resonse.json())
        .then(mobileDetails => showMobileDetails(mobileDetails.data))

}


//!-------------- show phone details from API --------------
const showMobileDetails =(mobileDetails)=>{
    document.documentElement.scrollTop = 150;

    document.getElementById('mobile-details').style.display = 'block';
    const detailsField = document.getElementById('mobile-details');
    detailsField.innerText = '';

    const div = document.createElement('div');
    div.classList.add('row', 'gy-4', 'gx-0', 'd-flex', 'align-items-center');
    div.innerHTML= `<div class="col-lg-6 d-flex justify-content-center">
                        <img src="${mobileDetails.image}" class="w-50 img-fluid" alt="">
                    </div>
                    <div class="col-lg-6 d-flex justify-content-center">
                        <div>
                            <h5 class=""><span class="fw-bold">Name :</span> ${mobileDetails.name}</h5>
                            <h6 class=""><span class="fw-bold">Release Date :</span> <span class="text-secondary">${mobileDetails.releaseDate==="" ? "Release date is not available" : mobileDetails.releaseDate}</span></h6>
                            <h6>
                                <span class="fw-bold">Main Features : </span>
                                <ul class="mt-1">
                                    <li>storage : ${mobileDetails.mainFeatures.storage}</li>
                                    <li>displaySize: ${mobileDetails.mainFeatures.displaySize}</li>
                                    <li>chipSet :  ${mobileDetails.mainFeatures.chipSet}</li>
                                    <li>memory : ${mobileDetails.mainFeatures.memory}</li>
                                    <li>sensors : ${mobileDetails.mainFeatures.sensors.map( sensor => ' '+sensor)}</li>
                                </ul>
                            </h6>
                            <h6>
                                <span class="fw-bold">Others : </span>
                                <ul class="mt-1">
                                    <li>WLAN : ${mobileDetails.others?.WLAN ?? " "}</li>
                                    <li>Bluetooth:  ${mobileDetails.others?.Bluetooth ?? " "}</li>
                                    <li>GPS : ${mobileDetails.others?.GPS ?? " "}</li>
                                    <li>NFC : ${mobileDetails.others?.NFC ?? " "}</li>
                                    <li>Radio : ${mobileDetails.others?.Radio ?? " "}</li>
                                    <li>USB : ${mobileDetails.others?.USB ?? " "}</li>
                                </ul>
                            </h6>
                        </div>
                    </div>`;
    detailsField.innerHTML = `<button class="btn position-absolute top-0 end-0" onclick="detailsRemove()"><img src="./img/remove.png" width="20" alt=""></button>`
    detailsField.appendChild(div);          
}


//!-------------- phone details remove button --------------
const detailsRemove = () =>{
    document.getElementById('mobile-details').style.display = 'none';
}