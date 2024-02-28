let songindex=0;
let audioelement=new Audio('1.mp3');
let Masterplay=document.getElementById('play');
let myprogressbar=document.getElementById('mybar');
let gif=document.getElementById('gif');
let songitem=Array.from(document.getElementsByClassName('songItem'));
let miniplay=Array.from(document.getElementsByClassName('playclass'));
let mastersongname=document.getElementById('mastersongname');
let songs=[
    {songName:"Tere Bin",filepath:"1.mp3",coverpath:"cover1.jpg"},
    {songName:"Kesariya",filepath:"2.mp3",coverpath:"cover2.jpg"},
    {songName:"Dil nae yae kha",filepath:"3.mp3",coverpath:"cover3.jpg"},
    {songName:"Dil Lutiya",filepath:"4.mp3",coverpath:"cover4.jpg"},
    {songName:"one direction",filepath:"5.mp3",coverpath:"cover5.jpg"}
]
songitem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName('songnames')[0].innerText=songs[i].songName;
});
//now we will listen to events
//in js for different functions there are dfferent events
//here we will use the time update event

//the playpauseclip
Masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        Masterplay.src="pause.jpg";
        gif.style.opacity=1;
    }
    else
    {
        audioelement.pause();
        Masterplay.src="../playbutton.jpg";
        gif.style.opacity=0;
    }
})
audioelement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //for updating bar
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    console.log(progress);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    audioelement.currentTime=myprogressbar.value*audioelement.duration/100;//as the myprogessbar.value is in percentage we want it in minutes// 
})
songitem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName('songnames')[0].innerText=songs[i].songName;
});
miniplay.forEach((element)=>
{
    element.addEventListener('click',()=>{
        console.log(element);
        songindex=parseInt(element.id);
        if(audioelement.paused||audioelement.currentTime<=0){
            mastersongname.innerText=songs[songindex-1].songName;
            audioelement.currentTime=0;
            audioelement.src=songindex+'.mp3';
            audioelement.play();
            element.src='pause.jpg';
            Masterplay.src='pause.jpg';
        }
        else
        {
            audioelement.pause();
            element.src='../playbutton.jpg';
            Masterplay.src='../playbutton.jpg';
        }
    })  
});
document.getElementById('back').addEventListener('click',()=>{
    if(audioelement.paused|| audioelement.currentTime<=0){
        console.log(songindex);
        songindex+=1;
        audioelement.currentTime=0;
    }
    else if(songindex>=5)
    {
        mastersongname.innerText=songs[0].songName;
        songindex=1;
        audioelement.src=(songindex)+'.mp3';
        audioelement.play();
    }
    else
    {
        mastersongname.innerText=songs[songindex].songName;
        console.log(songindex);
        audioelement.currentTime=0;
        audioelement.src=(songindex+1)+'.mp3';
        audioelement.play();
        songindex+=1;
    }
});
document.getElementById('fast').addEventListener('click',()=>{
    if(audioelement.paused|| audioelement.currentTime<=0){
        console.log(songindex);
        songindex-=1;
        audioelement.currentTime=0;
    }
    else if(songindex<0)
    {
        songindex=4;
        mastersongname.innerText=songs[songindex].songName;
        audioelement.src=(songindex+1)+'.mp3';
        audioelement.play();
    }
    else
    {
        console.log(songindex+1);
        mastersongname.innerText=songs[songindex].songName;
        audioelement.currentTime=0;
        audioelement.src=(songindex+1)+'.mp3';
        audioelement.play();
        songindex-=1;
    }
});