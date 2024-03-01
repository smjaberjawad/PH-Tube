const buttonContainer = document.getElementById('button_container');

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
        
        newButton.addEventListener('click', () => fetchDataById(button.category_id));
    });
}

const fetchDataById = (buttonID) => {
    console.log(buttonID);
}

loadCategories();