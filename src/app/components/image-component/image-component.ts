import { Component, EventEmitter, Input, Output, input, model, effect, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'image-component',
  templateUrl: './image-component.html',
  imports: [FormsModule],
})
export class ImageComponent implements OnDestroy {
  value = model<File | null>(null);
  label = input<string>();
  accept = input<string>('image/*');

  /** Optional: show a preview URL (blob: or https:) */
  @Input() preview: string | undefined = undefined;

  /** Parent-controlled reset trigger. Increment to clear. */
  resetKey = input<number>(0);

  @Output() fileChanged = new EventEmitter<File | null>();
  @Output() cleared = new EventEmitter<void>();

  constructor() {
    // When parent bumps resetKey, clear the image
    effect(() => {
      this.resetKey();   // consume signal
      this.clear();      // wipe preview + value
    });
  }

  ngOnDestroy() {
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.value.set(file);
      this.preview = URL.createObjectURL(file);
      this.fileChanged.emit(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.value.set(file);
      this.preview = URL.createObjectURL(file);
      this.fileChanged.emit(file);
    }
  }

  allowDrop(event: DragEvent) { event.preventDefault(); }

  clear() {    
    this.preview = undefined;
    this.value.set(null);
    this.fileChanged.emit(null);
    this.cleared.emit();
  }
}