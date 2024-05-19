import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { List_Role } from '../../contracts/Role/list-Role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss',
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
  constructor(
    dialogref: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeMenuState |any,
    private roleService:RoleService,
    private authorizationEndpointservice:AuthorizationEndpointService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogref);
  }

  roles:{roles:List_Role[]};
  endpointRoles:{roles:string[]};
  selectedRoles:string[]
 async ngOnInit() {
    
      this.roles=await this.roleService.getAllRoles();
      this.endpointRoles =  await this.authorizationEndpointservice.getRolesToEndpoint(this.data.code,this.data.menuName)
      console.log(this.endpointRoles.roles )
  }

  assignRoles(Roles:MatSelectionList){
    const selectedRoles =Roles.selectedOptions.selected.map(o=>o._elementRef.nativeElement.innerText)
    this.spinner.show(SpinnerType.BallSpinFade)
     this.authorizationEndpointservice.assignRoleEndpoint(selectedRoles,this.data.code,this.data.menuName,()=>{this.spinner.hide(SpinnerType.BallSpinFade)},err=>{})
  }
}
export enum AuthorizeMenuState {
  Yes,
  No,
}
