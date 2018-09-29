import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Environments {
  value: string;
  viewValue: string;
}

export interface Organizations {
  value: string;
  viewValue: string;
}

// export interface BSIs {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  selectedEnvironment = 'poc';
  selectedOrganization = 'bzwbk';
  selectedBSI: string;
  bsiControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = ['DOT', 'THOR', 'CUDO'];

  organization: Organizations[] = [
    { value: 'bzwbk', viewValue: 'BZWBK' },
    { value: 'automation', viewValue: 'Automation' }
  ];

  // bsi: BSIs[] = [
  //   { value: 'DOT', viewValue: 'DevOpsTools' },
  //   { value: 'ABINITIO', viewValue: 'ABINITIO' }
  // ];

  environment: Environments[] = [
    { value: 'poc', viewValue: 'POC' },
    { value: 'test', viewValue: 'Test' },
    { value: 'prod', viewValue: 'Produkcja' }
  ];

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.bsiControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
