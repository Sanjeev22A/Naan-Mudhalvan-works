function initializePopovers(){
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

const texts=[
    'Hello, I am Sanjeev A',
    'I am a passionate backend developer and', 'have experience working with Node.js,php and spring boot',
    'I am also well versed with networks and',' i am currently working in a B5G based network simulation project',
    'I am also a competitive programmer and',' have a good understanding of data structures and algorithms',
]
function customWriter(texts){
    let i=0,j=0;
    const speed=100;
    const element = document.getElementById('about-text');
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;
    
    const box=document.getElementById('Box');
    console.log(lineHeight);
    box.style.height=`${texts.length*lineHeight}`;
    
    const typeWriter=()=>{
        element.classList.remove('blinking');
        if(i<texts.length){
            if(j<texts[i].length){
                element.innerHTML+=texts[i].charAt(j);
                j++;
                setTimeout(typeWriter,speed);
            }else{
                element.classList.add("blinking");
                setTimeout(()=>{
                    element.innerHTML+="<br>";
                    j=0;
                    i++;
                    typeWriter();
                },1000);
            }
        }
    }
    typeWriter();
}


function resumeRedirect(){
    window.open("https://drive.google.com/file/d/1Nyx565dsUDayAYH9s6LY4XAmf5X2AnFi/view?usp=sharing");
}




function domContentLoader(){
    initializePopovers();
    customWriter(texts);
}

document.addEventListener('DOMContentLoaded', domContentLoader);