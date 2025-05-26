import { AcademicInformation } from '../../academic-information/models/academic-information.model';

export interface Testimonial {
	id: string;
	texto_depoimento: string;
	informacaoAcademica: AcademicInformation;
	privacidade: string;
	data_cadastro?: string;
}

export interface TestimonialForm {
	texto_depoimento: string;
	course_name: string;
	privacidade: string;
}

export enum PrivacyEnum {
	PUBLIC = 'Público',
	PRIVATE = 'Privado',
	ANONYMOUS = 'Anônimo',
}
