import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SetNameDialog } from '../../name/name.component';
import { ApiService } from '../../../services/api.service';

export interface DialogData {
  linkCode?: string;
}

@Component({
  selector: 'app-link-code',
  templateUrl: './link-code.component.html',
  styleUrls: ['./link-code.component.scss'],
})
export class LinkCodeComponent {
  constructor(public dialog: MatDialog, private apiService: ApiService) {}
  @Input() linkCode: string;

  editLinkCode(): void {
    const dialogRef = this.dialog.open(SetLinkCodeDialog, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.linkCode = result;
      this.apiService.setLinkCode(this.linkCode);
    });
  }
}

// Separate component for the name dialog

@Component({
  selector: 'set-link-code-dialog',
  templateUrl: 'set-link-code-dialog.html',
})
export class SetLinkCodeDialog {
  constructor(public dialogRef: MatDialogRef<SetLinkCodeDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
