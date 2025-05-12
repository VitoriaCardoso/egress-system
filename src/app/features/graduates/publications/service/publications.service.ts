import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publications.model';

@Injectable({
	providedIn: 'root',
})
export class PublicationsService {
	private apiUrl = 'http://localhost:8080/api/publicacoes';

	constructor(private http: HttpClient) {}

	buscarPorEgresso(cpf: string): Observable<Publication[]> {
		return this.http.get<Publication[]>(`${this.apiUrl}/egresso/${cpf}`);
	}

	criar(publicacaoDTO: Publication): Observable<Publication> {
		return this.http.post<Publication>(this.apiUrl, publicacaoDTO);
	}

	atualizar(id: string, publicacaoDTO: Publication): Observable<Publication> {
		return this.http.put<Publication>(`${this.apiUrl}/${id}`, publicacaoDTO);
	}

	buscarPorId(id: string): Observable<Publication> {
		return this.http.get<Publication>(`${this.apiUrl}/${id}`);
	}

	excluir(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
