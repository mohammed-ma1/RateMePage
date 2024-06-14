import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CustomTranslateService } from '../../services/translate.service';
import { Language } from '../../services/language.model';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { BillereService } from './main.service';

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

  public emojis = [
    { src: '../../../assets/img/pouting-face_1f621.png', alt: 'angry' },
    { src: '../../../assets/img/neutral-face_1f610.png', alt: 'neutral' },
    { src: '../../../assets/img/smiling-face-with-heart-shaped-eyes_1f60d.png', alt: 'very satisfied' }
  ];

  public ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private clickSound = new Audio('../../../assets/sound/click1 (1).mp3');

  constructor(public translate: CustomTranslateService, private deviceService: DeviceService,private route: ActivatedRoute,private Service: BillereService
    ) {
    
    console.log(this.id)
    this.changeLanguage(1);
  }

  public isAra(): boolean {
    return this.translate.isAr();
  }

  ngOnInit(): void {
    const RequestParams = this.getRequestParams();
    console.log("🚀 ~ MainComponent ~ ngOnInit ~ RequestParams:", RequestParams)

    this.deviceId = this.deviceService.getDeviceId();
   // this.loadInfo(this.id)
    console.log('Device ID:', this.deviceId);
  }
  private getRequestParams(): string {
    // Define the string to search for in the URL
    // Find the starting index of the searchString in the URL
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
    this.playClickSound();
  }

  private playClickSound() {
    this.clickSound.play();
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
    // Handle form submission logic
    console.log('Selected Emoji:', this.selectedEmojiIndex);
    console.log('Selected Rating:', this.selectedRating);
    console.log('Notes:', this.notes);
    this.show = true;
  }

  private loadInfo(id: any): void {

    this.Service.getInfo(id).subscribe({
      next: (body: any) => this.handleSuccessCategory(body.body),
      error: (error: any) => this.handleError(error),
    });
  }

  private handleSuccessCategory(body: any): void {
  console.log("🚀 ~ MainComponent ~ handleSuccessCategory ~ body:", body)

  }
  private handleError(code: number): void {
  console.log("🚀 ~ MainComponent ~ handleError ~ code:", code)
  }
  

}
