const btnNewGoal = document.querySelector('#buttonNewGoal');
btnNewGoal.addEventListener('click', addNewGoal);
window.setInterval(borderColor, 1000);
function addNewGoal(){
    let pendingGoal = document.querySelector('.list-left > ul');
    let goal = document.querySelector('input');
    let li = document.createElement('li');
    li.className = "list-group-item li-left"
    // retrive text from input
    let span = document.createElement('span');
    span.innerText = goal.value;
    li.appendChild(span);
    // reset input
    goal.value = "";
    let div = document.createElement('div');
    div.className = 'd-grid gap-2 d-md-flex justify-content-md-end';
    // configure complete btn
    let btnCplt = document.createElement('button');
    btnCplt.type = 'button';
    btnCplt.className = 'btn btn-outline-success'
    btnCplt.innerHTML = '<i class=\'bi bi-check-circle-fill\'></i> Complete';
    btnCplt.onclick =  completeGoal;
    // configure delete button
    let btnDlt = document.createElement('button');
    btnDlt.type = 'button';
    btnDlt.className = 'btn btn-outline-danger'
    btnDlt.innerHTML = '<i class=\'bi bi-x-circle-fill\'></i> Delete';
    btnDlt.onclick = deleteList;
    //add elements DOM
    pendingGoal.appendChild(li)
    li.appendChild(div);
    div.appendChild(btnCplt);
    div.appendChild(btnDlt);
    
}

function completeGoal() {
    let completion = document.querySelector('.list-right > ul');
    let li = this.parentElement.parentElement;
    li.className = "list-group-item li-right"
    this.remove();
    completion.appendChild(li);
}

function deleteList(){
    this.parentElement.parentElement.remove()
}

function borderColor(){
    document.querySelector('.content').style.borderColor = `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`
}

function randomInt() {
    return Math.floor(Math.random()*256);
}