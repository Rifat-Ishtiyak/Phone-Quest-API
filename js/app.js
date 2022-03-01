const loadPhone = () =>{
    const searchField = document.getElementById('search-input');
    const mobileName = (searchField.value).toLowerCase();

    if (mobileName == "") {
        document.getElementById('search-error').innerText = 'input box is empty';
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

const showMobile = (mobileData) =>{
    const phoneField = document.getElementById('all-phone');
    phoneField.innerText = '';
    console.log(mobileData);
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

const phoneDetails = (searchID) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${searchID}`;
    
    fetch(url)
        .then(resonse => resonse.json())
        .then(mobileDetails => showMobileDetails(mobileDetails.data))

}

const showMobileDetails =(mobileDetails)=>{
    document.getElementById('mobile-details').style.display = 'block';
    console.log(mobileDetails);
    const detailsField = document.getElementById('mobile-details');
    const div = document.createElement('div');
    div.classList.add('row', 'gy-4', 'gx-0', 'd-flex', 'align-items-center');
    div.innerHTML= `<div class="col-lg-6 d-flex justify-content-center">
                        <img src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg" class="w-50 img-fluid" alt="">
                    </div>
                    <div class="col-lg-6 d-flex justify-content-center">
                        <div>
                            <h5 class=""><span class="fw-bold">Name :</span> iPhone 13 Pro Max</h5>
                            <h6 class=""><span class="fw-bold">Realease Date :</span> Released 2021, September 24</h6>
                            <h6>
                                <span class="fw-bold">Main Features : </span>
                                <ul class="mt-1">
                                    <li>storage : 128GB/256GB/1TB storage, no card slot</li>
                                    <li>displaySize: 6.7 inches, 109.8 cm2 (~87.4% screen-to-body ratio)</li>
                                    <li>chipSet : Apple A15 Bionic (5 nm)</li>
                                    <li>memory : 128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM</li>
                                    <li>sensors : Face ID, accelerometer, gyro, proximity, compass, barometer</li>
                                </ul>
                            </h6>
                            <h6>
                                <span class="fw-bold">Others : </span>
                                <ul class="mt-1">
                                    <li>WLAN : Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot</li>
                                    <li>Bluetooth: 5.0, A2DP, LE</li>
                                    <li>GPS : Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS</li>
                                    <li>NFC : Yes</li>
                                    <li>Radio : No</li>
                                    <li>USB : Lightning, USB 2.0</li>
                                </ul>
                            </h6>
                        </div>
                    </div>`;
    detailsField.appendChild(div);          

}