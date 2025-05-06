import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonDirective } from '@shared/directives/button';
import { FeedbackDirective } from '@shared/directives/feedback';
import { AlertService } from '@shared/components/alert/alert.service';
import { profileMock } from '../../mocks/profile.mock';

@Component({
	selector: 'app-profile-edit',
	standalone: true,
	imports: [ItemInfoComponent, InputComponent, ReactiveFormsModule, ButtonDirective, FeedbackDirective],
	templateUrl: './profile-edit.component.html',
	styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
	form: FormGroup;
	data = profileMock;
	alertService = inject(AlertService);
	router = inject(Router);

	constructor() {
		this.form = new FormGroup({
			nome: new FormControl({ value: this.data.nome, disabled: true }, Validators.required),
			nome_social: new FormControl({ value: this.data.nome_social, disabled: false }, Validators.required),
			cpf: new FormControl({ value: this.data.cpf, disabled: true }, Validators.required),
			email: new FormControl({ value: this.data.email, disabled: true }, [Validators.required, Validators.email]),
			email_secundario: new FormControl(this.data.email_secundario, [Validators.email]),
			phone: new FormControl(this.data.telefone, Validators.required),
			telefone_secundario: new FormControl(this.data.telefone_secundario),
			link_lattes: new FormControl(this.data.link_lattes),
			link_orcid: new FormControl(this.data.link_orcid),
			link_linkedin: new FormControl(this.data.link_linkedin),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			console.log(this.form.value);
			this.alertService.showAlert('success', 'Dados salvos com êxito!', 'Sucesso.');
			this.router.navigate(['/perfil']);
		}
	}
}
