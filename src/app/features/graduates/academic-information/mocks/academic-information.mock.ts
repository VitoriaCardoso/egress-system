import { AcademicInformation } from '../models/academic-information.model';
import { institution_typeEnum } from '@shared/enums/institution-type.enum';
import { course_levelEnum } from '@shared/enums/course-level.enum';

export const EDUCATION_HISTORY_MOCK: Array<AcademicInformation> = [
	{
		id: '6eb57513-6b95-48b8-8b55-0e4711952c22',
		institution_name: 'Universidade Estadual de Campinas',
		institution_type: institution_typeEnum.PUBLIC_INSTITUTION,
		course_name: 'Engenharia de Computação',
		course_level: course_levelEnum.BACHELOR,
		country: 'Brasil',
		start_date: new Date(2020, 1, 1).toISOString(),
		end_date: new Date(2024, 1, 1).toISOString(),
		state: 'São Paulo',
		city: 'Campinas',
		document: 'São Paulo',
	},
	{
		id: '1',
		institution_name: 'Universidade Federal de Uberlândia',
		institution_type: institution_typeEnum.PUBLIC_INSTITUTION,
		course_name: 'Sistemas da Informação',
		course_level: course_levelEnum.BACHELOR,
		country: 'Brasil',
		start_date: new Date(2016, 1, 1).toISOString(),
		end_date: new Date(2020, 1, 1).toISOString(),
		state: 'Minas Gerais',
		city: 'Uberlândia',
		matricula: 'ID154942',
		document: 'São Paulo',
	},
];
