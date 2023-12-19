let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// fetch all toys from API
let toyArray = []

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toysData => {
    renderToyCards(toysData)
    toyArray = toysData
  })

  function renderToyCards(toyArray){

    const toyCollection = document.getElementById("toy-collection")
    // console.log(toyCollection) // making sure this is the right element on the page we grabbed with the line above

    // console.log(toyArray) // checking to make sure we have the array grabbed
    
    toyArray.forEach((toyObject) => {
    
      //  console.log(toyObject) // checking to make sure we have grabbed each obj w/in the toy; gives you key: with id, image, likes and name

      // make a div class card for each toy
      // make h2 tag with the toy's name
      // make img tag with the src of the toy's image attribute and the class name "toy-avatar"
      // make p tag with how many likes that toy has
      // make button tag with a class "like-btn" and an id attribute set to the toy's id number

// because you have to make an individual card for each toy with each of the listed items above, do each one of the tasks within THIS current forEach function

const card = document.createElement('div')
card.className = 'card'

const h2 = document.createElement('h2')
h2.textContent = toyObject.name 
card.appendChild(h2)

const img = document.createElement('img')
img.src = toyObject.image
img.alt = toyObject.name
img.className = 'toy-avatar'
card.appendChild(img)

const p = document.createElement('p')
let ogLikes = toyObject.likes 
p.textContent = toyObject.likes + " likes"
card.appendChild(p)

const button = document.createElement('button')
button.className = 'like-btn'
button.id = toyObject.id
button.textContent = "Like ❤️"

button.addEventListener("click", incrementLikes)

function incrementLikes(e) {
  // console.log(e) // checks to make sure we created the click event correctly
  // 1. this click event needs to grab current number of likes (you already grabbed this in your p tag textContent)
  // console.log(ogLikes) // making sure we are logging and starting with the original value of likes in our dataset
  // 2. Add one to it's current number each time it's clicked
  ogLikes++ 
  //console.log(ogLikes) // checking to make sure it's adding one to the og value each time it's clicked 
  // 3. render this new number to the p tag
  p.textContent = ogLikes + " likes"

  updateLikes()

  function updateLikes(){
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "likes": ogLikes 
      })
    })
  }
}

card.appendChild(button)

// console.log(card) // making sure we grabbed the card

// append div class for each toy card to #toy-collection div

toyCollection.appendChild(card)
    })
  }

// When a user submits the toy form, two things should happen:
  // 1. A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
  // 2. If the post is successful, the toy should be added to the DOM without reloading the page.
  
const form = document.querySelector(".add-toy-form") // grabbing the form from the DOM
// console.log(form) // making sure we grabbed the form successfully from the DOM
form.addEventListener("submit", (e) => addNewToy(e))
  
function addNewToy(e){
  e.preventDefault() //prevents page from reloading when submit is clicked 
  // console.log(e) // making sure the event performs like it should

  const NewToyObject = {
    id: toyArray.length + 1,
    name: e.target.name.value,
    images: e.target.image.value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
  method: "POST",
  body: JSON.stringify(NewToyObject),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then(resp => console.log(resp)) ;

  renderToyCards([NewToyObject])
}
