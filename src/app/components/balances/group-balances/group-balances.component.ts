import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-balances',
  templateUrl: './group-balances.component.html',
  styleUrls: ['./group-balances.component.css']
})
export class GroupBalancesComponent implements OnInit {

  constructor(private groupService: GroupService) {}
  groupId = 1; // set dynamically later
  balances: any[] = [];
  
  ngOnInit() {
    this.groupService.getGroupBalances(this.groupId).subscribe(data => {
      this.balances = data;
    });
  }

}
