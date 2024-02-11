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

let pr = document.getElementById('pr');

let pro;

function getdata(){
    fetch("http://localhost:3000/Products")
    .then((value)=>{
        let res = value.json();
        return res;
    })
    .then((data)=>{

        pro = data;

        let itm = window.sessionStorage.getItem('item');

        let type;

        let x;

        for(let i = 0; i < data.length; i++){

            if(data[i].id == itm){
                console.log(data[i]);

                let d = document.createElement('div');
                d.classList = "col-10 text-center py-3";

                d.setAttribute('id','it'+data[i].id);

                d.innerHTML = '<h6>'+data[i].name+'</h6><img src="'+data[i].imgurl+'" alt="product"><br><span>'+data[i].des+'</span><br><br><span>'+data[i].price+'$</span><br><button id="addtocart" class="mt-3 txt py-1 px-3 bg-info-subtle">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>';

                pr.appendChild(d);

                document.getElementById('addtocart').addEventListener('click',addToCart.bind(this,data[i].id));

                type = data[i].type;

                x = data[i].id;
            }

        }

        let cont = document.getElementById('cont');

        for(let i in data)
        {
            if(data[i].type == type && data[i].id != x){
                let div = document.createElement('div');

                div.classList = "col-sm-10 col-md-5 col-lg-3 text-center pb-5 ms-2 mt-4 product";
                div.style.position = 'relative';

                div.innerHTML = "<a class='lin' id='pn"+data[i].id+"' href='details.html'>"+data[i].name+"</a> <a id='pi"+data[i].id+"' href='details.html'><img src='"+data[i].imgurl+"' alt='product'></a><br><span style='position: absolute; left: 10%;'>"+data[i].price+"$</span><a class='lin cartadd' id='"+Number(data[i].id)+"' style='position: absolute; left: 85%; cursor: pointer;'><i class='fa-solid fa-cart-shopping'></i></a>";

                cont.appendChild(div);
                document.getElementById(data[i].id).addEventListener('click', addToCart.bind(this,data[i].id));

                document.getElementById('pn'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                document.getElementById('pi'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
            }

        }

    })
    .catch((error)=>{
        console.log(error);
    })
}

getdata();

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
})