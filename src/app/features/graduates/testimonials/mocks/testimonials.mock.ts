import { PrivacyEnum, Testimonial } from '@app/features/graduates/testimonials/models/testimonials.model';
import { RadioOptions } from '@shared/models/radio.model';
import { institution_typeEnum } from '@shared/enums/institution-type.enum';
import { course_levelEnum } from '@shared/enums/course-level.enum';

export const TESTIMONIALS_MOCK: Array<Testimonial> = [
	{
		id: '1',
		texto_depoimento:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium sit amet sem sit amet viverra.',
		informacaoAcademica: {
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
		privacidade: PrivacyEnum.PUBLIC,
		data_cadastro: new Date('2023-05-01').toISOString(),
	},
	{
		id: '2',
		texto_depoimento: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
		informacaoAcademica: {
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
		privacidade: PrivacyEnum.PRIVATE,
		data_cadastro: new Date('2023-04-15').toISOString(),
	},
];

export const PRIVACY_OPTIONS: RadioOptions = [
	{ label: 'Público', value: PrivacyEnum.PUBLIC },
	{ label: 'Privado', value: PrivacyEnum.PRIVATE },
	{ label: 'Anônimo', value: PrivacyEnum.ANONYMOUS },
];
