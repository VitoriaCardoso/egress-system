import { Component, inject, signal } from '@angular/core';
import { DateTimePickerComponent } from '@shared/components/date-time-picker/date-time-picker.component';
import { HasErrorPipe } from '@shared/pipes';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { PUBLICATION_MOCK } from '@app/features/graduates/publications/mocks/publications.mock';
import { RELATED_ACADEMIC_INFO_OPTIONS } from '@shared/mocks';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService } from '@shared/components/alert/alert.service';
import { ButtonDirective } from '@shared/directives/button';
import { FeedbackDirective } from '@shared/directives/feedback';
import { PublicationsService } from '../../service/publications.service';
import { InformacaoAcademicaService } from '../../../academic-information/service/academic-information.service';
import { CommonModule } from '@angular/common';
import { SelectOption } from '../../../../../shared/models/select.model';

@Component({
	selector: 'app-publications-form',
	standalone: true,
	imports: [
		DateTimePickerComponent,
		HasErrorPipe,
		InputComponent,
		SelectComponent,
		ButtonDirective,
		RouterLink,
		ReactiveFormsModule,
		FeedbackDirective,
		CommonModule,
	],
	templateUrl: './publications-form.component.html',
	styleUrls: ['./publications-form.component.scss'],
})
export class PublicationsFormComponent {
	form: FormGroup;
	mode = signal<'create' | 'edit'>('create');
	opcoes = <SelectOption[]>[];

	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _alertService = inject(AlertService);
	private _publicationsService = inject(PublicationsService);
	private _informacaoAcademicaService = inject(InformacaoAcademicaService);

	constructor() {
		const id = this._route.snapshot.paramMap.get('id');

		this.form = new FormGroup({
			titulo: new FormControl('', [Validators.required]),
			autores: new FormControl('', [Validators.required]),
			ano_publicacao: new FormControl('', [Validators.required]),
			veiculo: new FormControl('', [Validators.required]),
			informacao_academica: new FormControl('', [Validators.required]),
			url_publicacao: new FormControl('', [Validators.required]),
		});

		const cpf = '123.456.789-14';

		this._informacaoAcademicaService.buscarCursoPorCpf(cpf).subscribe({
			next: dados => {
				this.opcoes = dados;
				console.log(dados);
			},
			error: err => console.error('Erro ao buscar cursos:', err),
		});

		if (id) {
			this.mode.set('edit');
			this._publicationsService.buscarPorId(id).subscribe({
				next: pub => {
					this.form.patchValue({
						...pub,
						informacao_academica: pub.informacao_academica?.id,
					});
				},
				error: err => console.error('Erro ao carregar publicação:', err),
			});
		}
	}

	onSubmit() {
		if (this.form.invalid) {
			this._alertService.showAlert('warning', 'Preencha todos os campos obrigatórios.', 'Atenção.');
			this.form.markAllAsTouched();
			return;
		}

		const formValue = this.form.value;
		const publicacaoDTO = {
			...formValue,
			id_informacao_academica: formValue.informacao_academica,
		};

		const id = this._route.snapshot.paramMap.get('id');

		if (this.mode() === 'edit' && id) {
			this._publicationsService.atualizar(id, publicacaoDTO).subscribe({
				next: () => {
					this._alertService.showAlert('success', 'Publicação atualizada com sucesso!', 'Sucesso.');
					this._router.navigate(['/publicacoes']);
				},
				error: err => {
					this._alertService.showAlert('danger', 'Erro ao atualizar publicação.', 'Erro.');
					console.error(err);
				},
			});
		} else {
			this._publicationsService.criar(publicacaoDTO).subscribe({
				next: () => {
					this._alertService.showAlert('success', 'Publicação salva com sucesso!', 'Sucesso.');
					this._router.navigate(['/publicacoes']);
				},
				error: err => {
					this._alertService.showAlert('danger', 'Erro ao salvar publicação.', 'Erro.');
					console.error(err);
				},
			});
		}
	}

	onDelete() {
		console.log('Delete');
	}
}
