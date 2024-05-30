import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//steps

//render chat templates to the DOM
//clear the list of chats (when the room changes)

export class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = "";
  }

  render(data) {
    const when = dayjs(data.created_at.toDate()).format(
      "ddd, MMM D, YYYY h:mm A"
    );

    const html = `
        <li class = "list-group-item">
           <span class="username"> ${data.username}: </span>
           <span class="message"> ${data.message} </span>
           <div class ="time"> ${when} </div>
        </li>
          `;

    this.list.innerHTML += html;
  }
}
