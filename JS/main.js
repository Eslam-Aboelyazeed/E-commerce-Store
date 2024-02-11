let slider = document.getElementById("slider");
let sarr = [];

let pbtn = document.getElementById("prev");
let nbtn = document.getElementById("next");

let mdiv = document.getElementById('mdiv');

let upbtn = document.getElementById("upbtn");

let navbar = document.getElementById("nav");

let navpic = document.getElementById("navpic")

window.addEventListener('scroll', function(){
    upbtn.style.display = window.scrollY > 30 ? 'block' : 'none';
    navbar.style.position = window.scrollY > 20 ? 'fixed': 'relative';
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


//http://localhost:3000/Products

let con = document.getElementById('con');

let all = document.getElementById('all'); 
let a = document.getElementById('a');
let t = document.getElementById('t');
let l = document.getElementById('l');
let i = document.getElementById('i');

let pro;

fetch("http://localhost:3000/Products")
    .then((value)=>{
        let res = value.json()
        return res
    })
    .then((data)=>{
        console.log(data);
        pro = data;

        for(let i in data)
        {

            if(data[i].specialoffer){
                continue;
            }

            let div = document.createElement('div');

            div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
            div.style.backgroundColor = '#eee';
            div.style.position = 'relative';

            div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";

            con.appendChild(div);
            document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

            document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
            document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));

            sarr.push('<a id="si'+data[i].id+'" href="details.html" onclick="openDetailsByImg('+data[i].id+')"><img src="'+data[i].imgurl+'" alt="product"></a>');
        }

        mdiv.innerHTML = sarr[0];

        let spo = document.getElementById('sp');

        let flag = Math.random();

        if (flag < 0.5) {
            flag = 0;
        } else {
            flag = 1;
        }

        let countDownDate;

        for(let i in data)
        {
            if(data[i].specialoffer == true)
            {
                let div1 = document.createElement('div');
                div1.classList = "col-5 justify-content-center align-content-center mt-5";

                div1.innerHTML = '<h4 id="timer"></h4> <h3 class="mt-3">'+data[i].name+'</h3> <span class="mt-3">'+data[i].des+'</span> <p class="mt-3"><span style="text-decoration: line-through; color: red; font-size: larger;">'+data[i].oldprice+'$</span>&nbsp;&nbsp;&nbsp;<span style="color: green; font-size: larger;">'+data[i].price+'$</span></p> <a href="details.html" id="pn'+data[i].id+'"><button class="mt-2 py-2 px-3" id="sobtn" style="border-radius: 2em; color: white; background: linear-gradient(to right,#5677fc 0,#3fc7fd 50%,#5677fc 100%);">View Details</button></a>';
            
                let div2 = document.createElement('div');
                div2.classList = "col-5";

                div2.innerHTML = '<img src="'+data[i].imgurl+'" alt="product">';

                spo.appendChild(div1);
                spo.appendChild(div2);

                document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));

                // document.getElementById('timer').innerText = data[i].offerduration/60+":00:00";

                countDownDate = new Date(data[i].offerduration).getTime();

                let flag = Math.random();

                if (flag < 0.5) {
                    break;
                }
            }
        }

        let x = setInterval(function() {

        let now = new Date().getTime();

        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerText = days + ":" + hours + ":"
        + minutes + ":" + seconds;

        if (distance < 0) {
            clearInterval(x);
            spo.innerHTML = "<h3>Special Offers will be available soon</h3>";
        }
        }, 1000);

        x();
        // setInterval(()=>{
        //     let timer = document.getElementById('timer'); 
        //     let time = timer.innerText;
        
        //     let tarr = time.split(":");

        //     if((tarr[0] == '00' || tarr[0] == '0') && (tarr[1] == '00' || tarr[1] == '0') && (tarr[2] == '00' || tarr[2] == '0')){
        //         document.getElementById('so').innerHTML = '';
        //     }
        
        //     if(tarr[2] == '00' || tarr[2] == '0'){
        //         tarr[2] = 59;
        //         if(tarr[1] == '00' || tarr[1] == '0'){
        //             tarr[1] = 59;
        //             tarr[0] = Number(tarr[0])-1;
        //         }else{
        //             tarr[1] = Number(tarr[1])-1;
        //         }
        //     }else{
        //         tarr[2] = Number(tarr[2])-1;       
        //     }

        
        //     timer.innerText = tarr.join(':');
        // },1000);

        all.onclick = function(data){
            con.innerHTML = '';
            
            for(let i in data){
                let div = document.createElement('div');

                div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                div.style.backgroundColor = '#eee';
                div.style.position = 'relative';

                div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";
                con.appendChild(div);

                document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));

            }
            
        }.bind(this,data)

        a.onclick = function(data){
            con.innerHTML = '';

            for(let i in data)
            {
                if(data[i].type == 'android'){
                    let div = document.createElement('div');
        
                    div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                    div.style.backgroundColor = '#eee';
                    div.style.position = 'relative';
        
                    div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";
                    con.appendChild(div);

                    document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                    document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                    document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
                }
            }
        }.bind(this,data)

        t.onclick = function(data){
            con.innerHTML = '';

            for(let i in data)
            {
                if(data[i].type == 'tablet'){
                    let div = document.createElement('div');
        
                    div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                    div.style.backgroundColor = '#eee';
                    div.style.position = 'relative';
        
                    div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";
                    con.appendChild(div);

                    document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                    document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                    document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
                }
            }
        }.bind(this,data)

        l.onclick = function(data){
            con.innerHTML = '';

            for(let i in data)
            {
                if(data[i].type == 'laptop'){
                    let div = document.createElement('div');
        
                    div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                    div.style.backgroundColor = '#eee';
                    div.style.position = 'relative';
        
                    div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";
                    con.appendChild(div);

                    document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                    document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                    document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
                }
            }
        }.bind(this,data)

        i.onclick = function(data){
            con.innerHTML = '';

            for(let i in data)
            {
                if(data[i].type == 'iphone'){
                    let div = document.createElement('div');
        
                    div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                    div.style.backgroundColor = '#eee';
                    div.style.position = 'relative';
        
                    div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a><a id='pi"+data[i].id+"' href='details.html'><img class='m-3' style='border-radius: 10%;' src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";
                    con.appendChild(div);

                    document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                    document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                    document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
                }
            }
        }.bind(this,data)


        nbtn.addEventListener('click',()=>{

            const animation1 = [
                { opacity:'100%' },
                { opacity:'0%' },
            ];
            
            const duration1 = {
                 duration: 500,
                iterations: 1,
            };
    
            mdiv.children[0].animate(animation1,duration1);

            setTimeout(()=>{
                for(let j = -1; j < sarr.length; j++){
                    if(mdiv.innerHTML == sarr[j]){
                        if(j+1 == sarr.length){
                            j = -1;
                        }
                        mdiv.innerHTML = sarr[j+1];
                        break;
                    }
                }

                
                const animation2 = [
                    { opacity:'0%' },
                    { opacity:'100%' },
                ];
                
                const duration2 = {
                    duration: 500,
                    iterations: 1,
                };
    
                mdiv.children[0].animate(animation2,duration2);

            },501);

        })
        
        pbtn.addEventListener('click',()=>{

            const animation1 = [
                { opacity:'100%' },
                { opacity:'0%' },
            ];
            
            const duration1 = {
                 duration: 500,
                iterations: 1,
            };
    
            mdiv.children[0].animate(animation1,duration1);

            setTimeout(()=>{
                for(let j = sarr.length; j > -1; j--){
                    if(mdiv.innerHTML == sarr[j]){
                        if(j-1 == -1){
                            j = sarr.length;
                        }
                        mdiv.innerHTML = sarr[j-1];
                        break;
                    }
                }

                const animation2 = [
                    { opacity:'0%' },
                    { opacity:'100%' },
                ];
                
                const duration2 = {
                    duration: 500,
                    iterations: 1,
                };
    
                mdiv.children[0].animate(animation2,duration2);

            },501);

        })
        
        setInterval(()=>{

            const animation1 = [
            { opacity:'100%' },
            { opacity:'0%' },
            ];
        
            const duration1 = {
                duration: 500,
                iterations: 1,
            };

            mdiv.children[0].animate(animation1,duration1);

        
            setTimeout(()=>{
                for(let j = -1; j < sarr.length; j++){
                    if(mdiv.innerHTML == sarr[j]){
                        if(j+1 == sarr.length){
                            j = -1;
                        }
                        console.log(sarr);

                        mdiv.innerHTML = sarr[j+1];
                        break;
                    }
                }

                const animation2 = [
                { opacity:'0%' },
                { opacity:'100%' },
                ];
            
                const duration2 = {
                    duration: 500,
                    iterations: 1,
                };

                mdiv.children[0].animate(animation2,duration2);

            },500);


            
        },5000)
    })
    .catch((error)=>{
        console.log(error);
    })

function addToCart(id){
    console.log(pro);
    let arr;
    if(window.localStorage.getItem("items") == null){
        arr = [];
    }else{
        arr = window.localStorage.getItem("items").split(",");
    }

    for(let j = 0; j < arr.length; j++){
        if(arr[j] == id){
            for(let i in pro)
            {
                if(id == pro[i].id){
                    alert(pro[i].name+" is already in your cart");
                }
            }
            return;
        }
    }

    arr.push(id)

    console.log(id);

    if(arr.length == 1){
        window.localStorage.setItem("items",arr[0]); 
    }else{
        window.localStorage.setItem("items",arr.join(',')); 
    }

    for(let i in pro)
    {
        if(id == pro[i].id){
            alert(pro[i].name+" has been added to your cart");
        }
    }
}

function openDetailsByName(id){
    window.sessionStorage.setItem('item',id);
}

function openDetailsByImg(id){
    window.sessionStorage.setItem('item',id);
}

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

});