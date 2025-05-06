import { Component } from '@angular/core';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { PROFESSIONAL_INFO_MOCK } from '@app/features/graduates/professional-information/mocks/professional-information.mock';
import { TitleCollapseProfessionalInformationPipe } from '@shared/pipes';
import {
	GetCategoryDescriptionPipe,
	Getjob_levelDescriptionPipe,
	Getjob_typeDescriptionPipe,
	GetLocationDescriptionPipe,
} from '@features/graduates/professional-information/pipes';

@Component({
	selector: 'app-graduate-professional-information',
	standalone: true,
	imports: [
		ItemInfoComponent,
		CollapseItemComponent,
		CurrencyPipe,
		GetCategoryDescriptionPipe,
		Getjob_typeDescriptionPipe,
		GetLocationDescriptionPipe,
		Getjob_levelDescriptionPipe,
		DatePipe,
		NgTemplateOutlet,
		TitleCollapseProfessionalInformationPipe,
	],
	templateUrl: './professional-information.component.html',
	styleUrl: './professional-information.component.scss',
})
export class ProfessionalInformationComponent {
	data = PROFESSIONAL_INFO_MOCK;
}
