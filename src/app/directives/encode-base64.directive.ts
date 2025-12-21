import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[encodeBase64]',
  standalone: true
})
export class EncodeBase64Directive {

  @Output() encoded = new EventEmitter<string>();

  @HostListener('change', ['$event'])
  onChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.encoded.emit('');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);

    reader.onloadend = () => {
      this.encoded.emit(reader.result as string);
    };
  }
}

