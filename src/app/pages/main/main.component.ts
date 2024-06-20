import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CustomTranslateService } from '../../services/translate.service';
import { Language } from '../../services/language.model';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { BillereService } from './main.service';
import { GeolocationService } from '../../services/location.service';
import { NotificationService } from '../../services/Notification.service';
import { ErrorModalConfig, ModalConfig } from '../../services/CommonAlerts';
import { SharedModalComponent } from '../shared-modal/shared-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public deviceId!: string;
  public selectedEmojiIndex: number | null = null;
  public selectedRating: number | null = null;
  public notes: string = '';
  public show: boolean = false;
  public id!: string;
  public userLocation: { lat: string, lng: string } | null = null;

  public emojis = [
    { src: '../../../assets/img/3.svg', alt: 'angry' },
    { src: '../../../assets/img/2.svg', alt: 'neutral' },
    { src: '../../../assets/img/1.svg', alt: 'very satisfied' }
  ];

  public ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private clickSound: HTMLAudioElement;
  private clickSoundNumber: HTMLAudioElement;
  private complete: HTMLAudioElement;
  public img!: string;
  public titleName!: string;
  public titleNameAr!: string;
  constructor(
    public translate: CustomTranslateService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private service: BillereService,
    private dialog: MatDialog,
    private toast: NotificationService,
    private geolocationService: GeolocationService // Inject GeolocationService
  ) {
    this.changeLanguage(1);

    // Preload the click sound
    this.clickSound = new Audio('../../../assets/sound/Pop Up Sound Effect.mp3');
    this.clickSound.load();
    this.clickSoundNumber = new Audio('../../../assets/sound/Hit.mp3');
    this.clickSoundNumber.load();
    this.complete= new Audio('../../../assets/sound/interface.mp3');
    this.complete.load();
  }

  public isAra(): boolean {
    return this.translate.isAr();
  }

  ngOnInit(): void {
    this.id = this.getRequestParams();
    this.deviceId = this.deviceService.getDeviceId();
    this.loadInfo(this.id);
    this.getUserLocation();
  }

  private getRequestParams(): string {
    return (typeof URLSearchParams !== 'undefined' && window.location.href.includes('id=')) ? (new URLSearchParams(window.location.search)).get('id') ?? '' : '';
  }

  public async changeLanguage(lang: number) {
    const selectedLanguage = lang === 2 ? Language.English : Language.Arabic;
    this.translate.changeLanguage(selectedLanguage);
  }


  private playClickSound() {
    if (this.clickSound.readyState >= 2) { // Check if the audio is ready to play
      this.clickSound.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    } else {
      this.clickSound.addEventListener('canplaythrough', () => {
        this.clickSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }, { once: true });
    }
  }
  private playClickratingSound() {
    if (this.clickSoundNumber.readyState >= 2) { // Check if the audio is ready to play
      this.clickSoundNumber.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    } else {
      this.clickSoundNumber.addEventListener('canplaythrough', () => {
        this.clickSoundNumber.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }, { once: true });
    }
  }
  private playCompleteSound() {
    if (this.complete.readyState >= 2) { // Check if the audio is ready to play
      this.complete.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    } else {
      this.complete.addEventListener('canplaythrough', () => {
        this.complete.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }, { once: true });
    }
  }

  public getColorClass(rating: number): string {
    if (rating <= 3) {
      return 'color-1';
    } else if (rating <= 7) {
      return 'color-2';
    } else {
      return 'color-3';
    }
  }
  
  public getSelectedClass(rating: number): string {
    if (this.selectedRating === rating) {
      return `selectedimg-${this.getRatingClassIndex(rating)}`;
    }
    return '';
  }
  
  private getRatingClassIndex(rating: number): number {
    if (rating <= 3) {
      return 1;
    } else if (rating <= 7) {
      return 2;
    } else {
      return 3;
    }
  }
  
  public selectRating(rating: number): void {
    this.selectedRating = rating;
    this.playClickratingSound();
  }
  
  public getSelectedEmojiClass(index: number): string {
    return this.selectedEmojiIndex === index ? `selectedimg-${index + 1}` : '';
  }
  
  public selectEmoji(index: number): void {
    this.selectedEmojiIndex = index;
    this.playClickSound();
  }

  public get isFormValid(): boolean {
    return this.selectedEmojiIndex !== null && this.selectedRating !== null;
  }

  public submit() {
    // Create the review object
    const review = {
        notes: this.notes,
        deviceId: this.deviceId,
        smileyAnswer: (this.selectedEmojiIndex ?? -1) + 1,
        ratingAnswer: this.selectedRating,
        cardId: this.id,
        lat: this.userLocation?.lat,
        long: this.userLocation?.lng
    };

 

    // Prepare the array containing the review object

    // Submit the review
    this.service.SubmitReview(review).subscribe({
        next: (body: any) => this.handleSuccess(body.body),
        error: (error: any) => this.handleError(error),
    });
}


  private loadInfo(id: any): void {
    this.service.getInfo(id).subscribe({
      next: (body: any) => this.handleSuccessCategory(body),
      error: (error: any) => this.handleError(error),
    });
  }

  private handleSuccessCategory(body: any): void {
    this.img  = 'https://api.ratemekw.com/static/'+body.business.img;
    this.titleName = body?.business?.title;
    // this.titleNameAr = body?.business?.titleNameAr;
    this.titleNameAr = 'فرع الكويت';
  }
  private handleSuccess(body: any): void {
    this.playCompleteSound()
    this.show = true;
  }

  private handleError(error: any): void {  
    // Display the error message from the error object
    const errorMessage = this.isAra() ? error.error.message.errorAr:error.error.message.errorEn;
    const modalConfig = this.getModalConfig({ ...ErrorModalConfig, message: errorMessage });

    // Open the modal dialog
    const dialogRef = this.dialog.open(SharedModalComponent, modalConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  private getModalConfig(customConfig?: ModalConfig): MatDialogConfig {
    const config = new MatDialogConfig();
    config.data = { config: customConfig };
    config.panelClass = 'data-model-confirm'; // Add custom CSS class to the dialog
    return config;
  }
  private getUserLocation(): void {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position : any) => {
        this.userLocation = position;
      },
      error: (error : Error) => {
        console.error('Error getting location:', error);
      }
    });
  }
}
