import { ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  DEFAULT_PROFILE_ICON,
  eProfilePictureType,
  ProfilePictureImage,
  ProfilePictureService,
  PROFILE_PICTURE,
} from '@volo/abp.commercial.ng.ui/config';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, finalize, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'abp-profile-picture',
  templateUrl: 'profile-picture.component.html',
  styleUrls: [
    '../../../../../../node_modules/cropperjs/dist/cropper.css',
    'profile-picture.component.scss',
  ],
  // ViewEncapsulation.None is important. Do not change! Otherwise cropper.css will not work.
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePictureComponent implements OnInit {
  profileLoaded: boolean;

  inProgress: boolean;

  profilePictureType = eProfilePictureType.None;

  selectedImage: any;

  cropper: Cropper;

  @ViewChild('uploadFile', { read: ElementRef }) uploadFileRef: ElementRef<HTMLInputElement>;
  @ViewChild('selectedImgRef', { read: ElementRef }) selectedImgRef: ElementRef<HTMLImageElement>;
  @ViewChildren('preview', { read: ElementRef }) selectedImagePreviews: QueryList<
    ElementRef<HTMLImageElement>
  >;

  get currentUserId(): string {
    return this.configState.getDeep('currentUser.id');
  }

  constructor(
    @Inject(PROFILE_PICTURE) public profilePicture$: BehaviorSubject<ProfilePictureImage>,
    private cdRef: ChangeDetectorRef,
    private confirmation: ConfirmationService,
    private profilePictureService: ProfilePictureService,
    private configState: ConfigStateService,
  ) {}

  private toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  ngOnInit() {
    this.getProfilePhoto();
  }

  getProfilePhoto() {
    this.profilePictureService
      .getProfilePicture(this.currentUserId)
      .pipe(finalize(() => (this.profileLoaded = true)))
      .subscribe(
        res => {
          this.profilePictureType = res.type;
          const pP = res.source || `data:image/png;base64,${res.fileContent}`;
          if (this.profilePicture$.value.source !== pP)
            this.profilePicture$.next({ type: 'image', source: pP });
        },
        () => this.profilePicture$.next(DEFAULT_PROFILE_ICON),
      );
  }

  submit() {
    let localization = '';
    switch (this.profilePictureType) {
      case eProfilePictureType.Gravatar:
        localization = 'UseGravatarConfirm';
        break;
      case eProfilePictureType.Image:
        localization = 'PPUploadConfirm';
        break;
      default:
        localization = 'NoProfilePictureConfirm';
        break;
    }

    this.confirmation
      .warn(`AbpAccount::${localization}`, 'AbpAccount::AreYouSure')
      .pipe(
        filter(res => res === Confirmation.Status.confirm),
        tap(() => (this.inProgress = true)),
        switchMap(() => {
          if (this.profilePictureType === eProfilePictureType.Image) {
            const subject = new Subject();

            this.cropper.getCroppedCanvas().toBlob(blob => {
              this.profilePictureService
                .setProfilePicture({
                  type: this.profilePictureType,
                  imageContent: blob,
                })
                .pipe(finalize(() => subject.complete()))
                .subscribe(
                  result => subject.next(result),
                  error => subject.error(error),
                );
            });

            return subject.asObservable();
          }

          return this.profilePictureService.setProfilePicture({
            type: this.profilePictureType,
          });
        }),
        take(1),
        finalize(() => (this.inProgress = false)),
      )
      .subscribe(() => {
        this.getProfilePhoto();
        this.selectedImage = null;
        if (this.uploadFileRef) this.uploadFileRef.nativeElement.value = null;
      });
  }

  async onSelectImage(file: File) {
    this.selectedImage = await this.toBase64(file);

    if (this.cropper) this.cropper.destroy();

    const previewSizes = [250, 150, 75];

    const setImgUrls = () => {
      this.selectedImagePreviews.forEach((el, i) => {
        const width = previewSizes[i];
        el.nativeElement.src = this.cropper.getCroppedCanvas({ width, height: width }).toDataURL();
      });

      this.cdRef.detectChanges();
    };

    setTimeout(() => {
      this.cropper = new Cropper(this.selectedImgRef.nativeElement, {
        aspectRatio: 1,
        viewMode: 1,
        cropend: () => setImgUrls(),
        ready: () => setImgUrls(),
      });
    }, 0);
  }
}
