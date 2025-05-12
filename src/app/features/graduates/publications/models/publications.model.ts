import { AcademicInformation } from '../../academic-information/models/academic-information.model';

export interface Publication {
	id: string;
	titulo: string;
	autores: string;
	ano_publicacao: number;
	veiculo: string;
	informacao_academica: AcademicInformation;
	matricula: string;
	url_publicacao: string;
}
