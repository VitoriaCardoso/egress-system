import { AbstractControl } from '@angular/forms';

export interface FilterModel {
	semestre: AbstractControl<string>;
	curso: AbstractControl<Array<string>>;
	titulacao: AbstractControl<Array<string>>;
	campus: AbstractControl<Array<string>>;
}
