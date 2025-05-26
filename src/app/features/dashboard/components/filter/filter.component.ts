import { Component, Output, EventEmitter } from '@angular/core';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { ACADEMIC_SEMESTER_OPTIONS_MOCK } from '../../data/options.mock';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '@shared/directives/button';
import { FilterModel } from '../../models/filter.model';
import { DashboardService } from '../../service/dashboard.service';
import { CAMPUS_OPTIONS_MOCK, course_level_OPTIONS_MOCK } from '@shared/mocks';
import { COURSE_OPTIONS_MOCK } from '@shared/mocks/course.mock';
import { Course } from '../../models/course.model';

@Component({
	selector: 'app-dashboard-filter',
	standalone: true,
	imports: [
		CollapseItemComponent,
		SelectComponent,
		MultiSelectComponent,
		ButtonDirective,
		FormsModule,
		ReactiveFormsModule,
	],
	host: {
		class: 'd-flex w-100 mb-5',
	},
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss',
})
export class FilterComponent {
	semestreOptions = ACADEMIC_SEMESTER_OPTIONS_MOCK;
	courseOptions = COURSE_OPTIONS_MOCK;
	course_levelOptions = course_level_OPTIONS_MOCK;
	campusOptions = CAMPUS_OPTIONS_MOCK;

	@Output() filteredCourses = new EventEmitter<Course[]>();

	constructor(private dashboardService: DashboardService) {}

	formGroupFilter = new FormGroup<FilterModel>({
		semestre: new FormControl<string>(''),
		curso: new FormControl<string[]>([]),
		titulacao: new FormControl<string[]>([]),
		campus: new FormControl<string[]>([]),
	});

	submit(): void {
		const { semestre, curso, titulacao, campus } = this.formGroupFilter.getRawValue();

		this.dashboardService
			.getCursoCampusTitulacao(
				campus?.length ? campus.join(',') : undefined,
				semestre ?? undefined,
				titulacao?.length ? titulacao.join(',') : undefined,
				curso?.length ? curso.join(',') : undefined
			)
			.subscribe({
				next: data => {
					console.log('Cursos filtrados', data);
					this.filteredCourses.emit(data);
				},
				error: err => console.log(err),
			});
	}

	onReset(): void {
		this.formGroupFilter.reset();
		this.filteredCourses.emit([]);
	}
}
