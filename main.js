
song="";
status="";
object=[];

function preload(){
song=loadSound("Alaram.mp3")
}

function setup(){
    canvas=createCanvas(300,300)
    canvas.center()

    video=createCapture(VIDEO)
    video.size(500,500)
    video.hide()

    
}

function modelLoaded(){
    console.log(" Model Loaded");
    status=true;
    
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status:detecting objects"
    object_name=document.getElementById("inpu").value
}

function gotresult(error,result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
        object=result;
    }
}

function draw(){
    image(video,0,0,300,300)
    
    if (status!= "" ){
        document.getElementById("status").innerHTML="Status: objects detected "
        objectDetector.detect(video,gotresult)

        r=random(255)
        g=random(255)
        b=random(255)

        for (i=0; i<object.length; i++){
            fill(r,g,b)
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            if(object[i].label==object_name){
                document.getElementById("result").innerHTML=object_name+' found'
                video.stop()
                objectDetector.detect(gotresult)
                
            }
            
            
        }

    }
}