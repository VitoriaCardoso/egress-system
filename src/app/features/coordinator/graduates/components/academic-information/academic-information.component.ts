import { Component } from '@angular/core';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { TitleCollapseAcademicInformationPipe } from '@shared/pipes';
import { EDUCATION_HISTORY_MOCK } from '@features/graduates/academic-information/mocks/academic-information.mock';
import { AcademicInformation } from '@features/graduates/academic-information/models/academic-information.model';
import {
	Getcourse_levelDescriptionPipe,
	Getinstitution_typeDescriptionPipe,
} from '@features/graduates/academic-information/pipes';

@Component({
	selector: 'app-graduate-academic-information',
	standalone: true,
	imports: [
		ItemInfoComponent,
		CollapseItemComponent,
		Getinstitution_typeDescriptionPipe,
		Getcourse_levelDescriptionPipe,
		DatePipe,
		NgTemplateOutlet,
		TitleCollapseAcademicInformationPipe,
	],
	templateUrl: './academic-information.component.html',
	styleUrl: './academic-information.component.scss',
})
export class AcademicInformationComponent {
	data = EDUCATION_HISTORY_MOCK;
	informacaoAcademica: AcademicInformation[] = [];
}
