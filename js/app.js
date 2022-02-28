const loadPhone = () =>{
    document.getElementById('spinner').style.display = 'block';
    const searchField = document.getElementById('search-input');
    const mobileName = (searchField.value).toLowerCase();

    fetch(`https://openapi.programming-hero.com/api/phones?search=${mobileName}`)
        .then(resonse => resonse.json())
        .then(mobile => showMobile(mobile.data))

        document.getElementById('search-input').value = '';
}

const showMobile = (mobileData) =>{
    const phoneField = document.getElementById('all-phone');
    phoneField.innerText = '';
    console.log(mobileData);
    mobileData.forEach(element => {
        const div =  document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6');
        div.innerHTML = `<div class="phone-card">
                            <div class="text-center">
                                <img src="${element.image}" width="120" alt="">
                                <h6 class="mt-4">Phone Name : ${element.phone_name}</h6>
                                <h6 class="">Brand : ${element.brand}</h6>
                                <button class="btn btn-success mt-3">Details</button>
                            </div>
                        </div>`;
        phoneField.appendChild(div);
    });
    document.getElementById('spinner').style.display = 'none';
}