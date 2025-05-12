import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicInformation } from '@features/graduates/academic-information/models/academic-information.model';
import { SelectOption } from '../../../../shared/models/select.model';

@Injectable({
	providedIn: 'root',
})
export class InformacaoAcademicaService {
	private apiUrl = 'http://localhost:8080/api/informacoes/academicas';

	constructor(private http: HttpClient) {}

	buscarTodos(): Observable<AcademicInformation[]> {
		return this.http.get<AcademicInformation[]>(`${this.apiUrl}`);
	}

	buscarPorEgresso(cpf: string): Observable<AcademicInformation[]> {
		return this.http.get<AcademicInformation[]>(`${this.apiUrl}/egresso/${cpf}`);
	}

	buscarPorInformacaoAcademica(id: string): Observable<AcademicInformation[]> {
		return this.http.get<AcademicInformation[]>(`${this.apiUrl}/editar/${id}`);
	}

	buscarCursoPorCpf(cpf: string): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/cursos/${cpf}`);
	}

	criarInformacaoAcademica(data: AcademicInformation): Observable<AcademicInformation> {
		return this.http.post<AcademicInformation>(this.apiUrl, data);
	}

	atualizarInformacaoAcademica(id: string, data: AcademicInformation): Observable<AcademicInformation> {
		return this.http.put<AcademicInformation>(`${this.apiUrl}/${id}`, data);
	}

	excluirInformacaoAcademica(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
