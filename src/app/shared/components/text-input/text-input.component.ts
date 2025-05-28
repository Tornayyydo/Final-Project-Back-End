import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    if (control) {
      const validators = control.validator ? [control.validator] : [];
      const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

      control.setValidators(validators);
      control.setAsyncValidators(asyncValidators);
      control.updateValueAndValidity();
    }
  }

  writeValue(obj: any): void {
    if (this.input) {
      this.input.nativeElement.value = obj || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.input) {
      this.input.nativeElement.disabled = isDisabled;
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
  }
}
