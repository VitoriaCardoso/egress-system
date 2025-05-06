import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EgressoModel } from '../models/profile-model';

@Injectable({
	providedIn: 'root',
})
export class EgressoService {
	private apiUrl = 'http://localhost:8080/api/egressos';

	constructor(private http: HttpClient) {}

	buscarTodosEgressos(): Observable<EgressoModel[]> {
		return this.http.get<EgressoModel[]>(this.apiUrl);
	}

	buscarEgressoPorCPF(cpf: string): Observable<EgressoModel> {
		return this.http.get<EgressoModel>(`${this.apiUrl}/${cpf}`);
	}

	atualizarEgresso(cpf: string, egressoDTO: Partial<EgressoModel>): Observable<EgressoModel> {
		return this.http.put<EgressoModel>(`${this.apiUrl}/${cpf}`, egressoDTO);
	}
}
