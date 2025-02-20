let filteredPets = [];

// Function to show the spinner
const showSpinner = () => {
    const spinnerContainer = document.getElementById("spinner-container");
    spinnerContainer.classList.remove("hidden");
    spinnerContainer.classList.add("flex");
};

// Function to hide the spinner
const hideSpinner = () => {
    const spinnerContainer = document.getElementById("spinner-container");
    spinnerContainer.classList.add("hidden");
};

const loadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res=>res.json())
    .then(data =>displayCategories(data.categories))
    .catch(err=>console.log(err));
    
}
const loadPetsByCategory = (category) => {
    showSpinner(); // Show the spinner before fetching data

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                displayPets(data.data); // Display pets after 3 sec
                hideSpinner();
            }, 2000);
        })
        .catch(err => {
            console.error("Error fetching pets by category:", err);
            hideSpinner(); // Hide spinner on error
        });

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
            <button id="${element.category}" onclick="loadPetsByCategory('${element.category}')" class="btn btn-category bg-white md:w-[170px] lg:w-[250px]   border-purple-500 flex items-center gap-2">
                <img src="${element.category_icon}" alt="${element.category}" class="w-6 h-6"> <!-- Icon -->
                ${element.category} <!-- Name -->
            </button>
        `;
        allCategory.appendChild(categoryButton);
    });
}

// Fetch and display all pets
const loadPets = () => {
    showSpinner(); // Show the spinner before fetching data

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            allPets = data.pets; // Store all pets
            filteredPets = allPets; // Initialize filteredPets with all pets

            // Ensure spinner stays for exactly 3 seconds
            setTimeout(() => {
                displayPets(filteredPets); // Display pets after 3 sec
                hideSpinner();
            }, 2000);
        })
        .catch((err) => {
            console.error("Error fetching all pets:", err);
            hideSpinner(); // Hide spinner on error
        });
};

// sort
const sortByPrice = () => {
    // Sort pets by price in descending order
    filteredPets.sort((a, b) => b.price - a.price);

    // Re-render the pet cards with the sorted data
    displayPets(filteredPets);
};

// Function to load pet details
const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => detailsModal(data.petData))
        .catch(err => console.error('Error fetching pet details:', err));
};

// Function to display pet details in the modal
const detailsModal = (data) => {
    console.log(data);

    // Update modal title
    document.getElementById('modalTitle').textContent = data.pet_name;
    const breedName = data.breed ? data.breed : "Unknown Breed"
    const Price = data.price ? data.price : "Not given";

    // Update modal body with pet details
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="${data.image}" alt="${data.pet_name}" class="w-24 h-24 object-cover rounded-lg">
            <div>
                <p class="text-lg font-semibold">${data.pet_name}</p>
                <p class="text-sm text-gray-600"><i class="fas fa-paw text-gray-500"></i> ${breedName}</p>
            </div>
        </div>
        <div class="space-y-2">
            <p><i class="fas fa-venus-mars text-gray-500"></i><span class="font-semibold">Gender:</span> ${data.gender}</p>
            <p><i class="fas fa-calendar text-gray-500"></i> <span class="font-semibold">Birth:</span> ${data.date_of_birth}</p>
            <p><i class="fas fa-dollar-sign text-gray-500"></i> <span class="font-semibold">Price:</span> $${Price}</p>
            <p><span class="font-semibold">Vaccinated Status:</span> ${data.vaccinated_status}</p>
        </div>
        <div class="mt-4">
            <p class="font-semibold">Details:</p>
            <p class="text-sm text-gray-600">${data.pet_details}</p>
        </div>
    `;

    // Show the modal
    const modal = document.getElementById('petModal');
    modal.classList.remove('hidden');  // Show the modal by removing the 'hidden' class
    modal.classList.add('flex'); 
};


const closeModal = () => {
    document.getElementById('petModal').classList.add('hidden');
    modal.classList.remove('flex'); 
};

const addLikes = (img) => {
    const likeContainer = document.getElementById('liked-images');

    // Create a new image element
    const likeImage = document.createElement('img');
    likeImage.src = img;
    likeImage.classList.add('object-cover', 'rounded-full', 'w-16', 'h-16');

    // Append the new image (it will automatically form rows of 3)
    likeContainer.appendChild(likeImage);
};

const startCountDown = (event) => {
    // Prevent default button behavior (if any)
    event.preventDefault();

    // Get the modal, countdown, and button elements
    const modal = document.getElementById("adoptModal");
    modal.classList.add('flex');
    const countdownElement = document.getElementById("countdown");
    const button = event.target;
     // Get the button that triggered the event
     console.log(button);

    // Show the modal
    modal.classList.remove("hidden");

    // Start the countdown
    let count = 3;
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        // Close the modal and disable the button when countdown reaches 0
        if (count <= 0) {
            clearInterval(countdownInterval);
            modal.classList.add("hidden");
            button.disabled = true; 
            button.classList.add("bg-gray-400");
        }
    }, 1000); // Update every second
};


// Display pet cards dynamically
const displayPets = (pets) => {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = ''; // Clear previous content
    

    if (pets.length === 0) {
        petContainer.innerHTML = `
       <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
                <img src="images/error.webp" alt="No pets found" class="w-40 h-40">
                <p class="mt-4 text-2xl font-semibold text-gray-800">No Information Available</p>
                <p class="mt-2 text-gray-600 text-center max-w-md">
                    It is a long established fact that a reader will be distracted by the readable content of a page 
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                    normal distribution of letters.
                </p>
            </div>

        `;
        return; // Exit the function
    }

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'p-4', 'border', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition');
        const breedName = pet.breed ? pet.breed : "Unknown Breed";
        const Price = pet.price ? pet.price : "Not given";
        const birth = pet.date_of_birth ? pet.date_of_birth : "Not Given";
        const Gender = pet.gender ? pet.gender :"Not Given";

        

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-48 object-cover rounded-lg">
            <div class="p-4 text-gray-700">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">${pet.pet_name}</h3>
                   
                </div>
                
                <p class="text-sm"><i class="fas fa-paw text-gray-500"></i> <span class="font-semibold">Breed:</span> ${breedName}</p>
                <p class="text-sm"><i class="fas fa-calendar text-gray-500"></i> <span class="font-semibold">Birth:</span> ${birth}</p>
                <p class="text-sm"><i class="fas fa-venus-mars text-gray-500"></i> <span class="font-semibold">Gender:</span> ${Gender}</p>
                <p class="text-sm"><i class="fas fa-dollar-sign text-gray-500"></i> <span class="font-semibold">Price:</span> $${Price}</p>
                <br>

                <hr>
                
                <div class="flex justify-between items-center mt-4 md:gap-1 -mx-3 lg:gap-2 ">
                <button onclick="addLikes('${pet.image}')" class="like-btn text-gray-500 hover:text-blue-500">
                        <i class="far fa-thumbs-up border px-4 py-2 rounded-md hover:bg-gray-100 transition"></i>
                    </button>
                    <button onclick="startCountDown(event)" class="bg-[#0E7A81] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Adopt</button>
                    <button onclick = "loadDetails('${pet.petId}')" class="border px-4 py-2 rounded-md hover:bg-gray-100 transition">Details</button>
                </div>
            </div>
        `;

       

        petContainer.appendChild(petCard);
    });
};

// Load pets when the page loads
loadPets();

loadCategories();