import { Component, OnInit } from '@angular/core';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { PROFESSIONAL_INFO_MOCK } from './mocks/professional-information.mock';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@shared/directives/button';
import { TitleCollapseProfessionalInformationPipe } from '@shared/pipes';
import { ProfessionalInfo } from './models/professional-information.model';

import {
	GetCategoryDescriptionPipe,
	Getjob_levelDescriptionPipe,
	Getjob_typeDescriptionPipe,
	GetLocationDescriptionPipe,
} from '@features/graduates/professional-information/pipes';

@Component({
	selector: 'app-professional-information',
	standalone: true,
	imports: [
		CollapseItemComponent,
		ItemInfoComponent,
		DatePipe,
		CurrencyPipe,
		RouterLink,
		Getjob_levelDescriptionPipe,
		GetLocationDescriptionPipe,
		Getjob_typeDescriptionPipe,
		GetCategoryDescriptionPipe,
		ButtonDirective,
		TitleCollapseProfessionalInformationPipe,
	],
	templateUrl: './professional-information.component.html',
	styleUrl: './professional-information.component.scss',
})
export class ProfessionalInformationComponent implements OnInit {
	data = PROFESSIONAL_INFO_MOCK;
	professionalInfo: ProfessionalInfo;

	constructor() {
		//this.professionalInfo = new ProfessionalInfo();
	}

	ngOnInit(): void {
		this.professionalInfo;
	}
}
