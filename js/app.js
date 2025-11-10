let cars = [
		{
			"id": 1,
			"model": "Voltura ZX 2025",
			"price": "129999",
			"range": "400",
			"drive": "electric",
			"type": "sedan",
			"desc": [
				{
					"acceleration": "5.8s",
					"top_speed": "210&nbsp;km/h",
					"charging": "120 kW DC",
					"boot_capacity": "520&nbsp;L",
					"warranty": "5 lat"
				}
			],
			"images": {
				"main" : "car.png",
				"additional" : [
					"prev1.png",
					"prev2.png",
					"prev3.png"
				]
			},
			"colors": [
				{
					"black": "#1F2937",
					"gray": "#F3F4F6",
					"green": "#28483B"
				}
			],
			"version": [
				"Podstawowy" ,
				"Sport",
				"Performance"
			],
			"accessories_available" : [
				{
					"winter_wheels" : "Koła zimowe",
					"accessories" : "Akcesoria"        
				}
			]
		},  
		{
			"id": 2,
			"model": "Voltura PX 2025",
			"price": "120999",
			"range": "500",
			"drive": "hybrid",
			"type": "suv",
			"desc": [
				{
					"acceleration": "6.8s",
					"top_speed": "210&nbsp;km/h",
					"charging": "100 kW DC",
					"boot_capacity": "520&nbsp;L",
					"warranty": "4 lat"
				}
			],
			"images": {
				"main" : "car.png",
				"additional" : [
					"prev1.png",
					"prev2.png",
					"prev3.png"
				]
			},
			"colors": [
				{
					"black": "#1F2937",
					"gray": "#F3F4F6",
					"green": "#28483B"
				}
			],
			"version": [
				"Podstawowy",
				"Sport",
				"Performance"
			],
			"accessories_available" : [
				{
					"winter_wheels" : "Koła zimowe"      
				}
			]
		},  
		{
			"id": 3,
			"model": "Voltura SX 2025",
			"price": "99999",
			"range": "300",
			"drive": "combustion",
			"type": "kombi",
			"desc": [
				{
					"acceleration": "10.8s",
					"top_speed": "210&nbsp;km/h",
					"charging": "190 kW DC",
					"boot_capacity": "520&nbsp;L",
					"warranty": "15 lat"
				}
			],
			"images": {
				"main" : "car.png",
				"additional" : [
					"prev1.png",
					"prev2.png",
					"prev3.png"
				]
			},
			"colors": [
				{
					"black": "#1F2937",
					"gray": "#F3F4F6",
					"green": "#28483B"
				}
			],
			"version": [
				"Podstawowy",
				"Sport",
				"Performance"
			],
			"accessories_available" : [
				{
					"winter_wheels" : "Koła zimowe",
					"accessories" : "Akcesoria"        
				}
			]
		}
	];

// let cars = null;

// async function loadCars() {
//   try {
//     const response = await fetch('assets/car.json');
//     const data = await response.json();
//     cars = data.cars;
//     renderCars(cars);
//   } catch (error) {
//     console.error('Błąd podczas ładowania JSON:', error);
//   }
// }
// loadCars();

renderCars(cars);


const filterSubmit = document.getElementById('filterSubmit');
const carDetailsModal = document.getElementById('carDetailsModal');
const modalTitle = carDetailsModal.querySelector('.modal-title');
const modalPrice = carDetailsModal.querySelector('#modalPrice');
const modalBody = carDetailsModal.querySelector('.modal-body');
const modalCarVersion = carDetailsModal.querySelector('#version-group');
const modalCarColor = carDetailsModal.querySelector('#color-group');
const modalCarAccessories = carDetailsModal.querySelector('#accessories-group');
const modalCarDesc = carDetailsModal.querySelector('#car-desc');
const modalMainImg = carDetailsModal.querySelector('.modal-main-img');
const modalThumbnailImg = carDetailsModal.querySelectorAll('.modal-thumbnail-img');
const modalGallery = carDetailsModal.querySelector('#modalGallery');
const modalPreviewRow = carDetailsModal.querySelector('.modal-preview-row');
const modalFindDealer = carDetailsModal.querySelectorAll('.modalFindDealer');

carDetailsModal.addEventListener('show.bs.modal', function(event) {

	const button = event.relatedTarget;
	const id = button.getAttribute('data-car-id');
	const entry = cars.find(car => car.id == id);

	modalTitle.textContent = entry.model+' — Szczegóły modelu';

	if(carDetailsModal.querySelector('input[name="car_name"]')){
		carDetailsModal.querySelector('input[name="car_name"]').value = entry.model;
	} else {
		const hiddenInput = document.createElement('input');
		hiddenInput.type = 'hidden';
		hiddenInput.name = 'car_name';
		hiddenInput.value = entry.model;
		modalBody.appendChild(hiddenInput);
	}


	modalGallery.querySelector('#modalMainImg').innerHTML = '';
	modalGallery.querySelector('#modalMainImg').innerHTML += `<img src="assets/img/${entry.images.main}" class="modal-main-img img-fluid rounded-3 mb-3" alt="${entry.model}">`;

	if(entry.images.additional.length){
		modalGallery.querySelector('.modal-preview-row').innerHTML = ``;

		let htmlThumbnail = '';
		entry.images.additional.forEach(function(e){
			htmlThumbnail += `<img src="assets/img/${e}" class="modal-thumbnail-img img-fluid rounded-2" alt="">`;
		});
		modalGallery.querySelector('.modal-preview-row').innerHTML = htmlThumbnail;
	}

	modalPrice.textContent = formatPrice(entry.price);
	modalPrice.setAttribute('data-price', entry.price);

// car version
	if (entry.version.length) {
	  let html = '';
	  entry.version.forEach(name => {
	    html += `<button type="button" data-value="${name}" class="btn btn-transparent me-2 rounded-3">${name}</button>`;
	  });	
	  modalCarVersion.querySelector('.btn-group').innerHTML = html;
	} else {
	  modalCarVersion.style.display = 'none';
	}

// car colors
	const colorsObj = entry.colors[0];

	if(Object.entries(colorsObj).length){
		modalCarColor.querySelector('.btn-group').innerHTML = '';
		Object.entries(colorsObj).forEach(([colorName, colorCode]) => {
			const buttonHtml = `<button type="button" data-color-name="${colorName}" data-color-code="${colorCode}" class="btn btn-transparent modal-btn-color  rounded-3 color-box" style="background-color: ${colorCode}!important;"></button>`;
			modalCarColor.querySelector('.btn-group').innerHTML += buttonHtml;
		});

	} else {
		modalCarColor.style.display = 'none';	
	}


// car accessories

	if (entry.accessories_available && Array.isArray(entry.accessories_available) && entry.accessories_available.length > 0) {
		const accessories = entry.accessories_available[0];
		carDetailsModal.querySelector('#accessories-group-row').innerHTML = '';
		for (const [label,value] of Object.entries(accessories)) {
			if (accessories.hasOwnProperty(label)) {


				const html = `
				<label class="btn btn-transparent w-50" for="${label}">
				<input type="checkbox" class="btn-check hide" id="${label}" autocomplete="off">
				${value}
				</label>`;

				carDetailsModal.querySelector('#accessories-group-row').innerHTML += html;
			}
		}
	} else {
		carDetailsModal.querySelector('#accessories-group').style.display = 'none';
	}



	modalCarAccessories.querySelectorAll('.btn-check').forEach(checkbox => {
		checkbox.checked = false;
	});

// car desc
	const descObj = entry.desc[0];

	if(Object.entries(descObj).length){
		modalCarDesc.innerHTML = '';

		Object.entries(descObj).forEach(([label, value]) => {
			let displayLabel = '';
			if(label == 'acceleration') {
				displayLabel = '0–100 km/h';

			} else if(label == 'top_speed'){
				displayLabel = 'Maksymalna prędkość';

			} else if(label == 'charging'){
				displayLabel = 'Ładowanie';

			} else if(label == 'boot_capacity'){
				displayLabel = 'Pojemność bagażnika';

			} else if(label == 'warranty'){
				displayLabel = 'Gwarancja';

			}

			const html = `<div class="row mb-2">
			<p class="desc-label col-7 text-secondary">${displayLabel}</p>
			<p class="desc-val col-5 text-end">${value}</p>
			</div>`;

			modalCarDesc.innerHTML += html;
		});

	} else {
		modalCarDesc.style.display = 'none';	
	}
});

carDetailsModal.querySelectorAll('.btn-group').forEach(group => {
  group.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});


modalPreviewRow.addEventListener('click', (e) => {
	if (e.target && e.target.classList.contains('modal-thumbnail-img')) {
		const thisElem = e.target;
		const modalMainImgSrc = carDetailsModal.querySelector('.modal-main-img').src;

		carDetailsModal.querySelector('.modal-main-img').src = e.target.src;
		thisElem.src = modalMainImgSrc;
		modalPreviewRow.appendChild(thisElem);

	}
});

function formatPrice(price){

	return  new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price);
}


function renderCars(list) {
	const carList = document.getElementById('carList');
	carList.innerHTML = '';


	if(list.length){
		list.forEach(car => {
			carList.innerHTML += `
			<div class="col-md-4">
			<div class="card">
			<img src="assets/img/zx.png" class="card-img-top rounded-3 img-fluid" alt="Voltura ZX" style="display: block;">
			<div class="card-body p-3 p-md-2 p-lg-3">
			<p class="card__title">${car.model}</p>
			<p class="card__price mb-2 lh-1">od ${formatPrice(car.price)}</p>
			<div class="d-flex align-items-center justify-content-between">
			<p class="card__desc lh-1">AWD &bullet; ${car.range} km range</p>
			<button class="card__btn btn btn-blue px-3 py-1 rounded-4 fw-bold" data-bs-toggle="modal" data-bs-target="#carDetailsModal" data-car-id="${car.id}">Sprawdź</button>	  					
			</div>
			</div>
			</div>
			</div>
			`;
		});

	} else {
		carList.innerHTML += '<p class="fs-5 fw-bold text-center">Brak wyników</p>';

	}

}

filterSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const type = document.getElementById('filterType').value;
	const drive = document.getElementById('filterDrive').value;
	const priceMin = document.getElementById('filterPriceMin').value;
	const priceMax = document.getElementById('filterPriceMax').value;



	const filtered = cars.filter(car => {
		if (type && car.type !== type) return false;
		if (drive && car.drive !== drive) return false;
		if (priceMin && car.price < Number(priceMin)) return false;
		if (priceMax && car.price > Number(priceMax)) return false;
		return true;
	});

	if (!type && !drive && !priceMin && !priceMax) {
		renderCars(cars);
	} else {
		renderCars(filtered);
	}
});

modalFindDealer.forEach((e) => {
	e.addEventListener('click', () => {
		let dataToSave = {};		
		const carVersion = carDetailsModal.querySelector('#version-group .btn.active');
		const carColor = carDetailsModal.querySelector('#color-group .btn.active');
		// const winterWheels = carDetailsModal.querySelector('#winter-wheels');
		// const accessories = carDetailsModal.querySelector('#accessories');

		dataToSave.model = carDetailsModal.querySelector('input[name="car_name"]').value;

		if(carVersion){
			dataToSave.version = carVersion.getAttribute('data-value');
		}

		if(carColor){
			dataToSave.colorName = carColor.getAttribute('data-color-name');
			dataToSave.colorCode = carColor.getAttribute('data-color-code');
		}

		carDetailsModal.querySelectorAll('#accessories-group-row input:checked').forEach((e) => {
			dataToSave[e.id] = 1;
		})


		dataToSave.price = carDetailsModal.querySelector('#modalPrice').getAttribute('data-price');

		localStorage.setItem("carModal", JSON.stringify(dataToSave));
		const modal = bootstrap.Modal.getInstance(carDetailsModal);
		modal.hide();

		console.log(dataToSave);

	});
})