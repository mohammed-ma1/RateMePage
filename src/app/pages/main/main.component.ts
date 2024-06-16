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
  public userLocation: { lat: number, lng: number } | null = null;

  public emojis = [
    { src: '../../../assets/img/3.png', alt: 'angry' },
    { src: '../../../assets/img/2 (1).png', alt: 'neutral' },
    { src: '../../../assets/img/1 (1).png', alt: 'very satisfied' }
  ];

  public ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private clickSound: HTMLAudioElement;
  private clickSoundNumber: HTMLAudioElement;
  constructor(
    public translate: CustomTranslateService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private service: BillereService,
    private toast: NotificationService,
    private geolocationService: GeolocationService // Inject GeolocationService
  ) {
    this.changeLanguage(1);

    // Preload the click sound
    this.clickSound = new Audio('../../../assets/sound/Pop Up Sound Effect.mp3');
    this.clickSound.load();
    this.clickSoundNumber = new Audio('../../../assets/sound/Pop Up Sound Effect.mp3');
    this.clickSoundNumber.load();
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

  public selectEmoji(index: number) {
    this.selectedEmojiIndex = index;
    this.playClickSound();
  }

  public selectRating(rating: number) {
    this.selectedRating = rating;
    this.playClickratingSound();
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
  public getColorClass(rating: number): string {
    if (rating <= 3) {
      return 'color-1';
    } else if (rating <= 7) {
      return 'color-2';
    } else {
      return 'color-3';
    }
  }

  public get isFormValid(): boolean {
    return this.selectedEmojiIndex !== null && this.selectedRating !== null;
  }

  public submit() {
    // Create the review object
    const review = {
        notes: this.notes,
        deviceId: this.deviceId,
        smileyAnswer: this.selectedEmojiIndex,
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
      next: (body: any) => this.handleSuccessCategory(body.body),
      error: (error: any) => this.handleError(error),
    });
  }

  private handleSuccessCategory(body: any): void {
  }
  private handleSuccess(body: any): void {
    this.show = true;
  }

  private handleError(error: any): void {
    // Display the error message from the error object
    const errorMessage = error.error.message || 'An unexpected error occurred';
    this.toast.showError(errorMessage);
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
