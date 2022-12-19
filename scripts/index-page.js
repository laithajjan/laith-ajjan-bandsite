//create an array of comments
const comments = [
    {
        name: 'Connor Walton',
        timeStamp: '02/17/2021',
        image: '',
        commentText: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Emilie Beach',
        timeStamp: '01/09/2021',
        image: '',
        commentText: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Miles Acosta',
        timeStamp: '12/20/2020',
        image: '',
        commentText: 'I can\'t stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can\'t get enough.'
    }
];


//get the parent to which the comments would be appended
const commentSection = document.querySelector('.comment__section');


// create a function to display each comment
function displayComment(item) {
    const userComment = document.createElement('div');
    userComment.classList.add('comment__old');

    //image element
    if (item.image === '') {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('comment__avatar-missing');
        userComment.appendChild(imageDiv);
    } else {
        const userAvatar = document.createElement('img');
        userAvatar.setAttribute('src', item.image);
        userAvatar.classList.add('comment__avatar', 'comment__avatar--new');
        userComment.appendChild(userAvatar);
    }

    //comment container
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment__old-container');
    userComment.appendChild(commentContainer);

    //user info
    const userInfo = document.createElement('div');
    userInfo.classList.add('comment__info');
    commentContainer.appendChild(userInfo);

    //user name
    const userName = document.createElement('div');
    userName.classList.add('comment__writer');
    userName.innerText = item.name;
    userInfo.appendChild(userName);

    //date
    const date = document.createElement('div');
    date.classList.add('comment__date');
    date.innerText = item.timeStamp;
    userInfo.appendChild(date);

    //comment text
    const text = document.createElement('p');
    text.innerText = item.commentText;
    commentContainer.appendChild(text);

    //append comment to webpage
    commentSection.appendChild(userComment);
}


// call the function to display each comment on the bio page
comments.forEach((comment) => {
    displayComment(comment);
});


//declare function to get date
function formatDate(date) {
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const yyyy = date.getFullYear().toString();
    return `${mm}/${dd}/${yyyy}`;
}

//create function to add new comment to the page
const addComment = ((event) => {
    event.preventDefault();

    commentSection.innerHTML = '';

    const newComment = {};
    const formFieldName = document.querySelector('.comment__input-name');
    const formFieldComment = document.querySelector('.comment__input-conversation');
    const formFieldvalidation = document.querySelector('.comment__validation');
    const userName = event.target.name.value;
    const userDate = formatDate(new Date());
    const userImage = '';
    const userComment = event.target.comment.value;

    if (userName === '' || userComment === '') {
        formFieldName.classList.add('comment__input-error');
        formFieldComment.classList.add('comment__input-error');
        formFieldvalidation.innerText = '***Please check that you have entered your name or comment***';
    } else {
        formFieldName.classList.remove('comment__input-error');
        formFieldComment.classList.remove('comment__input-error');
        formFieldvalidation.innerText = '';

        newComment.name = userName;
        newComment.timeStamp = userDate;
        newComment.image = userImage;
        newComment.commentText = userComment;

        comments.unshift(newComment);

        event.target.reset();
    }

    comments.forEach((comment) => {
        displayComment(comment);
    });
});


//add new comment to page
const form = document.querySelector('.comment__form');
form.addEventListener('submit', addComment);