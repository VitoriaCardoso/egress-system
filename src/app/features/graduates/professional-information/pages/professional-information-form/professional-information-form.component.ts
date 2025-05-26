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
import { SelectOption } from '../../../../../shared/models/select.model';

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
	opcoes = <SelectOption[]>[];

	constructor(private service: ProfessionalInformationService) {}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		this.inicializarFormulario();
		this.carregarCursosRelacionados();
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
							console.log(data);
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
								informacao_academica: info.informacao_academica,
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
			informacao_academica: new FormControl(null, [Validators.required]),
		});
	}

	carregarInformacaoProfissonal() {
		if (!this.id) {
			console.error('Nenhum ID foi encontrado na rota.');
			return;
		}

		this.service.listarPorId(this.id).subscribe(
			data => {
				console.log(data);
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
					informacao_academica: this.professionalInfo.informacao_academica,
				});
			},
			error => {
				console.error('Erro ao buscar dados:', error);
			}
		);
	}

	carregarCursosRelacionados() {
		//const cpf = localStorage.getItem('cpf'); // ou de onde você estiver pegando o CPF
		const cpf = '123.456.789-14';

		if (!cpf) {
			console.error('CPF não encontrado para carregar cursos relacionados.');
			return;
		}

		this.service.buscarPorEgressoCpf(cpf).subscribe({
			next: dados => {
				const vistos = new Map<string, { value: string; label: string }>();

				dados.forEach(info => {
					const id = info.informacao_academica.id;
					const course = info.informacao_academica.course_name || 'Curso sem nome';
					const chaveUnica = `${id}::${course}`; // chave composta

					if (!vistos.has(chaveUnica)) {
						vistos.set(chaveUnica, {
							value: id,
							label: course,
						});
					}
				});

				this.opcoes = Array.from(vistos.values());

				console.log('Cursos carregados (sem duplicatas):', this.opcoes);
			},
			error: err => console.error('Erro ao buscar cursos:', err),
		});
	}

	onSubmit() {
		if (this.form.invalid) {
			this.alertService.showAlert('warning', 'Preencha todos os campos obrigatórios.', 'Atenção.');
			this.form.markAllAsTouched();
			return;
		}
		const formValue = this.form.value;

		const formData = {
			...formValue,
		};

		if (this.mode() === 'create') {
			formData.start_date = this.formatDateToISO(formData.start_date);
			formData.end_date = this.formatDateToISO(formData.end_date);

			this.service.criar(formData).subscribe({
				next: () => {
					console.log(formData);
					this.alertService.showAlert('success', 'Informação profissional criada com sucesso!', 'Sucesso.');
					this.router.navigate(['/informacoes/profissionais']);
				},
				error: () => {
					console.log(formData);
					this.alertService.showAlert('danger', 'Erro ao salvar os dados.', 'Erro.');
				},
			});
		} else if (this.mode() === 'edit' && this.id) {
			this.service.atualizar(this.id, formData).subscribe({
				next: () => {
					console.log(formData);
					this.alertService.showAlert('success', 'Informação profissional atualizada com sucesso!', 'Sucesso.');
					this.router.navigate(['/informacoes/profissionais']);
				},
				error: () => {
					console.log(formData);
					this.alertService.showAlert('danger', 'Erro ao atualizar os dados.', 'Erro.');
				},
			});
		}
	}

	private formatDateToISO(date: any): string | null {
		if (!date) return null;

		// Se for string no formato "15/03/2019"
		if (typeof date === 'string' && date.includes('/')) {
			const [day, month, year] = date.split('/');
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
		}

		// Se for objeto Date válido
		if (date instanceof Date && !isNaN(date.getTime())) {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		}

		// Tentar converter strings ISO ou inválidas
		const d = new Date(date);
		if (!isNaN(d.getTime())) {
			const year = d.getFullYear();
			const month = String(d.getMonth() + 1).padStart(2, '0');
			const day = String(d.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		}

		return null;
	}
}
