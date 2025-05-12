import { Component, OnInit } from '@angular/core';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { PUBLICATION_MOCK } from '@app/features/graduates/publications/mocks/publications.mock';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@shared/directives/button';
import { PublicationsService } from '../publications/service/publications.service';
import { Publication } from '../publications/models/publications.model';

@Component({
	selector: 'app-publications',
	standalone: true,
	imports: [ItemInfoComponent, CollapseItemComponent, RouterLink, ButtonDirective],
	templateUrl: './publications.component.html',
	styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
	//data = PUBLICATION_MOCK;  //Para utilizar o mock
	data: Publication[] = [];
	cpf: string = '';

	constructor(private publicationsService: PublicationsService) {}

	ngOnInit(): void {
		this.cpf = '123.456.789-14';
		this.buscarPublicacoes();
	}

	buscarPublicacoes(): void {
		this.publicationsService.buscarPorEgresso(this.cpf).subscribe({
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
