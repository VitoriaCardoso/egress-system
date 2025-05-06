import { Pipe, PipeTransform } from '@angular/core';
import { course_level_OPTIONS_MOCK } from '../../../../shared/mocks/titration.mock';
import { getLabelByValue } from '../../../../shared/utils/option-label.utils';
import { course_levelEnum } from '../../../../shared/enums/course-level.enum';

@Pipe({
	name: 'getcourse_levelDescription',
	standalone: true,
})
export class Getcourse_levelDescriptionPipe implements PipeTransform {
	transform(value: course_levelEnum | string): string {
		return getLabelByValue(value, course_level_OPTIONS_MOCK);
	}
}
