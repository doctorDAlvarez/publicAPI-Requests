/********************************
 * Team Treehouse JS techDegree
 * Dynamic employee directory - 
 * Using public API requests.
 * 
 * Author:
 * @doctorDAlvarez on twitter
 * April 2021.
 *******************************/

//creating dynamically html search feature.
const search_html =
	` 
    <form action="#" method="get" id="form">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
document.querySelector( ".search-container" ).insertAdjacentHTML( "beforeend", search_html );

// fetching 12 american employees randomly from the API.
const employee_array = [];
const gallery_div = document.getElementById( "gallery" );
const body = document.body;
fetch( "https://randomuser.me/api/?results=12&nat=us" )
	.then( res => res.json() )
	.then( data => {
		employee_array.push(...data.results);
		return employee_array;
	})
	.then( employee_array => {
		createGallery( employee_array );
	});

//creating dynamically html for the gallery and adding each event listener.
function createGallery( employee_array ) {
	gallery_div.innerHTML = "";
	employee_array.forEach( employee => {
		const gallery_html =
			`
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${employee.id.value}" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
        `;
		gallery_div.insertAdjacentHTML( "beforeend", gallery_html );
		gallery_div.lastElementChild.addEventListener( "click", evt => {
			displayModal( evt.currentTarget.children[1].firstElementChild.id, employee_array );
		});
	});
}

// function to render the modal.
function displayModal( employee_id, employee_array) {
	const modalContainer = document.querySelector( ".modal-container" );
	if ( modalContainer ) {
		modalContainer.remove();
	}
	const selected_employee = employee_array.filter( ( employee ) => 
		employee.id.value === employee_id );
	const employee_index = employee_array.indexOf( selected_employee[0] );
	const modal =
		`
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${selected_employee[0].picture.large}" alt="profile picture">
                    <h3 id="${selected_employee[0].id.value}" class="modal-name cap">${selected_employee[0].name.first}\
                             ${selected_employee[0].name.last}</h3>
                    <p class="modal-text">${selected_employee[0].email}</p>
                    <p class="modal-text cap">${selected_employee[0].location.city}</p>
                    <hr>
                    <p class="modal-text">${selected_employee[0].phone.replace("-", " ")}</p>
                    <p class="modal-text">${selected_employee[0].location.street.number} ${selected_employee[0].location.street.name},
                        ${selected_employee[0].location.state}.\
                        ${selected_employee[0].location.postcode}.</p>
                    <p class="modal-text">Birthday: ${selected_employee[0].dob.date.slice(5,7)}/${selected_employee[0].dob.date.slice(8,10)}/${selected_employee[0].dob.date.slice(0,4)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
		`;
	body.insertAdjacentHTML( "beforeend", modal );
	document.querySelector( ".modal-container" ).addEventListener( "click", evt => {
		if ( evt.target.parentElement.id === "modal-close-btn" ) {
			evt.currentTarget.remove();
		} else if ( evt.target.id === "modal-prev" ) {
			if ( employee_index !== 0 ) {
				displayModal( employee_array[employee_index - 1].id.value, employee_array );
			}
		} else if ( evt.target.id === "modal-next" ) {
			if ( employee_index !== employee_array.length -1 ) {
				displayModal( employee_array[employee_index + 1].id.value, employee_array );
			}
		}
	});
}

// search feature
document.querySelector( "#search-input" ).addEventListener( "input", evt => {
	const filter_employee = employee_array.filter( employee => employee.name.first
		.toLowerCase().includes( evt.target.value.toLowerCase() ) || employee.name.last
		.toLowerCase().includes( evt.target.value.toLowerCase() ));
	createGallery( filter_employee );
});