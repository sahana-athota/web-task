//fetchMails();
var categ=0;
const category=["primary","socials","promotions","updates"];
const mailContainer = document.getElementById("mailcontainer");
async function fetchMails(a) {
  try {
    categ=a;
    const response = await fetch("http://localhost:8000/api/mail/getAll");
    const mails = await response.json();
    mailContainer.innerHTML = "";
    mails.forEach(mail => {
        if(category[a]==mail.type){
        const mailElement = document.createElement("div");

        var star='';
        if(mail.starred){star='active';}
        else{star=''};

        var stat='';
        if(mail.status=='unseen'){stat="style=\"font-weight: bold;\"";}
        else{stat='';}

        mailElement.classList.add("mail");
        const date = new Date(mail.createdAt);
        const formattedTime =date.toLocaleTimeString("en-GB", {
          hour: "2-digit", minute: "2-digit"
        });


        mailElement.innerHTML = `
          <a class="fill-div">
          
          <input class="select" type="checkbox" />
          
          <button name="${mail._id}" data-acti="star" class="star ${star}" onclick="action(this)">★</button>
          <button class="arro"><img src="icons/arro.png"></button>
          <span class="mailsender" ${stat}> ${mail.sender}</span>
          <span class="mailbody" ${stat}>${mail.body}</span>
          <div class="time-container">
            <span class="time" ${stat}>${formattedTime}</span>
            <div class="action-icons">
                    <span class="action-icon material-icons"><img src="icons/archive.png"></span>
                    <button name="${mail._id}" data-acti="del" class="del action-icon material-icons" onclick="action(this)"><img src="icons/delete.png"></button>
                    <button name="${mail._id}" data-acti="mar" class="mar action-icon material-icons" onclick="action(this)"><img src="icons/markasread.png"></button>
                    <span class="action-icon material-icons"><img src="icons/clock.png"></span>
              </div>
            </div>
          </a>`;
        
        mailContainer.appendChild(mailElement);
      }

      });
    

  } catch (error) {
    mailContainer.innerHTML = `<p>Error fetching mails: ${error.message}</p>`;
  }
}

window.onload = fetchMails(0);




function toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const content = document.getElementById("mainContent");
      sidebar.classList.toggle("active");
      content.classList.toggle("shifted");
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cat');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});


function action(ele){
  const id=ele.name;
  const act=ele.dataset.acti;
  if(act=='del'){
        fetch(`http://localhost:8000/api/mail/delete/${id}`, { 
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        .then(response => response.json())
        .then(data => {
            fetchMails(categ);
        })
        .catch(error => {
            console.error('Error deleting mail:', error);
        });
    }
    else if (act=='mar'){
      fetch('http://localhost:8000/api/mail/markasread', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
      })
      .then(res => res.json())
      .then(data => {
          fetchMails(categ);
      })
      .catch(err => console.error(err));
    }
    else{
      ele.classList.toggle('active');
      fetch('http://localhost:8000/api/mail/star', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
      })
      .then(res => res.json())
      .then(data => {
          fetchMails(categ);
      })
      .catch(err => console.error(err));
    }
    
}




