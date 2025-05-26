import {
	CategoryEnum,
	job_levelEnum,
	job_typeEnum,
	LocationEnum,
	ProfessionalInfo,
} from '../models/professional-information.model';

import { institution_typeEnum } from '@shared/enums/institution-type.enum';
import { course_levelEnum } from '@shared/enums/course-level.enum';

export const PROFESSIONAL_INFO_MOCK: ProfessionalInfo[] = [
	{
		id: 3,
		company_name: 'Innovatech',
		category: CategoryEnum.PUBLIC,
		job_type: job_typeEnum.CONTRACT,
		location: LocationEnum.HYBRID,
		job_title: 'Analista de Sistemas',
		job_level: job_levelEnum.JUNIOR,
		start_date: new Date('2021-02-01'),
		salary: 4000,
		function: 'Desenvolvimento de software',
		informacao_academica: {
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
	},
	{
		id: 2,
		company_name: 'Tech Solutions',
		category: CategoryEnum.PRIVATE,
		job_type: job_typeEnum.PART_TIME,
		location: LocationEnum.REMOTE,
		job_title: 'Engenheiro de Software',
		job_level: job_levelEnum.MID_LEVEL,
		start_date: new Date('2015-05-15'),
		end_date: new Date('2020-06-20'),
		salary: 3000,
		function: 'Desenvolvimento de software',
		informacao_academica: {
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
	},
	{
		id: 1,
		company_name: 'LUIT',
		category: CategoryEnum.PRIVATE,
		job_type: job_typeEnum.FULL_TIME,
		location: LocationEnum.IN_PERSON,
		job_title: 'Desenvolvedor FrontEnd',
		job_level: job_levelEnum.SENIOR,
		start_date: new Date('2010-10-10'),
		end_date: new Date('2019-10-10'),
		salary: 2000,
		function: 'Analisar e desenvolver sistemas',
		informacao_academica: {
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
	},
];

export const CATEGORY_OPTIONS_MOCK = [
	{ label: 'Privada', value: CategoryEnum.PRIVATE },
	{ label: 'Pública', value: CategoryEnum.PUBLIC },
	{ label: 'NGO', value: CategoryEnum.NGO },
];

export const JOB_TYPE_OPTIONS_MOCK = [
	{ label: 'Tempo Integral', value: job_typeEnum.FULL_TIME },
	{ label: 'Meio Período', value: job_typeEnum.PART_TIME },
	{ label: 'Contrato', value: job_typeEnum.CONTRACT },
	{ label: 'Freelancer', value: job_typeEnum.FREELANCER },
];

export const JOB_LEVEL_OPTIONS_MOCK = [
	{ label: 'Júnior', value: job_levelEnum.JUNIOR },
	{ label: 'Pleno', value: job_levelEnum.MID_LEVEL },
	{ label: 'Sênior', value: job_levelEnum.SENIOR },
	{ label: 'Especialista', value: job_levelEnum.SPECIALIST },
];

export const LOCATION_OPTIONS_MOCK = [
	{ label: 'Presencial', value: LocationEnum.IN_PERSON },
	{ label: 'Remoto', value: LocationEnum.REMOTE },
	{ label: 'Híbrido', value: LocationEnum.HYBRID },
];
