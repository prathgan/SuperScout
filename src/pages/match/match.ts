import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Myteam } from '../../models/myteam';
import { Match } from '../../models/match';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



 var jewelDone = false;
 var jewelDoneCount = 0;
 var jewelNotDoneCount = 0;

 var glyphOneDone = false;
 var glyphOneDoneCount = 0;
 var glyphOneNotDoneCount = 0;

  var glyphTwoDone = false;
 var glyphTwoDoneCount = 0;
 var glyphTwoNotDoneCount = 0;

 var score = 0;

 var numGlyphsSoFar = 0;
 var numRowsSoFar = 0;
 var numColsSoFar = 0;

 var relicZoneData = 0;
 var uprightdata = false;

 var firstG = false;
 var secondG = false;

 var endGlyphs = 0;

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  myteam = {} as Myteam;
  match = {} as Match;

  public jewelKnocked: boolean;
  public glyphOne: boolean;
  public glyphTwo: boolean;
  public rOneSafe: boolean;
  public rTwoSafe: boolean;

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
	this.jewelKnocked = false;
	this.glyphOne = false;
	this.glyphTwo = false;
	this.rOneSafe = false;
	this.rTwoSafe = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
    this.updateScore();
  }

  public notify() {
  console.log("Toggled: "+ this.jewelKnocked); 
}

  jewelDoneChange(){
  	jewelDoneCount=jewelDoneCount+1;
  	console.log(jewelDoneCount);
  	if(jewelDoneCount%2==0){
  		jewelDone=false;
  		console.log("unchecked");
  		console.log(jewelDone);
  	}
  	else{
  		jewelDone=true;
  		console.log("checked");
  		console.log(jewelDone);
  		score = score + 30;
  		this.updateScore();
  		this.match.autoJewel = jewelDojewene;
  	}
  }

  jewelNotDoneChange(){
  	jewelDoneCount=jewelDoneCount+1;
  	console.log(jewelDoneCount);
  	if(jewelDoneCount%2==1){
  		jewelDone=false;
  		console.log("unchecked");
  		console.log(jewelDone);
  	}
  	else{
  		jewelDone=false;
  		console.log("checked");
  		console.log(jewelDone);
  	}
  }

  glyphOneDoneChange(){
  	glyphOneDoneCount=glyphOneDoneCount+1;
  	console.log(glyphOneDoneCount);
  	if(glyphOneDoneCount%2==0){
  		glyphOneDone=false;
  		console.log("unchecked");
  		console.log(glyphOneDone);

  	}
  	else{
  		glyphOneDone=true;
  		console.log("checked");
  		console.log(glyphOneDone);
  		score = score + 15;
  		this.updateScore();
  		firstG = true;

  	}
  }

  glyphOneNotDoneChange(){
  	glyphOneDoneCount=glyphOneDoneCount+1;
  	console.log(glyphOneDoneCount);
  	if(glyphOneDoneCount%2==1){
  		glyphOneDone=false;
  		console.log("unchecked");
  		console.log(glyphOneDone);
  	}
  	else{
  		glyphOneDone=false;
  		console.log("checked");
  		console.log(glyphOneDone);
  	}
  }

  glyphTwoDoneChange(){
  	glyphTwoDoneCount=glyphTwoDoneCount+1;
  	console.log(glyphTwoDoneCount);
  	if(glyphTwoDoneCount%2==0){
  		glyphTwoDone=false;
  		console.log("unchecked");
  		console.log(glyphTwoDone);

  	}
  	else{
  		glyphTwoDone=true;
  		console.log("checked");
  		console.log(glyphTwoDone);
  		score = score + 15;
  		this.updateScore();
  		secondG = true;
  	}
  }

  glyphTwoNotDoneChange(){
  	glyphTwoDoneCount=glyphTwoDoneCount+1;
  	console.log(glyphTwoDoneCount);
  	if(glyphTwoDoneCount%2==1){
  		glyphTwoDone=false;
  		console.log("unchecked");
  		console.log(glyphTwoDone);
  	}
  	else{
  		glyphTwoDone=false;
  		console.log("checked");
  		console.log(glyphTwoDone);
  	}
  }

  relicNotScored(){

  }
  zoneOne(){
  	score = score+10;
  	this.updateScore();
  	relicZoneData = 1;
  }
  zoneTwo(){
  	score = score+20;
  	this.updateScore();
  	relicZoneData = 2;
  }
  zoneThree(){
  	score = score+40;
  	this.updateScore();
  	relicZoneData = 3;
  }
  upright(){
  	score = score+15;
  	this.updateScore();
  	this.match.relicUpright = true;
  }
  notUpright(){
  	this.updateScore();
  	this.match.relicUpright = false;
  }

  updateScore(){
  	const preObject = document.getElementById('score');
  	var scoreString = score.toString()
  	preObject.innerText = scoreString;
  }

  safeZone(){
  	score = score+10;
  	this.updateScore();
  }
  notSafeZone(){

  }
  safeZoneTwo(){
  	score = score+10;
  	this.updateScore();
  }
  notSafeZoneTwo(){

  }

  glyphNumScore(numGlyphs){
  	console.log(numGlyphs);
  	score = score-numGlyphsSoFar;
  	var numGlyphsNumber = Number(numGlyphs);
  	var glyphScore = numGlyphsNumber*2;
  	score = score+glyphScore;
  	numGlyphsSoFar = glyphScore;
  	this.updateScore();
  	endGlyphs = numGlyphs;
  }

  rowNumScore(numRows){
  	console.log(numRows);
  	score = score-numRowsSoFar;
  	var numRowsNumber = Number(numRows);
  	var rowScore = numRowsNumber*10;
  	score = score+rowScore;
  	numRowsSoFar = rowScore;
  	this.updateScore();
  }

  colNumScore(numCols){
  	console.log(numCols);
  	score = score-numColsSoFar;
  	var numColsNumber = Number(numCols);
  	var colsScore = numColsNumber*20;
  	score = score+colsScore;
  	numColsSoFar = colsScore;
  	this.updateScore();
  }
  solved(){
  	score = score+30;
  	this.updateScore();
  }
  notSolved(){
  	this.updateScore();
  }

  balanced(){
  	score = score+20;
  	this.updateScore();
  }
  notbalanced(){
  	this.updateScore();
  }

  balancedTwo(){
  	score = score+20;
  	this.updateScore();
  }
  notbalancedTwo(){
  	this.updateScore();
  }

  save(){
  	var teamNumber=this.myteam.number;
  	this.match.total = score;
    var constantPart='/MatchStats/${auth.uid}';
    var finished=teamNumber+constantPart;
    if(firstG && secondG){
    	this.match.autoGlyph = 2;
    }
    else if(firstG && secondG == false){
    	this.match.autoGlyph = 1;
    }
    else if(firstG == false && secondG == true){
    	this.match.autoGlyph = 1;
    }
    else{
    	this.match.autoGlyph = 0;
    }
    this.match.relicZone = relicZoneData;
    this.match.numberGlyphs = endGlyphs;
    console.log("`" + finished + "`");
  	this.afAuth.authState.take(1).subscribe(auth=>{
  		this.afDatabase.list(eval("`" + finished + "`")).push(this.match);
  	})
  	this.toastCtrl.create({
        message: `Team Added To Log of Team ` + teamNumber + `, please visit superscoutportal.github.io to see your log`,
        duration: 10000,
      }).present();
  }

  	

}
