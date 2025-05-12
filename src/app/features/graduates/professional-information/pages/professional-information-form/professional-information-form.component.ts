import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimePickerComponent } from '@shared/components/date-time-picker/date-time-picker.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { AlertService } from '@shared/components/alert/alert.service';
import { SelectOptions } from '@shared/models/select.model';
import { ButtonDirective } from '@shared/directives/button';
import { ProfessionalInfo } from '../../models/professional-information.model';
import { ProfessionalInformationService } from '../../service/professional-information.service';
import {
	CATEGORY_OPTIONS_MOCK,
	JOB_LEVEL_OPTIONS_MOCK,
	JOB_TYPE_OPTIONS_MOCK,
	LOCATION_OPTIONS_MOCK,
	PROFESSIONAL_INFO_MOCK,
} from '../../mocks/professional-information.mock';
import { RELATED_ACADEMIC_INFO_OPTIONS } from '@shared/mocks';
import { FeedbackDirective } from '@shared/directives/feedback';
import { HasErrorPipe } from '@shared/pipes';

@Component({
	selector: 'app-professional-information-form',
	standalone: true,
	imports: [
		DateTimePickerComponent,
		InputComponent,
		SelectComponent,
		ReactiveFormsModule,
		ButtonDirective,
		FeedbackDirective,
		HasErrorPipe,
	],
	templateUrl: './professional-information-form.component.html',
	styleUrl: './professional-information-form.component.scss',
})
export class ProfessionalInformationFormComponent implements OnInit {
	form: FormGroup;
	data = PROFESSIONAL_INFO_MOCK;
	professionalInfo: ProfessionalInfo;
	mode = signal<'create' | 'edit'>('create');
	id?: string;
	job_levelOptions: SelectOptions = JOB_LEVEL_OPTIONS_MOCK;
	job_typeOptions: SelectOptions = JOB_TYPE_OPTIONS_MOCK;
	categoryOptions: SelectOptions = CATEGORY_OPTIONS_MOCK;
	locationOptions: SelectOptions = LOCATION_OPTIONS_MOCK;
	informacaoAcademicaOpcoes: SelectOptions = RELATED_ACADEMIC_INFO_OPTIONS;

	maxDate = new Date();
	route = inject(ActivatedRoute);
	router = inject(Router);
	alertService = inject(AlertService);

	constructor(private service: ProfessionalInformationService) {}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		this.inicializarFormulario();
		this.carregarInformacaoProfissonal();
		this.criarEditarFormulario();
	}

	criarEditarFormulario() {
		this.route.paramMap.subscribe(params => {
			const id = params.get('id');

			this.mode.set(id ? 'edit' : 'create');
			this.id = id;

			if (id) {
				this.service.listarPorId(id).subscribe({
					next: data => {
						if (Array.isArray(data) && data.length > 0) {
							const info: ProfessionalInfo = data[0];

							this.form.patchValue({
								company_name: info.company_name,
								job_title: info.job_title || '',
								job_level: info.job_level,
								job_type: info.job_type || '',
								category: info.category,
								location: info.location,
								start_date: info.start_date,
								end_date: info.end_date,
								salary: info.salary,
								function: info.function,
								relatedAcademicInfo: info.relatedAcademicInfo,
							});
						}
					},
					error: err => {
						console.error('Erro ao buscar dados para edição:', err);
					},
				});
			}
		});
	}

	inicializarFormulario() {
		this.form = new FormGroup({
			company_name: new FormControl(null, [Validators.required]),
			job_title: new FormControl(null, [Validators.required]),
			job_level: new FormControl(null, [Validators.required]),
			job_type: new FormControl(null, [Validators.required]),
			category: new FormControl(null, [Validators.required]),
			location: new FormControl(null, [Validators.required]),
			start_date: new FormControl(null, [Validators.required]),
			end_date: new FormControl(null),
			salary: new FormControl(null),
			function: new FormControl(null),
			relatedAcademicInfo: new FormControl(null, [Validators.required]),
		});
	}

	carregarInformacaoProfissonal() {
		if (!this.id) {
			console.error('Nenhum ID foi encontrado na rota.');
			return;
		}

		this.service.listarPorId(this.id).subscribe(
			data => {
				console.log('Dados recebidos:', data);

				this.professionalInfo = data;

				this.form.patchValue({
					company_name: this.professionalInfo.company_name,
					job_title: this.professionalInfo.job_title || '',
					job_level: this.professionalInfo.job_level,
					job_type: this.professionalInfo.job_type || '',
					category: this.professionalInfo.category,
					location: this.professionalInfo.location,
					start_date: this.professionalInfo.start_date,
					end_date: this.professionalInfo.end_date || '',
					salary: this.professionalInfo.salary,
					function: this.professionalInfo.function,
					relatedAcademicInfo: this.professionalInfo.relatedAcademicInfo,
				});
			},
			error => {
				console.error('Erro ao buscar dados:', error);
			}
		);
	}

	onSubmit() {
		if (this.form.invalid) {
			this.alertService.showAlert('warning', 'Preencha todos os campos obrigatórios.', 'Atenção.');
			this.form.markAllAsTouched();
			return;
		}

		const formData = this.form.value;

		if (this.mode() === 'create') {
			this.service.criar(formData).subscribe({
				next: () => {
					this.alertService.showAlert('success', 'Informação profissional criada com sucesso!', 'Sucesso.');
					this.router.navigate(['/informacoes/profissionais']);
				},
				error: () => {
					this.alertService.showAlert('danger', 'Erro ao salvar os dados.', 'Erro.');
				},
			});
		} else if (this.mode() === 'edit' && this.id) {
			this.service.atualizar(this.id, formData).subscribe({
				next: () => {
					this.alertService.showAlert('success', 'Informação profissional atualizada com sucesso!', 'Sucesso.');
					this.router.navigate(['/informacoes/profissionais']);
				},
				error: () => {
					this.alertService.showAlert('danger', 'Erro ao atualizar os dados.', 'Erro.');
				},
			});
		}
	}
}
