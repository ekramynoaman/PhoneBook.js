
//Global variables
var formDiv   = document.getElementById('formDiv');
var inputs    = document.getElementsByTagName('input');
var fullName  = document.getElementById('name');
var phone     = document.getElementById('phoneNum');
var email     = document.getElementById('emailAddress');
var btn       = document.getElementById('addContact');
var srchInput = document.getElementById('search');
var addNew    = document.getElementById('addBtn');
var srchBtn   = document.getElementById('srchBtn');
var tableBody = document.getElementById("table-body");
var contacts  = [];

//Display adding form
addNew.addEventListener('click', displayForm);

function displayForm(){

  formDiv.style.display = 'block';
}


// Hide adding form
function hideForm(){

  formDiv.style.display = 'none';
}

//add contact function
btn.addEventListener('click', addContact);
// store the contacts in local storage
window.onload=function()
{
  contacts=JSON.parse(localStorage.getItem('contacts'));
  if(contacts!==null){
    displayContact();
  }
  else{
    contacts=[];
  }

};

function addContact()
{
  var checkFeilds = fullName.value!="" && phone!="" && email!="";

  if(checkFeilds){
  var contact = {userName:fullName.value,userPhone:phone.value,
    userEmail:email.value};

    contacts.push(contact);
    localStorage.setItem("contacts",JSON.stringify(contacts));
    displayContact();
    clearForm();
    hideForm();
} else{
  alert('All feilds are requiared');
}

}

//display contacts in the table
function displayContact()
{
  var trs="";
  for(var i=0; i<contacts.length; i++)
  {
      trs += "<tr><td>"+ contacts[i].userName +"</td><td>"+ contacts[i].userPhone +"</td><td>"+ contacts[i].userEmail +'</td><td>                <button class="btn btn-danger delbtn" data-id="'+ i +'">Delete</button></td></tr>';

      tableBody.innerHTML = trs;
  }
}

// remove the contacts
tableBody.addEventListener('click', removeContact);

function removeContact(e)
{
  if (e.target.classList.contains('delbtn')){
      var delIndex = e.target.getAttribute('data-id');
      contacts.splice(delIndex, 1);
      localStorage.setItem("contacts",JSON.stringify(contacts));
      displayContact();
    }
}

// function to search
srchBtn.addEventListener('click', filterContact);

function filterContact(){
var res ="";
for (var i=0 ; i < contacts.length ; i++)
{
    if (contacts[i].userName == srchInput.value)
    {

        res += "<tr><td>"+ contacts[i].userName +"</td><td>"+ contacts[i].userPhone +"</td><td>"+ contacts[i].userEmail +'</td><td>                <button class="btn btn-danger delbtn" data-id="'+ i +'">Delete</button></td></tr>';

        tableBody.innerHTML = res;

    }
}
}


//clear form automaticlly
function clearForm()
{
  for ( i = 0; i < inputs.length; i++)
  {
    inputs[i].value= "";
  }

}


