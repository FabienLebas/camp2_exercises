// Insert code here
class Fish {
  constructor(name, sex, type){
    this.name = name;
    this.sex = sex;
    this.type = type;
  }
}

class Algae {
  constructor(size){
    this.size = size;
  }
}

class Aquarium {
  constructor(fishes, algaes){
    this.fishes = fishes;
    this.algaes = algaes;
  }
  algaesDisplay(sentence = "algaes"){
    if (this.algaes.length <= 1){
      return "algae";
    }
    return sentence;
  }
  display(){
    const fishDisplay = this.fishes.map(fish => ` ${fish.name} - ${fish.sex}`);
    return `Aquarium contains: ${this.algaes.length} ${this.algaesDisplay()} and${fishDisplay}`;
  }
  addFish(fish){
    this.fishes.push(fish);
    console.log(`${fish.name} added to the Aquarium`);
  }
  addAlgae(algae){
    this.algaes.push(algae);
  }
  remove(fish){
    this.fishes = this.fishes.filter(f => !Object.is(f,fish));
  }
  eat(fish){
    if(fish.type === 1){
      console.log(`Algaes : ${this.algaes.length}`);
      if(this.algaes.length > 0){
        this.algaes.pop();
        console.log(`${fish.name} has eaten an algae.`);
      } else {
        this.remove(fish);
        console.log(`${fish.name} died because there is no more algae.`);
      }
    } else if (fish.type === 0){
      if(this.fishes.length === 1){
        this.remove(fish);
        console.log(`${fish.name} was the last fish and died.`);
      } else {
        const allFishesExceptMe = this.fishes.filter(f => !Object.is(f, fish));
        const fishToEatNumber = Math.floor(Math.random() * allFishesExceptMe.length);
        const fishToEat = allFishesExceptMe[fishToEatNumber];
        this.remove(fishToEat);
        console.log(`${fish.name} has eaten ${fishToEat.name}.`);
      }
    }
  }
  endTurn(){
    for (let i=0; i <= this.fishes.length; i++){
      this.eat(this.fishes[i]);
    }
    console.log(this.display());
  }
}

// const myAquarium = new Aquarium([],[]);
// const fab = new Fish("Fab", "male", 0);
// const hamid = new Fish("Hamid", "male", 0);
// const manu = new Fish("Manu", "male", 0);
// const martine = new Fish("Martine", "female", 1);
// myAquarium.addFish(fab);
// myAquarium.addFish(hamid);
// myAquarium.addFish(manu);
// myAquarium.addFish(martine);
// myAquarium.addAlgae();
//
// const nbOfRounds = myAquarium.fishes.length - 2;
// for (let i = 1; i <= nbOfRounds; i++){
//   console.log(`Round ${i}`);
//   myAquarium.endTurn();
// }

module.exports = {
  aquarium: Aquarium,
  fish: Fish,
  algae: Algae
};
