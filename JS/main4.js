let upbtn = document.getElementById("upbtn");

let navbar = document.getElementById("nav");

let navpic = document.getElementById("navpic")

window.addEventListener('scroll', function(){
    upbtn.style.display = window.scrollY > 30 ? 'block' : 'none';
    navbar.style.position = window.scrollY > 25 ? 'fixed': 'relative';
    navbar.style.top = '0';
    navbar.style.backgroundColor = window.scrollY > 20 ? 'grey' : '#0d6efd';
    if(this.window.scrollY > 20){
        navpic.setAttribute('src','../Images/15.png');
    }
    else{
        navpic.setAttribute('src','../Images/2.png');
    }
});

upbtn.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
});

let mbtn = document.getElementById('mbtn');

mbtn.addEventListener('click',()=>{

    if(document.getElementById('drop').style.display == 'block'){
        
        const animation = [
            { transform: "translateY(0px)" },
            { transform: "translateY(-200px)" },
        ];
        
        const duration = {
            duration: 500,
            iterations: 1,
        };

        document.getElementById('drop').animate(animation,duration);

        setTimeout(()=>{document.getElementById('drop').style.display = 'none'},501);

    }
    else
    {
        document.getElementById('drop').style.display = 'block'

        const animation = [
            { transform: "translateY(-200px)" },
            { transform: "translateY(0px)" },
        ];
        
        const duration = {
            duration: 500,
            iterations: 1,
        };

        document.getElementById('drop').animate(animation,duration);
    }
})