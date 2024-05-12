import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }
  ngOnInit(): void {}

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.ballScaleMultiple);

    this.roleService.createRole(
      name.value,
      () => {
        this.hideSpinner(SpinnerType.ballScaleMultiple),
          this.alertify.message('Role başarıyla eklendi', {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight,
          });
        this.createdRole.emit(name.value);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
        setTimeout(() => {
          this.hideSpinner(SpinnerType.ballScaleMultiple);
        }, 1000);
      }
    );
  }
}
