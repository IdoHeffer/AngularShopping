import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/Friend';
import { FriendsService } from 'src/app/services/FriendsService';


@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    public friends: Friend[];
    public isShowAllfriends: boolean;
    public byName:string;
    public displayedFriend:Friend;



    //   constructor(private userService:UserService) { }
    constructor(private friendsService: FriendsService) {
        this.friends = [];
        this.byName = "";
        this.displayedFriend
     }

    ngOnInit() {
        this.isShowAllfriends = true;
        let observable = this.friendsService.getAllFriends();
        observable.subscribe(friendsList => {
            this.friends = friendsList;
            // console.error(this.coupons);
        }, error => {
            alert('Failed to get friends ' + JSON.stringify(error));
        });

    }

    public showfriend(friend: Friend) {
        // Debugging using printing the object value in the browser's console
        console.log(friend);
        this.isShowAllfriends = false;
        this.displayedFriend = friend;
    }

    public showfriends(){
        this.isShowAllfriends = true;
    }

}
