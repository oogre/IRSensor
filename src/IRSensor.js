/*----------------------------------------*\
  IRSensor - IRSensor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-07-14 12:16:11
  @Last Modified time: 2020-07-16 15:25:56
\*----------------------------------------*/

// Dependency : 
// 	* Node.js : https://nodejs.org/en/
// 	* p5-serial : sudo npm install -g p5.serialserver
// Run : 
// 	* node startserver.js

const DEBUG = false;
//const currentPage = 'app';
const ARDUINO_NAME = "/dev/tty.usbmodem14201"
const serial = new p5.SerialPort();
var ptfsUserDetected = false;

let ptfscIRSensor = function(p){
	p.setup = function(){
		p.noCanvas();
		serial.list();
		serial.on('connected', ()=>console.log("We are connected!"));
		serial.on('error', error => console.log(error));
		serial.on('list', serialList => {
			const selectWrapper = document.createElement("div");
			selectWrapper.classList.add("selectWrapper");
			const select = document.createElement("select");
			serialList.map(arduinoName => {
				const option = document.createElement("option");	
				option.value = arduinoName;
				option.innerText = arduinoName;
				select.appendChild(option);
			})
			selectWrapper.appendChild(select);
			const button = document.createElement("button");
			button.innerText = "connect";
			button.addEventListener("click", ()=>{
				serial.open(select.value);
			});
			selectWrapper.appendChild(button);
			document.body.appendChild(selectWrapper);
			if(serialList.includes(ARDUINO_NAME)){
				serial.open(ARDUINO_NAME);
			}
		});
		serial.on('open', ()=>{
			console.log("Serial Port is open!")
			document.querySelectorAll(".selectWrapper")
			.forEach(selectWrapper => {
				selectWrapper.parentNode.removeChild(selectWrapper);
			})
		});
		serial.on('data', ()=>{
			const input = serial.read();
			console.log(input);
			if(DEBUG){
				switch(input){
					case 0 : document.body.style.backgroundColor = "#000" ; break;
					case 1 : document.body.style.backgroundColor = "#fff" ; break;
				}	
			}else{
				/*
					>>> VIDEO TRIGGER <<< 
				*/
				ptfsUserDetected = input == 1;
			}
		});
	}
	p.draw = function(){

	}
}

if(currentPage == 'app') {
    new p5(ptfscIRSensor);
}
