let is = document.getElementById('is');

let cobtn = document.getElementById('checkout');

let prod;

function getdata(){
    fetch("http://localhost:3000/Products")
    .then((value)=>{
        let res = value.json()
        return res
    })
    .then((data)=>{

        prod = data;

        let arr;

        if(window.localStorage.getItem('items') != null && window.localStorage.getItem('items') != ''){
            arr = window.localStorage.getItem('items').split(',');    
        }
        else
        {
            is.classList+=' text-center align-content-center';
            cobtn.style.display = 'none';
            is.innerHTML = '<div class="col-10"><img src="../Images/22.jpg"></img><br><h5>The Cart is Empty</h5></div>'
            document.getElementById('body').style.height = '100vh';
            return;
        }

        console.log(arr);
        console.log(data);
        for(let j = 0; j< arr.length; j++){
            for(let i = 0; i< data.length; i++){
                if(data[i].id == arr[j]){
                    console.log(data[i]);

                    let d1 = document.createElement('div');
                    d1.classList = "col-sm-5 col-lg-3 pt-4 mt-4";

                    d1.setAttribute('id','pro'+data[i].id);

                    d1.innerHTML = "<a href='details.html' id='in"+data[i].id+"'><img src='"+data[i].imgurl+"' alt='product' style='display: inline-block;'></a>";

                    let d2 = document.createElement('div');

                    d2.classList = "col-sm-5 col-lg-3 mt-5 pt-5 text-center";

                    d2.setAttribute('id','prod'+data[i].id);

                    d2.innerHTML = '<a href="details.html" id="ii'+data[i].id+'" class="pname" style="display: inline-block;">'+data[i].name+'</a><br><br><span>Quantity</span><br><button class="btn qb" id="less'+data[i].id+'">&lt;</button><span id="q'+data[i].id+'">1</span><button class="btn qb" id="more'+data[i].id+'">&gt;</button><br><span id="p'+data[i].id+'">'+data[i].price+'</span><span>$</span><br><br><button id="remove'+data[i].id+'" style="background-color: red; color: white;">Remove from cart</button>'

                    is.appendChild(d1);
                    is.appendChild(d2);

                    document.getElementById('remove'+data[i].id).addEventListener('click',removeelement.bind(this,data[i].id));
                    document.getElementById('less'+data[i].id).addEventListener('click',decreseq.bind(this,data[i].id,data[i].price));
                    document.getElementById('more'+data[i].id).addEventListener('click',increseq.bind(this,data[i].id,data[i].price));

                    document.getElementById('in'+data[i].id).addEventListener('click',openDetailsByName.bind(this,data[i].id));
                    document.getElementById('ii'+data[i].id).addEventListener('click',openDetailsByImg.bind(this,data[i].id));
                }
            }
        }

        if(is.children.length <= 4)
        {
            document.getElementById('body').style.height = '100vh';
        }else{
            document.getElementById('body').style.height = '100%';
        }

    })
    .catch((error)=>{
        console.log(error);
    })
}

getdata();

function removeelement(id){
    let arr;
    if(window.localStorage.getItem("items") == null){
        arr = [];
    }else{
        arr = window.localStorage.getItem("items").split(",");
    }

    let arr2 = [];

    for(let i = 0; i < arr.length; i++){
        if(arr[i] == id){
            arr2 = arr.filter(function(value,index,array){
                if(value != id){
                    return value;
                }
            })
        }
    }

    console.log(arr2);

    if(arr2.length == 1){
        window.localStorage.setItem("items",arr2[0]); 
    }else if(arr2.length == 0){
        window.localStorage.removeItem('items');
    }else{
        window.localStorage.setItem('items',arr2.join(','));
    }

    document.getElementById('pro'+id).remove();

    document.getElementById('prod'+id).remove();

    if(is.innerHTML == ''){
        is.classList+=' text-center align-content-center';
        cobtn.style.display = 'none';
        is.innerHTML = '<div class="col-10"><img src="../Images/22.jpg"></img><br><h5>The Cart is Empty</h5></div>'
        document.getElementById('body').style.height = '100vh';
    }

    if(is.children.length <= 4)
    {
        document.getElementById('body').style.height = '100vh';
    }

}

function increseq(id,price){
    let q = document.getElementById('q'+id);
    let p = document.getElementById('p'+id);

    let qv = Number(q.innerText);
    let pv = Number(p.innerText);


    qv++;
    pv+= price;

    q.innerText = qv;
    p.innerText = pv; 
}

function decreseq(id,price){
    let q = document.getElementById('q'+id);

    let p = document.getElementById('p'+id);


    let qv = Number(q.innerText);
    let pv = Number(p.innerText);

    if(qv-1 == 0){
        return;
    }

    qv--;
    pv-= price;
    q.innerText = qv;
    p.innerText = pv; 
}

cobtn.addEventListener('click',()=>{
    let arr = window.localStorage.getItem('items').split(',');
    let str = 'You purchased\n';
    let tprice = 0;
    for(let j = 0; j< arr.length; j++){
        for(let i = 0; i< prod.length; i++){
            if(prod[i].id == arr[j]){
                str+= prod[i].name +' ('+document.getElementById('q'+prod[i].id).innerText+')\n';
                tprice+= Number(document.getElementById('p'+prod[i].id).innerText);
            }
        }
    }

    window.localStorage.removeItem('items');

    is.innerHTML = '';

    alert(str+'Total Price = '+tprice+'$');

    if(is.innerHTML == ''){
        is.classList+=' text-center align-content-center';
        cobtn.style.display = 'none';
        is.innerHTML = '<div class="col-10"><img src="../Images/22.jpg"></img><br><h5>The Cart is Empty</h5></div>'
        document.getElementById('body').style.height = '100vh';
    }
})


let upbtn = document.getElementById("upbtn");

let navbar = document.getElementById("nav");

let navpic = document.getElementById("navpic")

window.addEventListener('scroll', function(){
    upbtn.style.display = window.scrollY > 30 ? 'block' : 'none';
    navbar.style.position = window.scrollY > 20 ? 'fixed': 'relative';
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