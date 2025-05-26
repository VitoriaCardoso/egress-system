import { Component, inject, OnInit } from '@angular/core';
import { PageEvent, PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { Columns, TableComponent } from '../../../../shared/components/table/table.component';
import { testimonialsPaginationMock } from '../../data/table-testimonials.mock';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { TestimonyDetailsDialogComponent } from '../../dialogs/testimony-details-dialog/testimony-details-dialog.component';
import { StudentTestimony } from '../../models/titration.model';
import { StudentPagination } from '../../models/titration.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
	selector: 'app-testimonials-list',
	standalone: true,
	imports: [PaginatorComponent, TableComponent, DialogModule],
	templateUrl: './testimonials-list.component.html',
	styleUrl: './testimonials-list.component.scss',
})
export class TestimonialsListComponent implements OnInit {
	columns: Array<Columns> = [
		{ columnDef: 'nome', header: 'Nome', cell: (el: StudentTestimony) => `${el.nome}` },
		{ columnDef: 'course', header: 'Curso', cell: (el: StudentTestimony) => `${el.courseName}` },
		{ columnDef: 'courseLevel', header: 'Titulação', cell: (el: StudentTestimony) => `${el.courseLevel}` },
		{ columnDef: 'campus', header: 'Campus', cell: (el: StudentTestimony) => `${el.campus}` },
		{
			columnDef: 'action',
			header: 'Ação',
			type: 'icon',
			cell: () => `fa-eye`,
			value: (testimony: StudentTestimony) => this.showTestimony(testimony),
		},
	];

	allTestimonials: StudentTestimony[] = [];
	dataPaginated: StudentTestimony[] = [];
	pageSize = 10;
	currentPage = 0;

	dialog = inject(Dialog);

	constructor(private dashboardService: DashboardService) {}

	ngOnInit(): void {
		this.dashboardService.getDepoimentos().subscribe(dados => {
			console.log('Dados brutos recebidos:', dados);
			this.allTestimonials = dados.map(d => ({
				nome: d.nome,
				courseName: d.courseName,
				courseLevel: d.courseLevel,
				campus: d.campus,
				textoDepoimento: {
					title: `Depoimento de ${d.nome}`,
					textoDepoimento: typeof d.textoDepoimento === 'string' ? d.textoDepoimento : '',
				},
			}));
			this.updatePaginatedData();
		});
	}

	showTestimony(testimony: StudentTestimony) {
		this.dialog.open(TestimonyDetailsDialogComponent, {
			width: '780px',
			autoFocus: false,
			data: { ...testimony.textoDepoimento },
		});
	}

	onPageChange(ev: PageEvent) {
		this.pageSize = ev.pageSize;
		this.currentPage = ev.pageIndex;
		this.updatePaginatedData();
	}

	private updatePaginatedData() {
		const start = this.currentPage * this.pageSize;
		const end = start + this.pageSize;
		this.dataPaginated = this.allTestimonials.slice(start, end);
	}
}
