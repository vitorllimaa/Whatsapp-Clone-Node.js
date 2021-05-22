import {ClassEvent} from "../util/ClassEvent";
export class microphoneController extends ClassEvent{
   
   
    constructor(){

        super();

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{

            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);

        }).catch(err=>{
            console.error(err);
        });    
    
    }
    stop(){

        this._stream.getTracks().forEach(track => {
 
             track.stop();
             
         });
 
 
     }

     IsAvailable(){

        return this._available;

     }

     startRecorder(){

        if (this.IsAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if(e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e=>{

                let blob = new Blob(this._recordedChunks,{

                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

                console.log('file', file);

                let reader = new FileReader();


                reader.onload = e=>{

                    console.log('reader file', file);

                    let audio = new Audio(reader.result);

                    audio.play();
                }
            });

            this._mediaRecorder.start();
            this.startTime();

        }

     }

     stopRecorder(){

        
        if (this.IsAvailable()){

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
            
        }

     }

     startTime(){

        let start = Date.now();
    
        this._recordMicrophoneInterval = setInterval(() => {
            
            this.trigger('recordtimer', (Date.now() - start));
    
    
        }, 100);
    
      }

      stopTimer(){

        clearInterval(this._recordMicrophoneInterval);
      }
     

}