

class Character {

  constructor(name, gender, height, weight, hairColor, pictureURL, id){
    this.name = name;
    this.gender = gender;
    this.height = height; 
    this. weight = weight;
    this.hairColor = hairColor;
    this.picture = pictureURL;
    this.id = id;
  }

  drawCharacters(div){
    div.innerHTML = `
    <img src="./pictures/${this.id}.png" alt="Picture of ${this.name}">
    <h3>${this.name}</h3>
    <div class="bubble" data-id=${this.id}> </div

    <div class="buttons">
    <button id="infoBtn" class="height" data-id="${this.id}">Height</button>
    <button id="infoBtn" class="gender" data-id="${this.id}">Gender</button>
    <button id="infoBtn" class="weight" data-id="${this.id}">weight</button>
    <button id="infoBtn" class="hairColor" data-id="${this.id}">Hair color</button>
    </div>`
  }

  checkHeight(otherUser){
 
    let thisHeight = parseInt(this.height) 
    let otherHeigt = parseInt(otherUser.height)
    let thisTaller = (parseInt(this.height) - parseInt(otherUser.height))
    let otherTaller =(parseInt(otherUser.height) - parseInt(this.height))
    let bubbles = document.querySelectorAll(".bubble")

    bubbles.forEach(bubble => {
      let bubbleID = bubble.getAttribute("data-id")
      
      if(bubbleID == this.id){
        if(thisHeight > otherHeigt){
          bubble.innerHTML = ` ${otherUser.name} is ${otherUser.height}cm tall, ${otherUser.name} is ${thisTaller}cm shorter than me.`
        } else if (thisHeight < otherHeigt){
          bubble.innerHTML = `${otherUser.name} is ${otherUser.height}cm tall, ${otherUser.name} is ${otherTaller}cm taller than me.`
        } else {
          bubble.innerHTML = `We are the same height, we are both ${otherUser.height}cm tall.`
        }
      }
    })
  }

  checkWeight(otherUser){
    let thisWeight = parseFloat(this.weight) 
    let otherWeight = parseFloat(otherUser.weight)
    let thisWeightMore = (parseFloat(this.weight) - parseFloat(otherUser.weight))
    let otherWeightMore =(parseFloat(otherUser.weight) - parseFloat(this.weight))
    let bubbles = document.querySelectorAll(".bubble")

    bubbles.forEach(bubble => {
      let bubbleID = bubble.getAttribute("data-id")

      if(bubbleID == this.id){
        if (thisWeight > otherWeight){
          bubble.innerHTML = `${otherUser.name} weig ${otherUser.weight}kg, ${otherUser.name} weig ${thisWeightMore}kg less than me.`
        } else if (thisWeight < otherWeight) {
          bubble.innerHTML = `${otherUser.name} weig ${otherUser.weight}kg, ${otherUser.name} weig ${otherWeightMore}kg more than me.`
        } else {
          bubble.innerHTML = `We are the same weight, we both weig ${otherUser.weight}kg.`
        }
      }
    })
  }

  checkGender(otherUser){
    let bubbles = document.querySelectorAll(".bubble")

    bubbles.forEach(bubble => {
      let bubbleID = bubble.getAttribute("data-id")

      if(bubbleID == this.id){

        if(this.gender === otherUser.gender){
          bubble.innerHTML = `We are both ${otherUser.gender}`
        } else if (this.gender !== otherUser.gender) {
          if (this.gender == "n/a" && otherUser.gender != "n/a"){
            bubble.innerHTML = `${otherUser.name} is a ${otherUser.gender} and I dont have a gender.`
          } else if (this.gender != "n/a" && otherUser.gender == "n/a"){
            bubble.innerHTML = `${otherUser.name} dosen't have a gender but I'm a ${this.gender}`
          } else {
            bubble.innerHTML = `${otherUser.name} is a ${otherUser.gender} and I'm a ${this.gender}`
          }
        }
      }
    })
  }

  checkHariColor(otherUser){
  let bubbles = document.querySelectorAll(".bubble")

  bubbles.forEach(bubble => {
  let bubbleID = bubble.getAttribute("data-id")

  if (bubbleID == this.id){
    if (this.hairColor === otherUser.hairColor){
      bubble.innerHTML  = `We both have ${otherUser.hairColor} hair`
    } else if (otherUser.hairColor == "n/a"){
      bubble.innerHTML = `${otherUser.name} doesn't have hair`
    } else if (otherUser.hairColor == "n/a" && this.hairColor == "n/a"){
      bubbles.innerHTML = `None of us have hair`
    }else if (this.hairColor !== otherUser.hairColor) {
      bubble.innerHTML = `${otherUser.name} has ${otherUser.hairColor} hair`
    } 
  }
})
  }
};
//_____________________________________________
//Divs
let profile1 = document.querySelector(".profile1")
let profile2 = document.querySelector(".profile2")
//Drop downs
let input1 = document.querySelector("#characterOne")
let input2 = document.querySelector("#characterTwo")
let startBtn = document.querySelector(".chooseBtn")

let fetchStarWarsData = async(chooseCharacter) => {
  let response = await fetch (`https://swapi.dev/api/people/${chooseCharacter}`)
  let data = response.json()
  return data;
};


 let smallBtnFunc = (thisCharacter, otherCharacter) => {
  fetchStarWarsData(otherCharacter)
  .then(data => {
    let newCharacter2 = new Character(data.name, data.gender, data.height, data.mass, data.hair_color, `./pictures/${input2.value}.png`,input2.value);
    let infoBtn = document.querySelectorAll("#infoBtn");

    infoBtn.forEach(button => {
      button.addEventListener("click", () => {
        let dataId = button.getAttribute("data-id");

        if (dataId === thisCharacter.id){
          if (button.className === "height"){
            thisCharacter.checkHeight(newCharacter2)

          } else if (button.className === "gender"){
            thisCharacter.checkGender(newCharacter2)

          } else if (button.className === "weight"){
            thisCharacter.checkWeight(newCharacter2)

          } else if (button.className === "hairColor"){
            thisCharacter.checkHariColor(newCharacter2)

          }
        }
      })
    })
  })
 }

//____________________________________________

let compareBtn = document.querySelector(".compare")

compareBtn.addEventListener("click", () => {
  if (input1.value == 0 || input2.value == 0){
    alert("You need to select characters")
  }else {
    fetchStarWarsData(input1.value)
    .then(data => {
      newCharacter1 = new Character(data.name, data.gender, data.height, data.mass, data.hair_color, `./pictures/${input1.value}.png`,input1.value);
      newCharacter1.drawCharacters(profile1);
      smallBtnFunc(newCharacter1, input2.value)
    })
  
    fetchStarWarsData(input2.value)
    .then(data => {
      newCharacter2 = new Character(data.name, data.gender, data.height, data.mass, data.hair_color, `./pictures/${input2.value}.png`,input2.value);
      newCharacter2.drawCharacters(profile2);
      smallBtnFunc(newCharacter2, input1.value)
    })
  }
})