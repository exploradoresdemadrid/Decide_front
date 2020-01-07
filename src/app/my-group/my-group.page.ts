import { Component, OnInit } from '@angular/core';
import { Group } from 'src/entities/group';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.page.html',
  styleUrls: ['./my-group.page.scss'],
})
export class MyGroupPage {

user ={
 img : 'http://kimball.exploradoresdemadrid.org/wp-content/uploads/sites/5/2019/01/cropped-logo-kimball.png',
 id:'1',
 name:'Kimball 110',
 number: 120,
 available_votes: 5
}

  constructor(
    private authService : AuthService
  ) { }

 ionViewWillEnter(){
  //  this.authService.getCurrentGroup()
  //  this.user = JSON.parse(localStorage.getItem('groupDecide'))
 }

}
