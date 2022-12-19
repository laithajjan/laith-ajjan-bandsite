//Initializing an array of shows
const shows = [
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];


//Finding the parent show to which other others should be appended to
const showSection = document.querySelector('.shows');


//Creating Header section
const showsHeading = document.createElement('h2');
showsHeading.classList.add('shows__heading');
showsHeading.innerText = 'Shows';
showSection.appendChild(showsHeading);


// Creating Article section
const showsArticle = document.createElement('article');
showsArticle.classList.add('shows__body');
showSection.appendChild(showsArticle);


//Creating table
const tableHead = document.createElement('ul');
tableHead.classList.add('shows__detail', 'shows__detail--top');

const tableHeadDate = document.createElement('li');
tableHeadDate.classList.add('shows__detail-header', 'shows__detail-header--date');
tableHeadDate.innerText = 'Date';
tableHead.appendChild(tableHeadDate);

const tableHeadVenue = document.createElement('li');
tableHeadVenue.classList.add('shows__detail-header');
tableHeadVenue.innerText = 'Venue';
tableHead.appendChild(tableHeadVenue);

const tableHeadLocation = document.createElement('li');
tableHeadLocation.classList.add('shows__detail-header');
tableHeadLocation.innerText = 'Location';
tableHead.appendChild(tableHeadLocation);


//Adding table to Article Section
showsArticle.appendChild(tableHead);


//Function for displaying shows
function displayShows() {
    shows.forEach((show) => {
        //Body of the table
        const tableBody = document.createElement('ul');
        tableBody.classList.add('shows__container');

        tableBody.classList.toggle('shows__container--selected');

        //List of Dates
        const tableListDate = document.createElement('li');
        tableBody.appendChild(tableListDate);

        const showDate = document.createElement('div');
        showDate.classList.add('shows__detail');
        showDate.innerText = 'Date';
        tableListDate.appendChild(showDate);

        const showDateInfo = document.createElement('div');
        showDateInfo.classList.add('shows__date');
        showDateInfo.innerText = show.date;
        tableListDate.appendChild(showDateInfo);

        //List of Venues
        const tableListVenue = document.createElement('li');
        tableBody.appendChild(tableListVenue);

        const showVenue = document.createElement('div');
        showVenue.classList.add('shows__detail');
        showVenue.innerText = 'Venue';
        tableListVenue.appendChild(showVenue);

        const showVenueInfo = document.createElement('div');
        showVenueInfo.classList.add('shows__venue');
        showVenueInfo.innerText = show.venue;
        tableListVenue.appendChild(showVenueInfo);

        //List of Locations
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

        //List of buying
        const tableListButton = document.createElement('li');
        tableBody.appendChild(tableListButton);

        const button = document.createElement('a');
        button.setAttribute('href', '');
        button.setAttribute('target', '_blank');
        button.classList.add('shows__button');
        button.innerText = 'Buy Tickets';
        tableListButton.appendChild(button);

        //Adding comment to Articles
        showsArticle.appendChild(tableBody);
        console.log(tableBody);
    });
}


//Function to Display Shows
displayShows();