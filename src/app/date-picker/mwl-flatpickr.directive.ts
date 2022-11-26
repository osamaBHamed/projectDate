import {
    Directive,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    forwardRef,
    HostListener,
    Renderer2,
  } from '@angular/core';
  import {
    FlatpickrDefaults
  } from './FlatpickrDefaults';
  
  import {
    DisableEnableDate
  } from './FlatpickrDefaults';
  
  import {
    FlatpickrDefaultsInterface
  } from './FlatpickrDefaults'
  
    
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  //import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
  //import { DisableEnableDate } from 'angularx-flatpickr/lib/flatpickr-defaults.service';
  //import { FlatpickrDirective, FLATPICKR_CONTROL_VALUE_ACCESSOR } from 'angularx-flatpickr/lib/flatpickr.directive';
  import flatpickr from 'flatpickr';
//   import { FlatpickrDirective } from 'angularx-flatpickr';
  
  
  export interface FlatPickrOutputOptions {
    selectedDates: Date[];
    dateString: string;
    instance: any;
  }
  
  export interface FlatPickrDayCreateOutputOptions
    extends FlatPickrOutputOptions {
    dayElement: HTMLElement;
  }
  
//   export const FLATPICKR_CONTROL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => FlatpickrDirective),
//     multi: true,
//   };
  
  
  
  @Directive({
    selector: '[appMwlFlatpickr]',
    // providers: [FLATPICKR_CONTROL_VALUE_ACCESSOR],
    exportAs: 'mwlFlatpickr',
  
  })
  export class MwlFlatpickrDirective implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor{
  
    @Input() options: FlatpickrDefaultsInterface = {};
    @Input() altFormat?: string;
    @Input() altInput?: boolean;
    @Input() altInputClass?: string;
    @Input() allowInput?: boolean;
    @Input() appendTo?: HTMLElement;
    @Input() ariaDateFormat?: string;
    @Input() clickOpens?: boolean;
    @Input() dateFormat?: string;
    @Input() defaultHour?: number;
    @Input() defaultMinute?: number;
    @Input() defaultSeconds?: number;
    @Input() disable?: DisableEnableDate[];
    @Input() disableMobile?: boolean;
    @Input() enable?: DisableEnableDate[];
    @Input() enableTime?: boolean;
    @Input() enableSeconds?: boolean;
    @Input() formatDate?: (value: any) => string;
    @Input() hourIncrement?: number;
    @Input() inline?: boolean;
    @Input() maxDate?: string | Date;
    @Input() minDate?: string | Date;
    @Input() minuteIncrement?: number;
    @Input() mode?: 'single' | 'multiple' | 'range';
    @Input() nextArrow?: string;
    @Input() noCalendar?: boolean;
    @Input() now?: Date | string | number;
    @Input() parseDate?: (str: string) => Date;
    @Input() prevArrow?: string;
    @Input() shorthandCurrentMonth?: boolean;
    @Input() showMonths?: number;
    @Input() static?: boolean;
    @Input() time24hr?: boolean;
    @Input() weekNumbers?: boolean;
  
    @Input() getWeek?: (date: Date) => string;
    @Input() wrap?: boolean;
    @Input() plugins?: any[];
    @Input() locale?: object | string;
    @Input() convertModelValue?: boolean;
    @Input() monthSelectorType?: 'static' | 'dropdown';
    @Output()
    flatpickrReady: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrChange: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrValueUpdate: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrOpen: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrClose: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrMonthChange: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrYearChange: EventEmitter<FlatPickrOutputOptions> = new EventEmitter();
    @Output()
    flatpickrDayCreate: EventEmitter<FlatPickrDayCreateOutputOptions> = new EventEmitter();
  
    instance!: flatpickr.Instance;
  
    private isDisabled = false;
    private initialValue: any;
  
    onChangeFn: (value: any) => void = () => {};
  
    @HostListener('blur')
    onTouchedFn = () => {};
  
    constructor(
      private elm: ElementRef,
      private defaults: FlatpickrDefaults,
      private renderer: Renderer2
    ) {}
  
    ngAfterViewInit(): void {
      const options: any = {
        altFormat: this.altFormat,
        altInput: this.altInput,
        altInputClass: this.altInputClass,
        allowInput: this.allowInput,
        appendTo: this.appendTo,
        ariaDateFormat: this.ariaDateFormat,
        clickOpens: this.clickOpens,
        dateFormat: this.dateFormat,
        defaultHour: this.defaultHour,
        defaultMinute: this.defaultMinute,
        defaultSeconds: this.defaultSeconds,
        disable: this.disable,
        disableMobile: this.disableMobile,
        enable: this.enable,
        enableTime: this.enableTime,
        enableSeconds: this.enableSeconds,
        formatDate: this.formatDate,
        hourIncrement: this.hourIncrement,
        defaultDate: this.initialValue,
        inline: this.inline,
        maxDate: this.maxDate,
        minDate: this.minDate,
        minuteIncrement: this.minuteIncrement,
        mode: this.mode,
        nextArrow: this.nextArrow,
        noCalendar: this.noCalendar,
        now: this.now,
        parseDate: this.parseDate,
        prevArrow: this.prevArrow,
        shorthandCurrentMonth: this.shorthandCurrentMonth,
        showMonths: this.showMonths,
        monthSelectorType: this.monthSelectorType,
        static: this.static,
        time24hr: this.time24hr,
        weekNumbers: this.weekNumbers,
        getWeek: this.getWeek,
        wrap: this.wrap,
        plugins: this.plugins,
        locale: this.locale,
        onChange: (selectedDates: Date[], dateString: string, instance: any) => {
          this.flatpickrChange.emit({ selectedDates, dateString, instance });
        },
        onOpen: (selectedDates: Date[], dateString: string, instance: any) => {
          this.flatpickrOpen.emit({ selectedDates, dateString, instance });
        },
        onClose: (selectedDates: Date[], dateString: string, instance: any) => {
          this.flatpickrClose.emit({ selectedDates, dateString, instance });
        },
        onMonthChange: (
          selectedDates: Date[],
          dateString: string,
          instance: any
        ) => {
          this.flatpickrMonthChange.emit({ selectedDates, dateString, instance });
        },
        onYearChange: (
          selectedDates: Date[],
          dateString: string,
          instance: any
        ) => {
          this.flatpickrYearChange.emit({ selectedDates, dateString, instance });
        },
        onReady: (selectedDates: Date[], dateString: string, instance: any) => {
          this.flatpickrReady.emit({ selectedDates, dateString, instance });
        },
        onValueUpdate: (
          selectedDates: Date[],
          dateString: string,
          instance: any
        ) => {
          this.flatpickrValueUpdate.emit({ selectedDates, dateString, instance });
        },
        onDayCreate: (
          selectedDates: Date[],
          dateString: string,
          instance: any,
          dayElement: HTMLElement
        ) => {
          this.flatpickrDayCreate.emit({
            selectedDates,
            dateString,
            instance,
            dayElement,
          });
        },
      };
  
      Object.keys(options).forEach((key) => {
        if (typeof options[key] === 'undefined') {
          if (typeof (this.options as any)[key] !== 'undefined') {
            options[key] = (this.options as any)[key];
          } else {
            options[key] = (this.defaults as any)[key];
          }
        }
      });
      options.time_24hr = options.time24hr;
  
      // workaround bug in flatpickr 4.6 where it doesn't copy the classes across
      // TODO - remove once fix in https://github.com/flatpickr/flatpickr/issues/1860 is released
      options.altInputClass =
        (options.altInputClass || '') + ' ' + this.elm.nativeElement.className;
  
      if (!options.enable) {
        delete options.enable;
      }
  
      this.instance = flatpickr(
        this.elm.nativeElement,
        options
      ) as flatpickr.Instance;
      this.setDisabledState(this.isDisabled);
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (this.instance) {
        Object.keys(changes).forEach((inputKey) => {
          this.instance.set(inputKey as any, (this as any)[inputKey]);
        });
      }
    }
  
    ngOnDestroy(): void {
      if (this.instance) {
        this.instance.destroy();
      }
    }
  
    writeValue(value: any): void {
      let convertedValue: any = value;
      if (this.convertModelValue && this.mode === 'range' && value) {
        convertedValue = [value.from, value.to];
      }
  
      if (this.instance) {
        this.instance.setDate(convertedValue);
      } else {
        // flatpickr hasn't been initialised yet, store the value for later use
        this.initialValue = convertedValue;
      }
    }
  
    registerOnChange(fn: any): void {
      this.onChangeFn = fn;
    }
  
    registerOnTouched(fn: () => void): void {
      this.onTouchedFn = fn;
    }
  
    setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
      if (this.instance) {
        if (this.isDisabled) {
          this.renderer.setProperty(this.instance._input, 'disabled', 'disabled');
        } else {
          
          this.renderer.removeAttribute(this.instance._input, 'disabled');
        }
      }
    }
  
    @HostListener('input')
    inputChanged(): void {
      debugger
      const value: string = this.elm.nativeElement.value;
      if (this.convertModelValue && typeof value === 'string') {
        switch (this.mode) {
          case 'multiple':
            const dates: Array<Date | undefined> = value
              .split('; ')
              .map((str) =>
                this.instance.parseDate(
                  str,
                  this.instance.config.dateFormat,
                  !this.instance.config.enableTime
                )
              );
            this.onChangeFn(dates);
            break;
  
          case 'range':
            const [from, to] = value
              .split(this.instance.l10n.rangeSeparator)
              .map((str) =>
                this.instance.parseDate(
                  str,
                  this.instance.config.dateFormat,
                  !this.instance.config.enableTime
                )
              );
            this.onChangeFn({ from, to });
            break;
  
          case 'single':
          default:
            this.onChangeFn(
              this.instance.parseDate(
                value,
                this.instance.config.dateFormat,
                !this.instance.config.enableTime
              )
            );
        }
      } else {
        this.onChangeFn(value);
      }
    }
  
  
  
  }
  