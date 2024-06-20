import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalConfig } from '../../services/CommonAlerts';
import { CustomTranslateService } from '../../services/translate.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class SharedModalComponent {
  config: ModalConfig;

  constructor(
    private dialogRef: MatDialogRef<SharedModalComponent>,
    public translate: CustomTranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { config: ModalConfig }
  ) { 
    this.config = data.config;
  }

  public dismiss(): void {
    this.dialogRef.close();
  }
}
