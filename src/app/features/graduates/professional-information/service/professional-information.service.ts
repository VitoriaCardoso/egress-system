import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfessionalInfo } from '@features/graduates/professional-information/models/professional-information.model';

@Injectable({
	providedIn: 'root',
})
export class ProfessionalInformationService {
	private apiUrl = 'http://localhost:8080/api/informacoes/profissionais';

	constructor(private http: HttpClient) {}

	listarTodos(): Observable<ProfessionalInfo[]> {
		return this.http.get<ProfessionalInfo[]>(this.apiUrl);
	}

	listarPorId(id: string): Observable<ProfessionalInfo> {
		return this.http.get<ProfessionalInfo>(`${this.apiUrl}/editar/${id}`);
	}

	buscarPorEgressoCpf(cpf: string): Observable<ProfessionalInfo[]> {
		return this.http.get<ProfessionalInfo[]>(`${this.apiUrl}/egresso/${cpf}`);
	}

	criar(dto: ProfessionalInfo): Observable<ProfessionalInfo> {
		return this.http.post<ProfessionalInfo>(this.apiUrl, dto);
	}

	atualizar(id: string, dto: ProfessionalInfo): Observable<ProfessionalInfo> {
		return this.http.put<ProfessionalInfo>(`${this.apiUrl}/${id}`, dto);
	}

	excluir(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
