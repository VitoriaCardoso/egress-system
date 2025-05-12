import { Publication } from '@app/features/graduates/publications/models/publications.model';
import { institution_typeEnum } from '@shared/enums/institution-type.enum';
import { course_levelEnum } from '@shared/enums/course-level.enum';

export const PUBLICATION_MOCK: Array<Publication> = [
	{
		id: '1',
		titulo: 'Projeto e desenvolvimento de um sistema web',
		autores: 'João Pereira; Maria Santos',
		ano_publicacao: 2019,
		veiculo: 'Revista UFU',
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
		matricula: 'ID156514132054',
		url_publicacao: 'https://www.ufu.br',
	},
	{
		id: '2',
		titulo: 'A influência da IA no desenvolvimento de software',
		autores: 'José Silva; Ana Souza',
		ano_publicacao: 2020,
		veiculo: 'Jornal de Ciência e Tecnologia',
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
		matricula: 'ID562145789651',
		url_publicacao: 'https://www.ufu.br',
	},
];
