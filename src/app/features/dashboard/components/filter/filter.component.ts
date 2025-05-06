import { Component } from '@angular/core';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { ACADEMIC_SEMESTER_OPTIONS_MOCK } from '../../data/options.mock';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '@shared/directives/button';
import { FilterModel } from '../../models/filter.model';
import { CAMPUS_OPTIONS_MOCK, course_level_OPTIONS_MOCK } from '@shared/mocks';
import { COURSE_OPTIONS_MOCK } from '@shared/mocks/course.mock';

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
	academicSemesterOptions = ACADEMIC_SEMESTER_OPTIONS_MOCK;
	courseOptions = COURSE_OPTIONS_MOCK;
	course_levelOptions = course_level_OPTIONS_MOCK;
	campusOptions = CAMPUS_OPTIONS_MOCK;

	formGroupFilter = new FormGroup<FilterModel>({
		academicSemester: new FormControl(ACADEMIC_SEMESTER_OPTIONS_MOCK[0].value.toString()),
		course: new FormControl([]),
		titration: new FormControl([]),
		campus: new FormControl([CAMPUS_OPTIONS_MOCK[0].value.toString()]),
	});

	submit() {
		console.log(this.formGroupFilter.value);
	}

	onReset() {
		this.formGroupFilter.reset();
	}
}
