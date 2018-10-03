function getData(){
    
    fetch('/users')
    .then( data => {return data.json()})
    .then( json => {
        console.log(json);
        json.forEach(item => {
            let itemElement = document.createElement("useritem");
            let name = document.createTextNode(item.UserName);
            itemElement.addEventListener('pointerover', e => {
                itemElement.innerHTML = "#" + item.UserColor;
            });
            itemElement.addEventListener('pointerleave', e => {
                itemElement.innerHTML = item.UserName;
            })
            itemElement.innerHTML = item.UserName;
            itemElement.style.backgroundColor = "#" + item.UserColor;
            document.getElementById("data").appendChild(itemElement);
        });
    });
}