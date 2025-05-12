import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonDirective } from '@shared/directives/button';
import { FeedbackDirective } from '@shared/directives/feedback';
import { AlertService } from '@shared/components/alert/alert.service';
import { profileMock } from '../../mocks/profile.mock';
import { EgressoService } from '../../service/egresso.service';
import { EgressoModel } from '../..//models/profile-model';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-profile-edit',
	standalone: true,
	imports: [ItemInfoComponent, InputComponent, RouterLink, ReactiveFormsModule, ButtonDirective, FeedbackDirective],
	templateUrl: './profile-edit.component.html',
	styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
	form: FormGroup;
	data = profileMock;
	profile: EgressoModel;
	mode = signal<'edit'>('edit');
	cpf!: string;

	alertService = inject(AlertService);
	router = inject(Router);
	egressoService = inject(EgressoService);

	constructor(service: EgressoService) {}

	ngOnInit() {
		this.carregarInformacaoEgressos();
		this.inicializarFormulario();
	}

	inicializarFormulario() {
		this.form = new FormGroup({
			nome: new FormControl('', Validators.required),
			nome_social: new FormControl(''),
			cpf: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			email_secundario: new FormControl('', [Validators.email]),
			telefone: new FormControl('', Validators.required),
			telefone_secundario: new FormControl(''),
			link_lattes: new FormControl(''),
			link_orcid: new FormControl(''),
			link_linkedin: new FormControl(''),
		});
	}

	carregarInformacaoEgressos() {
		/*if (!this.cpf) {
		console.error('Nenhum ID foi encontrado na rota.');
		return;
	}*/

		this.egressoService.buscarEgressoPorCPF('123.456.789-14').subscribe(
			data => {
				console.log('Dados recebidos:', data);
				this.profile = data;

				this.form.patchValue({
					nome: this.profile.nome,
					nome_social: this.profile.nome_social,
					cpf: this.profile.cpf || '',
					email: this.profile.email,
					email_secundario: this.profile.email_secundario,
					telefone: this.profile.telefone,
					telefone_secundario: this.profile.telefone_secundario || '',
					link_lattes: this.profile.link_lattes,
					link_orcid: this.profile.link_orcid,
					link_linkedin: this.profile.link_linkedin,
				});
			},
			error => {
				console.error('Erro ao buscar dados:', error);
			}
		);
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.alertService.showAlert('warning', 'Preencha todos os campos obrigatórios.', 'Atenção.');
			this.form.markAllAsTouched();
			return;
		}

		const formData = this.form.getRawValue();
		console.log(formData);

		this.egressoService.atualizarEgresso(this.profile.cpf, formData).subscribe(
			updatedEgresso => {
				console.log('Egresso atualizado com sucesso', updatedEgresso);
				this.alertService.showAlert('success', 'Dados salvos com êxito!', 'Sucesso.');
				this.router.navigate(['/perfil']); // Navega para a página de perfil após o sucesso
			},
			error => {
				console.error('Erro ao atualizar o egresso', error);
			}
		);
	}
}
