import { Pipe, PipeTransform } from '@angular/core';
import { institution_typeEnum } from '../../../../shared/enums/institution-type.enum';
import { institution_type_OPTIONS_MOCK } from '../../../../shared/mocks/institution-type.mock';
import { getLabelByValue } from '../../../../shared/utils/option-label.utils';

@Pipe({
	name: 'getinstitution_typeDescription',
	standalone: true,
})
export class Getinstitution_typeDescriptionPipe implements PipeTransform {
	transform(value: institution_typeEnum | string): string {
		return getLabelByValue(value, institution_type_OPTIONS_MOCK);
	}
}
