import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[] = [];
  newMessage: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
        .pipe(
          tap(messages => {
            for (let i =0; i < MessagesComponent.length; i ++) {
              if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                this.userService.markAsRead(currentUserId, messages[i].id);
              }
            }
          })
        )
        .subscribe((messages) => {
          this.messages = messages;
        }, error => {
          this.alertify.error(error);
        });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      if (this.messages.length > 0) {
        this.messages.unshift(message);
      } else {
        this.messages.push(message);
      }
      this.alertify.success('Message sent');
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
