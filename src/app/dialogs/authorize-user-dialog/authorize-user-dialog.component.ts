import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from '../../contracts/Role/list-Role';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from '../../base/base.component';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';
import { UserService } from '../../services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.scss'
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent>
 {
  constructor(
    dialogref: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeUserState |any,
    private roleService:RoleService,
    private userService:UserService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogref);
  }

  roles:{roles:List_Role[]};
  endpointRoles:{roles:string[]};
  selectedRoles:string[]
 async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinFade)
      this.roles=await this.roleService.getAllRoles();
      this.selectedRoles =  await this.userService.getRolesToUser(this.data,()=>this.spinner.hide(SpinnerType.BallSpinFade))
      console.log(this.endpointRoles.roles )
  }

  assignRoles(Roles:MatSelectionList){
    const selectedRoles =Roles.selectedOptions.selected.map(o=>o._elementRef.nativeElement.innerText)
    this.spinner.show(SpinnerType.BallSpinFade)
     this.userService.assignRoleToUser(this.data, selectedRoles,()=>{this.spinner.hide(SpinnerType.BallSpinFade)},err=>{})
  }
}

 export enum AuthorizeUserState{
  Yes,
  No
 }