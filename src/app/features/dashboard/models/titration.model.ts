export interface StudentTestimony {
	nome: string;
	courseName: string;
	campus: string;
	courseLevel: string;
	textoDepoimento: Testimony;
}

export interface Testimony {
	title: string;
	textoDepoimento: string;
}

export interface StudentPagination {
	data: StudentTestimony[];
	length: number;
	page: number;
	pageSize: number;
}
