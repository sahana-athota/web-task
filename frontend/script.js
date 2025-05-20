/**async function fetchMails() {
  try {
    const response = await fetch("http://localhost:8000/api/mail/getAll");
    const mails = await response.json();
  } catch (error) {
    mailContainer.innerHTML = `<p>Error fetching mails: ${error.message}</p>`;
  }
}**/

//fetchMails();
const category=["primary","socials","promotions","updates"];
const mailContainer = document.getElementById("mailcontainer");
async function fetchMails(a) {
  try {
    
    const response = await fetch("http://localhost:8000/api/mail/getAll");
    const mails = await response.json();
    mailContainer.innerHTML = "";
    console.log(mails);
    mails.forEach(mail => {
        if(category[a]==mail.type){
        const mailElement = document.createElement("div");
        mailElement.classList.add("mail");
        const date = new Date(mail.createdAt);
        const formattedTime =date.toLocaleTimeString("en-GB", {
          hour: "2-digit", minute: "2-digit"
        });
        console.log(mail.sender,formattedTime)
        if(mail.status=="seen"){
          mailElement.innerHTML = `
            <a href="#" class="fill-div">
            <input class="select" type="checkbox" />
            <button class="star">⭐</button>
            <span class="mailsender"> ${mail.sender}</span>
            <span class="mailbody">${mail.body}</span>
            <span class="time">${formattedTime}</span>
            </a>
            
          `;
        }
        else{
          mailElement.innerHTML = `
            <a href="#" class="fill-div">
            <input class="select" type="checkbox" />
            <button class="star">⭐</button>
            <span class="mailsender" style="font-weight: bold;"> ${mail.sender}</span>
            <span class="mailbody" style="font-weight: bold;">${mail.body}</span>
            <div class="icons">
              <i class="icon copy" title="Copy"></i>
              <i class="icon delete" title="Delete"></i>
              <i class="icon mark" title="Mark as read"></i>
              <i class="icon snooze" title="Snooze"></i>
            </div>
            <span class="time" style="font-weight: bold;>${formattedTime}</span>
            </a>
          `;
        }
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
            // Remove active class from all buttons
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to the clicked button
            this.classList.add('active');
        });
    });
});