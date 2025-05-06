import { Component, inject } from '@angular/core';
import { FilterComponent } from '@app/features/coordinator/graduates/components/filter/filter.component';
import { Columns, TableAction, TableComponent } from '@shared/components/table/table.component';
import { PAGINATION_GRADUATES_MOCK } from '@app/features/coordinator/graduates/mocks/graduates.mock';
import { Graduate } from '@app/features/coordinator/graduates/models/graduate.model';
import { PageEvent, PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-graduates',
	standalone: true,
	imports: [FilterComponent, TableComponent, PaginatorComponent],
	templateUrl: './graduates.component.html',
	styleUrl: './graduates.component.scss',
})
export class GraduatesComponent {
	columns: Array<Columns> = [
		{
			columnDef: 'name',
			header: 'Nome do Egresso',
			cell: (element: Graduate) => `${element.graduateName}`,
		},
		{
			columnDef: 'course_name',
			header: 'Nome do Curso',
			cell: (element: Graduate) => `${element.course_name}`,
		},
		{
			columnDef: 'course_level',
			header: 'Nível do Curso',
			cell: (element: Graduate) => `${element.course_level}`,
		},
		{
			columnDef: 'campus',
			header: 'Campus',
			cell: (element: Graduate) => `${element.campus}`,
		},
		{
			columnDef: 'admission_date',
			header: 'Data Ingresso',
			type: 'date',
			cell: (element: Graduate) => `${element.admissionDate}`,
		},
		{
			columnDef: 'completion_date',
			header: 'Data Conclusão',
			type: 'date',
			cell: (element: Graduate) => `${element.completionDate}`,
		},
		{
			columnDef: 'action',
			header: 'Ação',
			type: 'icon',
			cell: () => `fa-eye`,
			value: (graduate: Graduate) => this.redirectDetails(graduate.id),
		},
	];

	graduatePagination = PAGINATION_GRADUATES_MOCK;
	dataPaginated = PAGINATION_GRADUATES_MOCK.data.slice(0, PAGINATION_GRADUATES_MOCK.pageSize);
	router = inject(Router);
	actions: TableAction[] = [
		{
			label: 'Exportar',
			action: () => this.onExport(),
		},
	];

	onPageChange(pageEvent: PageEvent) {
		const start = (pageEvent.pageIndex - 1) * pageEvent.pageSize;
		const end = start + pageEvent.pageSize;
		this.dataPaginated = this.graduatePagination.data.slice(start, end);
	}

	onExport() {
		console.log('Exporting data');
	}

	private redirectDetails(id: number) {
		this.router.navigate(['egressos/detalhes', id]);
	}
}
