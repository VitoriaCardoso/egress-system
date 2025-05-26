import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '@shared/components/alert/alert.service';
import { ButtonDirective } from '@shared/directives/button';
import { DateTimePickerComponent } from '@shared/components/date-time-picker/date-time-picker.component';
import { InputComponent } from '@shared/components/input/input.component';
import { TextareaComponent } from '@shared/components/textarea/textarea.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { SelectOptions } from '@shared/models/select.model';
import { PRIVACY_OPTIONS, TESTIMONIALS_MOCK } from '../../mocks/testimonials.mock';
import { RELATED_ACADEMIC_INFO_OPTIONS } from '@shared/mocks/related-academic-info.mock';
import { RadioComponent } from '@shared/components/radio/radio.component';
import { FeedbackDirective } from '@shared/directives/feedback';
import { HasErrorPipe } from '@shared/pipes';
import { Dialog } from '@angular/cdk/dialog';
import { TestimonialsService } from '../../service/testimonials.service';
import { SelectOption } from '../../../../../shared/models/select.model';
import { PublicationsService } from '../../../publications/service/publications.service';
import { InformacaoAcademicaService } from '../../../academic-information/service/academic-information.service';
import { ConsentDialogComponent } from '@app/features/graduates/testimonials/dialogs/consent-dialog/consent-dialog.component';

const privacyMap = {
	public: 'Público',
	private: 'Privado',
	anonymous: 'Anônimo',
};
@Component({
	selector: 'app-testimonials-form',
	standalone: true,
	imports: [
		ButtonDirective,
		DateTimePickerComponent,
		InputComponent,
		TextareaComponent,
		SelectComponent,
		ReactiveFormsModule,
		RadioComponent,
		FeedbackDirective,
		HasErrorPipe,
	],
	templateUrl: './testimonials-form.component.html',
	styleUrl: './testimonials-form.component.scss',
})
export class TestimonialsFormComponent {
	form = new FormGroup({
		texto_depoimento: new FormControl('', Validators.required),
		informacaoAcademica: new FormControl('', Validators.required),
		privacidade: new FormControl('', Validators.required),
	});

	mode = signal<'create' | 'edit'>('create');

	id = '';
	route = inject(ActivatedRoute);
	router = inject(Router);
	alertService = inject(AlertService);
	informacaoAcademicaOpcoes: SelectOptions = RELATED_ACADEMIC_INFO_OPTIONS;
	privacyOptions = PRIVACY_OPTIONS;
	dialog = inject(Dialog);
	opcoes = <SelectOption[]>[];
	private _publicationsService = inject(PublicationsService);
	private _informacaoAcademicaService = inject(InformacaoAcademicaService);
	private _testemonialService = inject(TestimonialsService);

	constructor() {
		const id = this.route.snapshot.paramMap.get('id');

		this.route.paramMap.subscribe(params => {
			const id = params.get('id');

			this.mode.set(id ? 'edit' : 'create');
			this.id = id;

			if (id) {
				this.mode.set('edit');
				this._testemonialService.buscarPorId(id).subscribe({
					next: pub => {
						this.form.patchValue({
							...pub,
							informacaoAcademica: pub.informacaoAcademica?.id,
						});
					},
					error: err => console.error('Erro ao carregar publicação:', err),
				});
			}
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
						informacaoAcademica: pub.informacao_academica?.id,
					});
				},
				error: err => console.error('Erro ao carregar publicação:', err),
			});
		}
	}

	onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.alertService.showAlert('danger', 'Preencha todos os campos obrigatórios');
			return;
		}

		const formValue = this.form.value;

		const testimonialsDTO = {
			texto_depoimento: formValue.texto_depoimento,
			privacidade: privacyMap[formValue.privacidade],
			id_informacao_academica: formValue.informacaoAcademica,
		};

		if (this.mode() === 'create') {
			this.createTestimonial(testimonialsDTO);
		} else {
			this.editTestimonial();
		}
	}

	private createTestimonial(dto: any) {
		const dialogRef = this.dialog.open(ConsentDialogComponent, {
			maxWidth: '500px',
			panelClass: 'consent',
		});

		dialogRef.closed.subscribe((confirmed: boolean) => {
			if (confirmed) {
				this._testemonialService.criar(dto).subscribe({
					next: () => {
						this.router.navigate(['/depoimentos']).then(() => {
							this.alertService.showAlert('success', 'Depoimento salvo com sucesso');
						});
					},
					error: () => {
						console.log(dto);
						this.alertService.showAlert('danger', 'Erro ao salvar depoimento');
					},
				});
			}
		});
	}

	private editTestimonial() {
		const formValue = this.form.value;

		const dto = {
			texto_depoimento: formValue.texto_depoimento,
			privacidade: privacyMap[formValue.privacidade],
			id_informacao_academica: formValue.informacaoAcademica,
		};

		this._testemonialService.atualizar(this.id, dto).subscribe({
			next: () => {
				this.router.navigate(['/depoimentos']).then(() => {
					this.alertService.showAlert('success', 'Depoimento editado com sucesso');
				});
			},
			error: () => {
				this.alertService.showAlert('danger', 'Erro ao editar depoimento');
			},
		});
	}

	deleteTestimonial() {
		if (!this.id) return;

		// Confirmação opcional
		const confirmDelete = confirm('Tem certeza que deseja excluir este depoimento?');

		if (!confirmDelete) return;

		this._testemonialService.excluir(this.id).subscribe({
			next: () => {
				this.router.navigate(['/depoimentos']).then(() => {
					this.alertService.showAlert('success', 'Depoimento excluído com sucesso');
				});
			},
			error: () => {
				this.alertService.showAlert('danger', 'Erro ao excluir depoimento');
			},
		});
	}
}
