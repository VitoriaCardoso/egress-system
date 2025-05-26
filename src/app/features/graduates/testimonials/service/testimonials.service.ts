import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonials.model';

@Injectable({
	providedIn: 'root',
})
export class TestimonialsService {
	private apiUrl = 'http://localhost:8080/api/depoimentos';

	constructor(private http: HttpClient) {}

	buscarPorId(id: string): Observable<Testimonial> {
		return this.http.get<Testimonial>(`${this.apiUrl}/${id}`);
	}

	criar(depoimentoDTO: Testimonial): Observable<Testimonial> {
		return this.http.post<Testimonial>(this.apiUrl, depoimentoDTO);
	}

	excluir(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	listarPorCpf(cpf: string): Observable<Testimonial[]> {
		return this.http.get<Testimonial[]>(`${this.apiUrl}/egresso/${cpf}`);
	}

	atualizar(id: string, dto: any): Observable<Testimonial> {
		return this.http.put<Testimonial>(`${this.apiUrl}/${id}`, dto);
	}
}
