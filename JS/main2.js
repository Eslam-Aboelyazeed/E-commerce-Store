let fullname = document.getElementById('fullname');
let email = document.getElementById('email');
let pass = document.getElementById('pass');
let cpass = document.getElementById('cpass');

let wname = document.getElementById('wname');
let wemail = document.getElementById('wemail');
let wpass = document.getElementById('wpass');
let wcpass = document.getElementById('wcpass');

let namePattern = new RegExp(/^[a-z A-Z]{7,25}$/);
let emailPattern = new RegExp(/^[a-zA-Z]{6,20}[0-9]{0,3}@[a-zA-z]{3,7}\.[com]{3}$/);
let passPattern = new RegExp(/^[a-zA-Z0-9]{12,99}$/);

let contactbtn = document.getElementById('contactus');

let flag = true;

contactbtn.addEventListener('click', ()=>{

    flag = true;

    if(namePattern.test(fullname.value) == false){
        wname.style.display = 'block';
        flag = false;
    }
    else
    {
        wname.style.display = 'none';
    }

    if(emailPattern.test(email.value) == false){
        wemail.style.display = 'block';
        flag = false;
    }
    else
    {
        wemail.style.display = 'none';
    }

    if(passPattern.test(pass.value) == false){
        wpass.style.display = 'block';
        flag = false;
    }
    else
    {
        wpass.style.display = 'none';
    }

    if(cpass.value != pass.value){
        wcpass.style.display = 'block';
        flag = false;
    }
    else
    {
        wcpass.style.display = 'none';
    }

    if(flag){
        alert("We Will Get Back to you Soon")
    }
})

let upbtn = document.getElementById("upbtn");

let navbar = document.getElementById("nav");

let navpic = document.getElementById("navpic")

window.addEventListener('scroll', function(){
    upbtn.style.display = window.scrollY > 50 ? 'block' : 'none';
    navbar.style.position = window.scrollY > 50 ? 'fixed': 'relative';
    navbar.style.top = '0';
    navbar.style.backgroundColor = window.scrollY > 50 ? 'grey' : '#0d6efd';
    if(this.window.scrollY > 50){
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