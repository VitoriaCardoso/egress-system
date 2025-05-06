import { Pipe, PipeTransform } from '@angular/core';
import { AcademicInformation } from '@features/graduates/academic-information/models/academic-information.model';
import { getInitials } from '@shared/utils/string.utils';

@Pipe({
	name: 'titleCollapseAcademicInformation',
	standalone: true,
})
export class TitleCollapseAcademicInformationPipe implements PipeTransform {
	transform(academicInformation: Partial<AcademicInformation>): string {
		if (!academicInformation.course_name && !academicInformation.institution_name) {
			return '';
		}

		return (academicInformation?.course_name || '') + ' - ' + getInitials(academicInformation?.institution_name || '');
	}
}
