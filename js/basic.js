const buttonContainer = document.getElementById('button_container');
const videoContainer = document.getElementById('video_container');
const errorContainer = document.getElementById('error_container');
let selectedCategory = 1000;

const loadCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const json = await response.json();
    const data = json.data
    createButtons(data)
}

const createButtons = (data) => {
    data.forEach(button => {
        const newButton = document.createElement('button');
        newButton.innerText = button.category;
        newButton.classList = 'btn btn-outline btn-secondary';
        buttonContainer.appendChild(newButton);

        newButton.addEventListener('click', () => {
            fetchDataById(button.category_id);
        });
    });
}

const fetchDataById = async (buttonID) => {
    selectedCategory = buttonID;
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${buttonID}`);
    const datas = await response.json();
    const videoDatas = datas.data;
    videoContainer.innerHTML = '';

    if (videoDatas.length === 0) {
        errorContainer.classList.remove('hidden');
    } else {
        errorContainer.classList.add('hidden');
    }

    videoDatas.forEach(video => {

        let verifiedBadge = '';
        if (video.authors[0].verified) {
            verifiedBadge = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2568EF" class="w-6 h-6">
                <path fill-rule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
            </svg>
            `
        }

        const newVideo = document.createElement('div');
        newVideo.classList.add('space-y-5');
        newVideo.innerHTML = `
                <div>
                    <img class="rounded-lg w-full" src="${video.thumbnail}" alt="">
                </div>
                <div class="flex gap-x-3">
                    <div class="w-1/6">
                        <img class="rounded-full" src="${video.authors[0].profile_picture}" alt="">
                    </div>
                    <div class="w-11/12 space-y-2">
                        <p class="card-title">${video.title}</p>
                        <div class="flex gap-x-2">
                            <p>${video.authors[0].profile_name}</p>
                            ${verifiedBadge}
                        </div>
                        <p>${video.others.views} views</p>
                    </div>
                </div>
        `
        videoContainer.appendChild(newVideo);
    });
}

loadCategories();
fetchDataById(selectedCategory);