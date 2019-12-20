const content = document.getElementById('mainContent');
var formName = document.getElementById("formName");
var email = document.getElementById("formEmail");
var message = document.getElementById("formMessage");
const form = document.getElementById("form");
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var messageError = document.getElementById("messageError");
const sendData = document.getElementById("sendData");
const contactPage = document.getElementById("contactPage");
const defaultContactPage = contactPage.innerHTML;
function PressButton(id)
{
    switch (id)
    {
        case "Home":
            content.className="start"
            break;
        case "Projects":
            content.className="middle"
            break;
        case "Contact":
            content.className="end"
            break;
    }
}
function BackToForm(dontClear)
{
    let tempName = formName.value;
    let tempEmail = email.value;
    let tempMessage = message.value;
    contactPage.innerHTML = defaultContactPage;
    formName = document.getElementById("formName");
    email = document.getElementById("formEmail");
    message = document.getElementById("formMessage");
    if (dontClear)
    {
        formName.value = tempName;
        email.value = tempEmail;
        message.value = tempMessage;
    }
    nameError = document.getElementById("nameError");
    emailError = document.getElementById("emailError");
    messageError = document.getElementById("messageError");
}

document.body.addEventListener('submit', e => {
    let error = false;
    nameError.innerText = '';
    emailError.innerText = '';
    messageError.innerText = '';
    if (formName.value === '' || formName.value == null)
    {
        nameError.innerText = "Name is required."
        error = true;
    }
    if (!email.value.includes("@") || email.value === '' || email.value == null)
    {
        emailError.innerText = "Valid email address is required."
        error = true;
    }
    if (message.value === '' || message.value == null)
    {
        messageError.innerText = "Please provide a message."
        error = true;
    }
    e.preventDefault()
    if (error)
    {
        return;
    }
    
    let formData = new FormData();
    formData.append('name', formName.value);
    formData.append('email', email.value);
    formData.append('message', message.value);
    
    sendData.style.visibility = "visible";

    fetch ('https://bicentennial-accura.000webhostapp.com/contact.php', 
    {method:'post', 
    body: formData})
    .then(resp =>{ 
        if (!resp.ok)
        {
           contactPage.innerHTML = '<p class="homeText" id="nameTitle">Error sending form</p> <p class="homeText">Unfortunately there was an error sending the form. You can send me an email <br> instead at <a class="homeText" href="mailto:santeri.hakoniemi@gmail.com">santeri.hakoniemi@gmail.com</a> or press the button below to resend the form.</p><a id="emailMe" style="margin-top:15px" onClick="BackToForm(true)">Back to form</a>';
            throw Error(resp.text);
        }
        return resp.text})
    .then(contactPage.innerHTML = '<p class="homeText" id="nameTitle">Message sent successfully!</p> <p class="homeText">Thank you for contacting me. I will be responding to you shortly.</p><a id="emailMe" style="margin-top:15px" onClick="BackToForm(false)">Back to form</a>')

});
document.body.addEventListener('reset', e => {
    nameError.innerText = '';
    emailError.innerText = '';
    messageError.innerText = '';
})

