import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@shared/directives/button';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { EDUCATION_HISTORY_MOCK } from './mocks/academic-information.mock';
import { OptionLabelPipe, TitleCollapseAcademicInformationPipe } from '@shared/pipes';
import { AcademicInformation } from './models/academic-information.model';
import {
	Getcourse_levelDescriptionPipe,
	Getinstitution_typeDescriptionPipe,
} from '@features/graduates/academic-information/pipes';
import { InformacaoAcademicaService } from '../academic-information/service/academic-information.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-academic-information',
	standalone: true,
	imports: [
		ButtonDirective,
		ItemInfoComponent,
		CollapseItemComponent,
		DatePipe,
		RouterLink,
		OptionLabelPipe,
		Getinstitution_typeDescriptionPipe,
		Getcourse_levelDescriptionPipe,
		TitleCollapseAcademicInformationPipe,
	],
	templateUrl: './academic-information.component.html',
	styleUrl: './academic-information.component.scss',
})
export class AcademicInformationComponent implements OnInit {
	//data = EDUCATION_HISTORY_MOCK;
	data: AcademicInformation[] = [];
	cpf!: string;

	constructor(
		private academicService: InformacaoAcademicaService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.cpf = '123.456.789-14';
			console.log('CPF capturado da rota:', this.cpf);
			if (this.cpf) {
				this.carregarInformacoes();
			}
		});
	}

	carregarInformacoes(): void {
		this.academicService.buscarPorEgresso(this.cpf).subscribe({
			next: res => {
				this.data = res;
				console.log('Dados:', this.data);
			},
			error: err => {
				console.error('Erro ao carregar informações acadêmicas:', err);
			},
		});
	}
}
