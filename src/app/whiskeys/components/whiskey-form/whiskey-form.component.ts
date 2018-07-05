import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ANM_ROUTE_ENTER, routerTransition } from '../../../router.transition';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskey-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
  styleUrls: ['whiskey-form.component.scss'],
  templateUrl: './whiskey-form.component.html'
})
export class WhiskeyFormComponent implements OnInit, OnChanges {
  animateOnRouteEnter = ANM_ROUTE_ENTER;
  photo_path: string;
  exists = false;
  mouseHover: boolean = false;

  @Input() whiskey: Whiskey;
  @Input() uid: string;

  @Output() create = new EventEmitter<Whiskey>();
  @Output() update = new EventEmitter<Whiskey>();
  @Output() remove = new EventEmitter<Whiskey>();
  @Output() cancel = new EventEmitter<any>();

  form = this.fb.group({
    long_name: ['', Validators.required],
    short_name: ['', Validators.required],
    maker: ['', Validators.required],
    location: ['', Validators.required],
    type: ['', Validators.required],
    years: ['', Validators.required],
    proof: [90, Validators.required],
    alc_vol: [40, Validators.required],
    notes: ['', [Validators.required, Validators.maxLength(200)]],
    photo: ''
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.whiskey) {
      this.photo_path =
        /* environment.photo_path + */
        this.whiskey.photo /* +
        environment.photo_path_param */;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.whiskey && this.whiskey.id) {
      this.exists = true;
      this.form.patchValue(this.whiskey);
    }
  }

  onPhotoUpload(event: string) {
    this.photo_path = /* environment.photo_path +  */ event /*  + environment.photo_path_param */;

    /* console.log('');
    console.log('event');
    console.log(event); */
    this.form.patchValue({ photo: this.photo_path });
  }

  createWhiskey(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateWhiskey(form: FormGroup) {
    const { value, valid, touched } = form;
    if (/* touched && */ valid) {
      this.update.emit({ ...this.whiskey, ...value });
    }
  }

  removeWhiskey(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.whiskey, ...value });
  }

  cancelWhiskey(form: FormGroup) {
    this.cancel.emit();
  }
}
