// Setting the apiKey as well as the get and post URLs
const apiKey = '671ed9e7-8197-4a31-af1f-8d003b10d58e';
const showsURL = `https://project-1-api.herokuapp.com/showdates/?api_key=${apiKey}`;


//Function to format date
function formatDate(date) {
    correctDate = new Date(Number(date));
    
    const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

    const dy = days[correctDate.getDay()];
    const mm = months[correctDate.getMonth()];
    const dd = correctDate.getDate().toString().padStart(2, '0');
    const yy = correctDate.getFullYear().toString();

    return `${dy} ${mm} ${dd} ${yy}`;
}


//Getting parent to which shows are appended
const showSection = document.querySelector('.shows');
let shows = [];


//Creating shows heading
const showsHeading = document.createElement('h2');
showsHeading.classList.add('shows__heading');
showsHeading.innerText = 'Shows';
showSection.appendChild(showsHeading);

//Creating shows article
const showsArticle = document.createElement('article');
showsArticle.classList.add('shows__body');
showSection.appendChild(showsArticle);

//Creating table
const tableHead = document.createElement('ul');
tableHead.classList.add('shows__detail', 'shows__detail--top');

// Appending dates to table
const tableHeadDate = document.createElement('li');
tableHeadDate.classList.add('shows__detail-header', 'shows__detail-header--date');
tableHeadDate.innerText = 'Date';
tableHead.appendChild(tableHeadDate);

// Appending venue to table
const tableHeadVenue = document.createElement('li');
tableHeadVenue.classList.add('shows__detail-header');
tableHeadVenue.innerText = 'Venue';
tableHead.appendChild(tableHeadVenue);

// Appending location to table
const tableHeadLocation = document.createElement('li');
tableHeadLocation.classList.add('shows__detail-header');
tableHeadLocation.innerText = 'Location';
tableHead.appendChild(tableHeadLocation);

// Appending headerMargin to table
const headerMargin = document.createElement('div');
headerMargin.classList.add('shows__header-margin');
tableHead.appendChild(headerMargin);

//Appending table to shows article
showsArticle.appendChild(tableHead);


//Function to display shows
function displayShows() {
    shows.forEach((show) => {

        //Creating table body
        const tableBody = document.createElement('ul');
        tableBody.classList.add('shows__container');

        function focusShow() {
            const highlightedShows = document.querySelectorAll('.shows__container--selected');
            if (highlightedShows.length > 0) {
                highlightedShows.forEach((highlightedShow) => {
                    highlightedShow.classList.replace('shows__container--selected', 'shows__container');
                });
            } 
            tableBody.classList.replace('shows__container', 'shows__container--selected');
        }

        tableBody.addEventListener('click', focusShow);

        //Creating list for data
        const tableListDate = document.createElement('li');
        tableBody.appendChild(tableListDate);

        const showDate = document.createElement('div');
        showDate.classList.add('shows__detail');
        showDate.innerText = 'Date';
        tableListDate.appendChild(showDate);

        const showDateInfo = document.createElement('div');
        showDateInfo.classList.add('shows__date');
        showDateInfo.innerText = formatDate(show.date);
        tableListDate.appendChild(showDateInfo);

        //Creating list for venues
        const tableListVenue = document.createElement('li');
        tableBody.appendChild(tableListVenue);

        const showVenue = document.createElement('div');
        showVenue.classList.add('shows__detail');
        showVenue.innerText = 'Venue';
        tableListVenue.appendChild(showVenue);

        const showVenueInfo = document.createElement('div');
        showVenueInfo.classList.add('shows__venue');
        showVenueInfo.innerText = show.place;
        tableListVenue.appendChild(showVenueInfo);

        //Creating list for locations
        const tableListLocation = document.createElement('li');
        tableBody.appendChild(tableListLocation);

        const showLocation = document.createElement('div');
        showLocation.classList.add('shows__detail');
        showLocation.innerText = 'Location';
        tableListLocation.appendChild(showLocation);

        const showLocationInfo = document.createElement('div');
        showLocationInfo.classList.add('shows__location');
        showLocationInfo.innerText = show.location;
        tableListLocation.appendChild(showLocationInfo);

        //Creating list for buttons
        const tableListButton = document.createElement('li');
        tableBody.appendChild(tableListButton);

        const button = document.createElement('a');
        button.setAttribute('href', 'https://www.bandsintown.com/');
        button.setAttribute('target', '_blank');
        button.classList.add('shows__button');
        button.innerText = 'Buy Tickets';
        tableListButton.appendChild(button);

        //Appending comments to shows article
        showsArticle.appendChild(tableBody);
    });
}


//Creating axios requests
axios 
    .get(showsURL)
    .then((response) => {
        shows = response.data;
        displayShows();
    })
    .catch((error) => {
        console.log(error);
    });