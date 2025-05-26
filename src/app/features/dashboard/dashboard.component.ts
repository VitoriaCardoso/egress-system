import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { HeaderComponent } from '@shared/components/header/header.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { MenuComponent } from '@shared/components/menu/menu.component';
import { BreadcrumbComponent } from '@shared/components/breadcrump/breadcrumb.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { Columns, TableComponent } from '@shared/components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { PageEvent, PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { StudentsChartComponent } from './components/students-chart/students-chart.component';
import { TotalPerCampusChartComponent } from './components/total-per-campus-chart/total-per-campus-chart.component';
import { TotalPerTitrationChartComponent } from './components/total-per-titration-chart/total-per-titration-chart.component';
import { TestimonialsListComponent } from './components/testimonials-list/testimonials-list.component';

import { coursesPaginationMock } from './data/table-course.mock';
import { Course } from './models/course.model';
import { DashboardService } from './service/dashboard.service';
interface CoursesPagination {
	data: Course[];
	length: number;
	pageSize: number;
	pageIndex: number; // sempre zero-based
}

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		HeaderComponent,
		AlertComponent,
		MenuComponent,
		BreadcrumbComponent,
		RouterModule,
		FooterComponent,
		FilterComponent,
		TableComponent,
		PaginatorComponent,
		StudentsChartComponent,
		TotalPerCampusChartComponent,
		NgxSkeletonLoaderModule,
		TotalPerTitrationChartComponent,
		TestimonialsListComponent,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
	columns: Columns[] = [
		{ columnDef: 'curso', header: 'Curso', cell: (c: Course) => `${c.curso}` },
		{ columnDef: 'titulacao', header: 'Titulação', cell: (c: Course) => `${c.titulacao}` },
		{ columnDef: 'campus', header: 'Campus', cell: (c: Course) => `${c.campus}` },
		{ columnDef: 'total', header: 'Estudantes', cell: (c: Course) => `${c.total}` },
	];

	dataPaginated: Course[] = [];

	coursesPagination: CoursesPagination = {
		...coursesPaginationMock,
		pageIndex: 0,
	};

	private originalData: Course[] = [];

	protected readonly Array = Array;

	constructor(private dashboardService: DashboardService) {}

	ngOnInit(): void {
		this.dashboardService.getCursoCampusTitulacao(undefined, undefined, undefined, undefined).subscribe({
			next: data => {
				this.originalData = data;

				this.coursesPagination = {
					data,
					length: data.length,
					pageSize: 10,
					pageIndex: 0,
				};

				this.updatePaginatedData();
			},
			error: err => console.error(err),
		});
	}

	onFilteredCourses(filtered: Course[]) {
		const source = filtered?.length ? filtered : this.originalData;

		this.coursesPagination = {
			...this.coursesPagination,
			data: source,
			length: source.length,
			pageIndex: 0,
		};

		console.log('Página atualizada', this.coursesPagination);

		this.updatePaginatedData();
	}

	onPageChange(event: PageEvent): void {
		this.coursesPagination = {
			...this.coursesPagination,
			pageSize: event.pageSize,
			pageIndex: event.pageIndex,
		};

		this.updatePaginatedData();
	}

	private updatePaginatedData(): void {
		const { pageIndex, pageSize, data } = this.coursesPagination;
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		this.dataPaginated = data.slice(start, end);
	}
}
