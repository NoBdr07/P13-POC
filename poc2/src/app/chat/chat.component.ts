import { Component, OnInit } from '@angular/core';
import Talk from 'talkjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private selectedUser: string = '';
  private session: Talk.Session | null = null;

  client = new Talk.User({
    id: 'client',
    name: 'Client',
    email: 'client@mail.com',
    photoUrl: 'https://cdn-icons-png.flaticon.com/512/126/126379.png',
    welcomeMessage: 'Hi',
  });

  support = new Talk.User({
    id: 'support',
    name: 'Support',
    email: 'support@mail.com',
    photoUrl:
      'https://user.oc-static.com/upload/2022/10/31/16672296983742_P12_banner.png',
    welcomeMessage: 'Hi there! How can I help you?',
  });

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUser();

    if (typeof window !== 'undefined') {
      Talk.ready.then(() => {
        const userId =
          this.selectedUser === 'Client' ? this.client : this.support;
        const other =
          this.selectedUser === 'Client' ? this.support : this.client;
        const me = new Talk.User(userId);

        this.session = new Talk.Session({
          appId: 'thWnDzi0',
          me: me,
        });

        const conversation =
          this.session.getOrCreateConversation('new_conversation');
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const chatbox = this.session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(document.getElementById('talkjs-container'));
      });
    }
  }
}
