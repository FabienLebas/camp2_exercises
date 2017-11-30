// See Sparta courses for the exercise summary
const orangeTree = {
  height: 0,
  age: 0,
  oranges: 0,
  alive: false,
  pickAnOrange: function(){
    if(this.oranges){
      this.oranges--;
      return true;
    }
    //console.log("No more oranges to pick");
    return false;
  },
  ageOneYear: function(){
    if(this.alive){
      this.age++;
      this.die(this.age);
      this.grow(this.age);
      this.produceOranges(this.age);
      return this.age;
    }
    //console.log(("I can't get older if I was never seeded"));
    return false;
  },
  seed: function(){
    this.age = 0;
    this.height = 0;
    this.oranges = 0;
    this.alive = true;
    //console.log("Beginning of my life");
  },
  grow: function(age){
    if(age < 10){
      this.height += 25;
    } else if (age < 20){
      this.height += 10;
    }
  },
  produceOranges: function(age){
    if(age >= 5 && age < 10){
      this.oranges = 10;
      return 10;
    } else if (age >= 10 && age < 20){
      this.oranges = 20;
      return 20;
    } else if (age >= 5 && age < 40){
      this.oranges = 5;
      return 5;
    }
    this.oranges = 0;
    return 0;
  },
  die: function(age){
    if((Math.random() > 0.9 && age >= 50) || age >= 100){
      this.alive = false;
      //console.log("RIP orange tree");
    }
  }
}

module.exports = orangeTree;
