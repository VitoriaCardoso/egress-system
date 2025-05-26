import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { ButtonDirective } from '@shared/directives/button';
import { profileMock } from './mocks/profile.mock';
import { EgressoModel } from '../profile/models/profile-model';
import { EgressoService } from '../profile/service/egresso.service';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ItemInfoComponent, ButtonDirective, RouterLink],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	data: EgressoModel;
	private _authService = inject(AuthService);

	constructor(private egressoService: EgressoService) {}

	ngOnInit(): void {
		const cpf = this._authService.getCpf();
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
