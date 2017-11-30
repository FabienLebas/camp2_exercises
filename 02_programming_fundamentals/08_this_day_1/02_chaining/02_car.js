// See Sparta courses for the exercise summary
const car = {
  speed: 0,
  minutes: 0,
  distance: 0,
  start: function(){
    this.speed = 0;
    this.minutes = 0;
    this.distance = 0;
    return this;
  },
  changeSpeed: function(newSpeed){
    this.speed = newSpeed;
    return this;
  },
  drive: function(minutesDrive){
    this.minutes = minutesDrive;
    this.distance += minutesDrive * this.speed / 60;
    return this;
  },
  showDistance: function(){
    console.log(`${this.distance} Km`);
    return this;
  }
}

car.start().changeSpeed(130).drive(42).showDistance();
car
  .start()
  .changeSpeed(130).drive(45)
  .changeSpeed(50).drive(30)
  .changeSpeed(90).drive(80)
  .showDistance();

module.exports = car;
