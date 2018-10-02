import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

export interface Vlans {
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
  selectedVlan: string;

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

  vlan: Vlans[] = [
    { value: 'vlan_1001', viewValue: 'vlan_1001' },
    { value: 'vlan_1002', viewValue: 'vlan_1002' },
    { value: 'vlan_1003', viewValue: 'vlan_1003' }
  ];

  // Stepper config
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  networkInterfacesGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    // BSI search
    this.filteredOptions = this.bsiControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    // Stepper config
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.networkInterfacesGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
