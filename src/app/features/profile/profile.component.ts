import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { ButtonDirective } from '@shared/directives/button';
import { profileMock } from './mocks/profile.mock';
import { EgressoModel } from '../profile/models/profile-model';
import { EgressoService } from '../profile/service/egresso.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ItemInfoComponent, ButtonDirective, RouterLink],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	data: EgressoModel;

	constructor(private egressoService: EgressoService) {}

	ngOnInit(): void {
		const cpf = '123.456.789-14';
		this.egressoService.buscarEgressoPorCPF(cpf).subscribe({
			next: res => {
				this.data = res;
				console.log('Dados do egresso carregados:', this.data);
			},
			error: err => {
				console.error('Erro ao carregar dados do egresso:', err);
			},
		});
	}
}
