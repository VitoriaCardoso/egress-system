import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectOption } from '../../../shared/models/select.model';
import { FilterModel } from '../../dashboard/models/filter.model';
import { Course } from '../../dashboard/models/course.model';
import { StudentTestimony } from '../../dashboard/models/titration.model';

@Injectable({
	providedIn: 'root',
})
export class DashboardService {
	private apiUrl = 'http://localhost:8080/api/dashboard';

	constructor(private http: HttpClient) {}

	getStatusEstudantes(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/estudantes/status`);
	}

	getNivelEstudantes(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/estudantes/nivel`);
	}

	getCampusEstudantes(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/estudantes/campus`);
	}

	getCampi(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/campus`);
	}

	getCursos(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/cursos`);
	}

	getTitulacoes(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/titulacoes`);
	}

	getSemestres(): Observable<SelectOption[]> {
		return this.http.get<SelectOption[]>(`${this.apiUrl}/semestres`);
	}

	getDepoimentos(): Observable<StudentTestimony[]> {
		return this.http.get<StudentTestimony[]>(`${this.apiUrl}/depoimentos`);
	}

	getCursoCampusTitulacao(
		campus?: string,
		semestre?: string,
		titulacao?: string,
		curso?: string
	): Observable<Course[]> {
		let params = new HttpParams();
		if (campus) params = params.set('campus', campus);
		if (semestre) params = params.set('semestre', semestre);
		if (titulacao) params = params.set('titulacao', titulacao);
		if (curso) params = params.set('curso', curso);

		return this.http.get<Course[]>(`${this.apiUrl}/estudantes/curso-campus-titulacao`, { params });
	}
}
