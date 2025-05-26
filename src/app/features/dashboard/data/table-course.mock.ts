import { Course } from '../models/course.model';
import { Pagination } from '@shared/models/pagination.model';

export const coursesMock: Course[] = [
	{ curso: 'Agronomia', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 1026 },
	{
		curso: 'ABI Engenharia',
		titulacao: 'Área Básica de Ingresso',
		campus: 'Campus Patos de Minas',
		total: 699,
	},
	{ curso: 'Direito', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 570 },
	{ curso: 'Medicina Veterinária', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 523 },
	{
		curso: 'Engenharia de Controle e Automação',
		titulacao: 'Bacharelado',
		campus: 'Campus Patos de Minas',
		total: 501,
	},
	{ curso: 'Ciência da Computação', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 488 },
	{ curso: 'Engenharia Mecânica', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 470 },
	{ curso: 'Engenharia Civil', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 450 },
	{ curso: 'Engenharia Elétrica', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 430 },
	{ curso: 'Biologia', titulacao: 'Bacharelado', campus: 'Campus Patos de Minas', total: 400 },
];

export const coursesPaginationMock: Pagination<Course> = {
	data: coursesMock,
	length: coursesMock.length,
	page: 1,
	pageSize: 5,
};
