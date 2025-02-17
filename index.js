const loadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res=>res.json())
    .then(data =>displayCategories(data.categories))
    .catch(err=>console.log(err));
    
}
const loadPetsByCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => displayPets(data.data));

    const allButtons = document.querySelectorAll('.btn-category');
    allButtons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.classList.add('bg-white');
    });

    const activeButton = document.getElementById(category);
    if (activeButton) {
        activeButton.style.backgroundColor = '#0E7A81';
        activeButton.style.color = 'white';
        activeButton.classList.remove('bg-white');
    }
}


const displayCategories = (data) => {
    console.log(data); // Check the data in the console
    const allCategory = document.getElementById('category');

    data.forEach(element => {
        const categoryButton = document.createElement('div');
    
        categoryButton.innerHTML = `
            <button id="${element.category}" onclick="loadPetsByCategory('${element.category}')" class="btn btn-category bg-white md:w-[200px]  border-purple-500 flex items-center gap-2">
                <img src="${element.category_icon}" alt="${element.category}" class="w-6 h-6"> <!-- Icon -->
                ${element.category} <!-- Name -->
            </button>
        `;
        allCategory.appendChild(categoryButton);
    });
}

// Fetch pet data from API
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayPets(data.pets))
        .catch(err => console.log(err));
};

// Display pet cards dynamically
const displayPets = (pets) => {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = ''; // Clear previous content

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'p-4', 'border', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition');
        const breedName = pet.breed ? pet.breed : "Unknown Breed";
        

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-48 object-cover rounded-lg">
            <div class="p-4 text-gray-700">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">${pet.pet_name}</h3>
                   
                </div>
                
                <p class="text-sm"><i class="fas fa-paw text-gray-500"></i> <span class="font-semibold">Breed:</span> ${breedName}</p>
                <p class="text-sm"><i class="fas fa-calendar text-gray-500"></i> <span class="font-semibold">Birth:</span> ${pet.date_of_birth}</p>
                <p class="text-sm"><i class="fas fa-venus-mars text-gray-500"></i> <span class="font-semibold">Gender:</span> ${pet.gender}</p>
                <p class="text-sm"><i class="fas fa-dollar-sign text-gray-500"></i> <span class="font-semibold">Price:</span> $${pet.price}</p>
                <br>

                <hr>
                
                <div class="flex justify-between items-center mt-4 md:gap-2">
                <button class="like-btn text-gray-500 hover:text-blue-500">
                        <i class="far fa-thumbs-up border px-4 py-2 rounded-md hover:bg-gray-100 transition"></i>
                    </button>
                    <button class="bg-[#0E7A81] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Adopt</button>
                    <button class="border px-4 py-2 rounded-md hover:bg-gray-100 transition">Details</button>
                </div>
            </div>
        `;

        petContainer.appendChild(petCard);
    });
};

// Load pets when the page loads
loadPets();

loadCategories();