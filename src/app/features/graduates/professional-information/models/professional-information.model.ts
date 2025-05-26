import { AcademicInformation } from '../../academic-information/models/academic-information.model';

export interface ProfessionalInfo {
	id: number;
	company_name: string;
	category: string;
	job_type: string;
	location: string;
	job_title: string;
	job_level: string;
	start_date: Date;
	end_date?: Date;
	salary?: number;
	function?: string;
	informacao_academica: AcademicInformation;
}

export enum CategoryEnum {
	PRIVATE = 'Privada',
	PUBLIC = 'Público',
	NGO = 'NGO',
}

export enum job_typeEnum {
	FULL_TIME = 'Tempo Integral',
	PART_TIME = 'Meio Período',
	CONTRACT = 'Contratado',
	FREELANCER = 'FreeLancer',
}

export enum job_levelEnum {
	JUNIOR = 'Júnior',
	MID_LEVEL = 'Nível Médio',
	SENIOR = 'Sênior',
	SPECIALIST = 'Especialista',
}

export enum LocationEnum {
	IN_PERSON = 'Pessoalmente',
	REMOTE = 'Remoto',
	HYBRID = 'Híbrido',
}
