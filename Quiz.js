class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("pink");
    //write code to show a heading for showing the result of Quiz
    fill("brown");
    stroke("Black");
    textSize(27);
    text("Result Of The Quiz",350,60);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants!== undefined){
      var display_Answers = 230;
      fill("Indigo");
      textSize(20);
      text("*NOTE*: Contestant who answered correct are highlighted in Purple colour!!",130,235);
    }
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer)
        fill("Purple")
      else
        fill("Green");

        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 270,display_Answers);
 
  }
}
}
