import { Component, OnInit, inject } from '@angular/core';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { PROFESSIONAL_INFO_MOCK } from './mocks/professional-information.mock';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@shared/directives/button';
import { TitleCollapseProfessionalInformationPipe } from '@shared/pipes';
import { ProfessionalInfo } from './models/professional-information.model';
import { ProfessionalInformationService } from '../professional-information/service/professional-information.service';
import { AuthService } from '@core/auth/services/auth.service';

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
	//data = PROFESSIONAL_INFO_MOCK; //Para utilizar o mock
	data: ProfessionalInfo[] = [];
	cpf: string = '';
	private _authService = inject(AuthService);

	constructor(private professionalAcademic: ProfessionalInformationService) {}

	ngOnInit(): void {
		this.cpf = this._authService.getCpf();
		this.buscarPublicacoes();
	}

	buscarPublicacoes(): void {
		this.professionalAcademic.buscarPorEgressoCpf(this.cpf).subscribe({
			next: res => {
				console.log(res);
				this.data = res;
			},
			error: err => {
				console.error('Erro ao buscar publicações:', err);
			},
		});
	}
}
