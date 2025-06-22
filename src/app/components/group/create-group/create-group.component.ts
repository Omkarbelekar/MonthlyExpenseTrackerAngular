import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  group: Group = {
    id: 0,
    name: '',
    createdByUserId: 1, // 🔥 Replace with actual logged-in user later
    createdAt: new Date().toString()
  };
  groups: any = [];
  users: any[] = [];
  GroupMembers: string[] = [];
  selectedUserId: string = '';
  constructor(private groupService: GroupService, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    this.getAllGroupData();
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  createGroup() {
    debugger;
    let sjdsjd = this.GroupMembers;
    if (this.group.name.trim() === '') {
      alert('Group name cannot be empty!');
      return;
    }
    else {
      this.groupService.createGroup(this.group).subscribe({
        next: response => {
          debugger;
          alert('Group created successfully!');
          this.router.navigate(['/create-group']); // <-- Redirect to dashboard
        },
        error: err => console.error('Login failed:', err)
      });
    }

  }
  getAllGroupData() {
    debugger;
    this.groupService.getAllGroups().subscribe({
      next: response => {
        debugger;
        this.groups = response;
      },
      error: err => console.error('Login failed:', err)
    });

  }
  addMember() {
    if (this.selectedUserId && !this.GroupMembers.includes(this.selectedUserId)) {
      this.GroupMembers.push(this.selectedUserId);
      this.selectedUserId = ''; // reset dropdown
    }
  }
  getUserName(id: string): string {
    const user = this.users.find(u => u.Id === id);
    return user ? user.Name : '';
  }

  removeMember(id: string) {
    this.GroupMembers = this.GroupMembers.filter(memberId => memberId !== id);
  }
  // Dummy handlers – replace with your actual logic
  editGroup(group: any) {
    // Populate form or route to edit page
    console.log('Editing group:', group);
  }

  deleteGroup(id: number) {
    // Call delete API and refresh group list
    console.log('Deleting group with ID:', id);
  }

}
