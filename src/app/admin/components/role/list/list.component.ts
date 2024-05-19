import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../../../services/common/dialog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { RequestParameters } from '../../../../services/common/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { List_Role } from '../../../../contracts/Role/list-Role';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private roleService:RoleService,
    private aletifyService: AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }
  ngAfterViewInit(): void {
    
  }
  displayedColumns: string[] = [
    'name',
    'edit',
    'delete'
  ];
 

  dataSource: MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   async getRoles(){
    this.showSpinner(SpinnerType.SquareSpin);
    const allRoleResponse:{totalRoleCount:number,roles:List_Role[]} = await this.roleService.getRoles(
      this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      () => this.hideSpinner(SpinnerType.SquareSpin),
      () =>{ 
        this.hideSpinner(SpinnerType.SquareSpin),
        this.aletifyService.message("Roller Listelenemedi", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      })}
       
    );
    console.log(allRoleResponse)

    this.dataSource = new MatTableDataSource<List_Role>(allRoleResponse.roles);
    this.paginator.length=allRoleResponse.totalRoleCount
    
  }



  async pageChanged(){
    await this.getRoles()
  }
  async ngOnInit() {
   await  this.getRoles()
  }


  
}
