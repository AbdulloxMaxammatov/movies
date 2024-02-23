let genres='';
let genres_select=document.querySelector(".genres-select");
let wrapper=document.querySelector(".wrapper");
let bookmarked_list=document.querySelector(".bookmarked_list");
let row=document.querySelector(".row");
let modal_img=document.querySelector("#modal-img");
let modal_cat=document.querySelector("#modal-cat");
let modal_rating=document.querySelector("#modal-rating");
let modal_year=document.querySelector("#modal-year");
let modal_lang=document.querySelector("#modal-lang");
let modal_time=document.querySelector("#modal-time");
let modal_plot=document.querySelector("#modal-plot");
let form=document.querySelector("form");

async function getGenre(){
    let res=await fetch("http://localhost:3030/movies",{
        method:"GET",
    });
    let nat=res.json();
    return nat;
};

getGenre().then((data)=>{
        data.map((item)=>{
            genres=genres+","+item.Genre;
            let card=document.createElement("div");
            card.classList.add("card","col-6","mb-3");
            let img=document.createElement("img");
            img.src=item.Poster;
            img.style="width:100%;height:300px";
            img.classList.add("card-img-top");
            card.append(img);
            let card_body=document.createElement("div");
            card_body.classList.add("card-body");
            let title=document.createElement("h2");
            title.classList.add("card-title");
            title.textContent=item.Title;
            let pElement=document.createElement("p");
            pElement.textContent=item.Year;
            pElement.classList.add("card-text");
            let pRatingElement=document.createElement("p");
            pRatingElement.textContent=item.imdbRating;
            pElement.classList.add("card-text");
            let pGenresElement=document.createElement("p");
            pGenresElement.textContent=item.Genre;
            pElement.classList.add("card-text");
            card_body.append(title,pElement,pRatingElement,pGenresElement);
            let card_footer=document.createElement("div");
            card_footer.classList.add("card-footer");
            let buttonT=document.createElement("a");
            buttonT.textContent="Trailer";
            buttonT.href=item.trailerLink;
            buttonT.classList.add("btn","btn-primary","me-2");
            let buttonM=document.createElement("button");
            buttonM.textContent="More Info";
            buttonM.classList.add("btn","btn-danger","me-2");
            buttonM.onclick=(e)=>moreInfo(e,item.id);
            buttonM.type="button";
            buttonM.setAttribute("data-bs-toggle","modal");
            buttonM.setAttribute("data-bs-target","#staticBackdrop");
            let buttonB=document.createElement("button");
            buttonB.textContent="Bookmarked";
            buttonB.classList.add("btn","btn-success");
            buttonB.onclick=(e)=>onBookmarked(e,item.id)
            card_footer.append(buttonT,buttonM,buttonB);
            card.append(card_body,card_footer);
            wrapper.append(card);
        })
        genres=genres.split(",")
        genres.splice(0,1);
        genres=genres.map((item)=>{
            return item.trim();
        })
       genres=genres.sort((a,b)=>{
        return a.localeCompare(b);

       }); 
       for (let i=0; i<genres.length; i++){
        let first=genres[i];
        if (first===genres[i+1]){
            genres.splice(i, 1);
            i--;
        }
    }
    genres.map((item)=>{
        let opt=document.createElement("option");
        opt.textContent=item;
        opt.value=item;
        genres_select.append(opt);
    })


        filteredArr.map((item)=>{
            let opt=document.createElement("option");
            opt.textContent=item;
            opt.value=item;
            genres_select.append(opt);
        })

})
function onBookmarked(e,id){
    fetch("http://localhost:3030/movies/"+id).then((res)=>{
        return res.json()
    }).then((data)=>{
        let card=document.createElement("div");
        card.classList.add("mb-3","w-100","border","border-1");
        let title=document.createElement("h3");
        title.textContent=data.Title;
        let button=document.createElement("button");
        button.textContent="Delete";
        button.classList.add("btn","btn-danger","ms-auto","d-block");
        button.onclick=function(){
            card.style="display:none"
        }
        card.append(title,button);
        bookmarked_list.append(card);
    })
}
function moreInfo(e,id){
    fetch("http://localhost:3030/movies/"+id).then(res=>res.json()).then((data)=>{
        modal_img.src=data.trailerPoster;
        modal_cat.innerHTML=`<strong>Category</strong> : ${data.Genre}`;
        modal_rating.innerHTML=`<strong>Rating</strong> : ${data.imdbRating}`;
        modal_year.innerHTML=`<strong>Year</strong> : ${data.Year}`;
        modal_lang.innerHTML=`<strong>Language</strong> : ${data.Language}`;
        modal_time.innerHTML=`<strong>Time</strong> : ${data.Runtime}`;
        modal_plot.innerHTML=`${data.Plot}`;
    })
}
form.onsubmit =(e)=>handleSubmit(e);
function handleSubmit(e){
    e.preventDefault();
    let name=e.target.children[0].value;
    let rating=e.target.children[1].value;
    let selectGenre=e.target.children[2].value;
    let selectRating=e.target.children[3].value;
    getGenre().then((data)=>{
        wrapper.innerHTML="";
        if(selectRating==="rate"){
            data=data.sort((a,b)=>{
                return Number(b.imdbRating)-Number(a.imdbRating);
            })
        }else if(selectRating==="rate-reverse"){
            data=data.sort((a,b)=>{
                return Number(a.imdbRating)-Number(b.imdbRating);
            })
        }else if(selectRating==="year"){
            data=data.sort((a,b)=>{
                return Number(b.Year)-Number(a.Year);
            })
        }else{
            data=data.sort((a,b)=>{
                return Number(a.Year)-Number(b.Year);
            })
        }


        data.map((item)=>{
            if(item.Title.includes(name) && item.imdbRating.includes(rating) && item.Genre.includes(selectGenre)){
                // genres=genres+","+item.Genre;
                let card=document.createElement("div");
                card.classList.add("card","col-6","mb-3");
                let img=document.createElement("img");
                img.src=item.Poster;
                img.style="width:100%;height:300px";
                img.classList.add("card-img-top");
                card.append(img);
                let card_body=document.createElement("div");
                card_body.classList.add("card-body");
                let title=document.createElement("h2");
                title.classList.add("card-title");
                title.textContent=item.Title;
                let pElement=document.createElement("p");
                pElement.textContent=item.Year;
                pElement.classList.add("card-text");
                let pRatingElement=document.createElement("p");
                pRatingElement.textContent=item.imdbRating;
                pElement.classList.add("card-text");
                let pGenresElement=document.createElement("p");
                pGenresElement.textContent=item.Genre;
                pElement.classList.add("card-text");
                card_body.append(title,pElement,pRatingElement,pGenresElement);
                let card_footer=document.createElement("div");
                card_footer.classList.add("card-footer");
                let buttonT=document.createElement("a");
                buttonT.textContent="Trailer";
                buttonT.href=item.trailerLink;
                buttonT.classList.add("btn","btn-primary","me-2");
                let buttonM=document.createElement("button");
                buttonM.textContent="More Info";
                buttonM.classList.add("btn","btn-danger","me-2");
                buttonM.onclick=(e)=>moreInfo(e,item.id);
                buttonM.type="button";
                buttonM.setAttribute("data-bs-toggle","modal");
                buttonM.setAttribute("data-bs-target","#staticBackdrop");
                let buttonB=document.createElement("button");
                buttonB.textContent="Bookmarked";
                buttonB.classList.add("btn","btn-success");
                buttonB.onclick=(e)=>onBookmarked(e,item.id)
                card_footer.append(buttonT,buttonM,buttonB);
                card.append(card_body,card_footer);
                wrapper.append(card);
           
            }
          

})
genres=genres.split(",")
genres.splice(0,1);
genres=genres.map((item)=>{
    return item.trim();
})
let filteredGenres=new Set(genres);
let filteredArr=Array.from(filteredGenres);
filteredArr.map((item)=>{
    let opt=document.createElement("option");
    opt.textContent=item;
    opt.value=item;
    genres_select.append(opt);
})

})};