// Setting the apiKey as well as the get and post URLs
const apiKey = '671ed9e7-8197-4a31-af1f-8d003b10d58e';
const getURL = `https://project-1-api.herokuapp.com/comments/?api_key=${apiKey}`;
const postURL = `https://project-1-api.herokuapp.com/comments/?api_key=${apiKey}`;


//Function to format name
function formatName(string) {
    const names = string.split(' ');
    const newNames = names.map((name) => {
        return ((name.charAt(0).toUpperCase()) + (name.slice(1)).toLowerCase());
    });
    const formattedName = newNames.join(' ');
    return formattedName;
}


//Function for dynamic date
const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
    { label: 'second', seconds: -10 }
];

function formatDate(date) {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const interval = intervals.find((interval) => {
        return interval.seconds < seconds;
    });
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}


//Getting parent for appending comments
const commentSection = document.querySelector('.comment__section');
let comments = [];


// Function to Display comments
function displayComments() {

    commentSection.innerHTML = '';

    comments.forEach((comment) => {
        const userComment = document.createElement('div');
        userComment.classList.add('comment__old');

        if (!comment.image) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('comment__avatar-missing');
            userComment.appendChild(imageDiv);
        } else {
            const userAvatar = document.createElement('img');
            userAvatar.setAttribute('src', comment.image);
            userAvatar.classList.add('comment__avatar', 'comment__avatar--new');
            userComment.appendChild(userAvatar);
        }

        //Creating a comment container
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment__old-container');
        userComment.appendChild(commentContainer);

        //Appending user information to comment container
        const userInfo = document.createElement('div');
        userInfo.classList.add('comment__info');
        commentContainer.appendChild(userInfo);

        //Appending username to useinfo
        const userName = document.createElement('div');
        userName.classList.add('comment__writer');
        userName.innerText = comment.name;
        userInfo.appendChild(userName);

        //Appendig date to useinfo
        const date = document.createElement('div');
        date.classList.add('comment__date');
        date.innerText = formatDate(comment.timestamp);
        userInfo.appendChild(date);

        //Appending text to comment container
        const text = document.createElement('p');
        text.innerText = comment.comment;
        commentContainer.appendChild(text);

        //Appending comment buttons to comment container
        const commentButtons = document.createElement('div');
        commentButtons.classList.add('comment__buttons');
        commentContainer.appendChild(commentButtons); 

        //Appending like button to commentbuttons 
        const likeButton = document.createElement('button');
        likeButton.classList.add('comment__like');
        if (comment.likes === 1) {
            likeButton.innerText = `${comment.likes} Like`;
        } else {
            likeButton.innerText = `${comment.likes} Likes`;
        }
        commentButtons.appendChild(likeButton);

        const likeComment = ((event) => {
            event.preventDefault(); 

                comment.likes++;
                if (comment.likes === 1) {
                    event.target.innerText = `${comment.likes} Like`;
                } else {
                    event.target.innerText = `${comment.likes} Likes`;
                }
                
                axios
                    .put(`https://project-1-api.herokuapp.com/comments/${comment.id}/like/?api_key=${apiKey}`)
                    .then(() => {
                    })
                    .catch(() => {
                        const likeError = document.createElement('span');
                        likeError.classList.add('comment__validation');
                        likeError.innerText = 'I\'m sorry you cannot like the comment right now, please try again later.'
                        commentButtons.appendChild(likeError);
                    });
        });
        
        likeButton.addEventListener('click', likeComment);

        //Creating delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('comment__delete');
        deleteButton.innerText = 'Delete';
        commentButtons.appendChild(deleteButton);

        const deleteComment = ((event) => {
            event.preventDefault(); 

            commentSection.removeChild(userComment);
            axios
                .delete(`https://project-1-api.herokuapp.com/comments/${comment.id}/?api_key=${apiKey}`)
                .then(() => {
                })
                .catch(() => {
                    const deleteError = document.createElement('span');
                    deleteError.classList.add('comment__validation');
                    deleteError.innerText = 'I\'m sorry you cannot delete the comment right now, please try again later.'
                    commentButtons.appendChild( deleteError);
                });
        });

        deleteButton.addEventListener('click', deleteComment);

        //Appending user comments to comment section
        commentSection.appendChild(userComment);
    });  
}


//Creating axios 
axios
    .get(getURL)
    .then((response) => {
        comments = response.data.reverse();
        displayComments(); 
    })
    .catch((error) => {
        console.log(error);
    });


//Function to add comments
const addComment = ((event) => {

    event.preventDefault(); 

    commentSection.innerHTML = '';

    const newComment = {};
    const formFieldName = document.querySelector('.comment__input-name');
    const formFieldComment = document.querySelector('.comment__input-conversation');
    const formFieldvalidation = document.querySelector('.comment__validation');

    const userName = formatName(event.target.name.value);
    const userComment = event.target.comment.value;

    if(userName === '' || userComment === '') {
        formFieldName.classList.add('comment__input-error');
        formFieldComment.classList.add('comment__input-error');
        formFieldvalidation.innerText = '***Please check that you have entered your name or comment***';
        displayComments();
    } else {
        formFieldName.classList.remove('comment__input-error');
        formFieldComment.classList.remove('comment__input-error');
        formFieldvalidation.innerText = '';

        newComment.name = userName;
        newComment.comment = userComment;
    
        axios
            .post(postURL, newComment)
            .then(() => {
                return axios
                    .get(getURL)
                    .then((response) => {
                        comments = response.data.reverse();
                        displayComments(); 
                    })
                    .catch(() => {
                    });
            })
            .catch(() => {
                const postError = document.createElement('span');
                postError.classList.add('comment__validation');
                postError.innerText = 'I\'m sorry you cannot post a comment right now, please try again later.'
                formFieldvalidation.appendChild( postError);
            });

        event.target.reset();
    }
});

// Adding event listening for adding comments
const form = document.querySelector('.comment__form');
form.addEventListener('submit', addComment);