import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService, UserData} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any[] = [
    {
      'url': 'https://scontent-cdt1-1.xx.fbcdn.net/v/t15.5256-10/s552x414/143065403_10161032404228298_5792640115134947626_n.jpg?_nc_cat=103&ccb=2&_nc_sid=1055be&_nc_ohc=TIiZWj-MlW4AX8pxW5e&_nc_ht=scontent-cdt1-1.xx&oh=616438a30c3bbfe4248793bd9c8ef93c&oe=604768BC',
      'avatar': 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-1/cp0/p60x60/80839451_10159416621083298_220864728941985792_n.jpg?_nc_cat=1&ccb=2&_nc_sid=1eb0c7&_nc_ohc=H0SH4uAfpzIAX_sKCt3&_nc_ht=scontent-cdg2-1.xx&tp=27&oh=0e0493cfc0dac4902f5546943dbdcbe0&oe=60470E82',
      'title': 'PSG'
    },
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
   
  ];
  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;

  constructor(private postService: PostService,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.subs.push(this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
    }));

    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));

  }

  postMessage(form: NgForm): void {
    const {message} = form.value;
    this.postService.postMessage(message,
      `${this.user.firstName} ${this.user.lastName}`,
      {
        avatar: this.user.avatar,
        lastName: this.user.lastName,
        firstname: this.user.firstName
      },
    );
    form.resetForm();
  }

  logout(): void {
    this.authService.Logout();
  }
}