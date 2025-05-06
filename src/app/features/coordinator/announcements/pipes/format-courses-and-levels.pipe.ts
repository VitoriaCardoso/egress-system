import { Pipe, PipeTransform } from '@angular/core';
import { AnnouncementSpecific } from '@app/features/coordinator/announcements/models/announcements.model';

@Pipe({
	name: 'formatCoursesAndLevels',
	standalone: true,
})
export class FormatCoursesAndLevelsPipe implements PipeTransform {
	transform({ courses, course_levels }: AnnouncementSpecific): string {
		const formattedCourses =
			courses.length > 1 ? `${courses.slice(0, -1).join(', ')} e ${courses[courses.length - 1]}` : courses[0];

		const formattedcourse_levels =
			course_levels.length > 1
				? `${course_levels.slice(0, -1).join(', ')} e ${course_levels[course_levels.length - 1]}`
				: course_levels[0];

		return `Alunos dos cursos de ${formattedCourses} <br> Das titulações: ${formattedcourse_levels}`;
	}
}
