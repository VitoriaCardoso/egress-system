import { SelectOptions } from '../models/select.model';
import { course_levelEnum } from '../enums/course-level.enum';

export const course_level_OPTIONS_MOCK: SelectOptions = [
	{ label: 'Graduação', value: course_levelEnum.GRADUATION },
	{ label: 'Mestrado', value: course_levelEnum.MASTER },
	{ label: 'Doutorado', value: course_levelEnum.DOCTORATE },
	{ label: 'Pós-Doutorado', value: course_levelEnum.POST_DOCTORATE },
	{ label: 'Especialização', value: course_levelEnum.SPECIALIZATION },
	{ label: 'Curso Técnico', value: course_levelEnum.TECHNICAL_COURSE },
	{ label: 'Curso Tecnólogo', value: course_levelEnum.ASSOCIATE_DEGREE },
	{ label: 'Bacharelado', value: course_levelEnum.BACHELOR },
	{ label: 'Licenciatura', value: course_levelEnum.LICENTIATE },
	{ label: 'MBA', value: course_levelEnum.MBA },
	{ label: 'Outro', value: course_levelEnum.OTHER },
];
