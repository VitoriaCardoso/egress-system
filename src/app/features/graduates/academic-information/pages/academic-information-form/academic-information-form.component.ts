import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonDirective } from '@shared/directives/button';
import { FeedbackDirective } from '@shared/directives/feedback';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { EDUCATION_HISTORY_MOCK } from '../../mocks/academic-information.mock';
import { AcademicInformation } from '../../models/academic-information.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@shared/components/alert/alert.service';
import { DateTimePickerComponent } from '@shared/components/date-time-picker/date-time-picker.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { course_level_OPTIONS_MOCK, institution_type_OPTIONS_MOCK } from '@shared/mocks';
import { HasErrorPipe } from '@shared/pipes';
import { InformacaoAcademicaService } from '../../service/academic-information.service';
import { parse, format } from 'date-fns';

@Component({
	selector: 'app-academic-information-form',
	standalone: true,
	imports: [
		ButtonDirective,
		FeedbackDirective,
		FormsModule,
		InputComponent,
		ReactiveFormsModule,
		DateTimePickerComponent,
		SelectComponent,
		HasErrorPipe,
	],
	templateUrl: './academic-information-form.component.html',
	styleUrl: './academic-information-form.component.scss',
})
export class AcademicInformationFormComponent implements OnInit {
	informacaoAcademica: AcademicInformation;
	form: FormGroup;
	data = EDUCATION_HISTORY_MOCK;
	mode = signal<'create' | 'edit'>('create');
	id?: string;
	institution_typeOptions = institution_type_OPTIONS_MOCK;
	titrationOptions = course_level_OPTIONS_MOCK;

	route = inject(ActivatedRoute);
	router = inject(Router);
	alertService = inject(AlertService);

	constructor(private service: InformacaoAcademicaService) {}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) {
			this.mode.set('edit');
			this.carregarInformacaoAcademica();
		}
		this.inicializarFormulario();
	}

	inicializarFormulario() {
		this.form = new FormGroup({
			institution_name: new FormControl('', [Validators.required]),
			institution_type: new FormControl('', [Validators.required]),
			course_name: new FormControl('', [Validators.required]),
			matricula: new FormControl('', [Validators.required]),
			campus: new FormControl('', [Validators.required]),
			course_level: new FormControl('', [Validators.required]),
			country: new FormControl('', [Validators.required]),
			start_date: new FormControl('', [Validators.required]),
			end_date: new FormControl(''),
			state: new FormControl('', [Validators.required]),
			city: new FormControl('', [Validators.required]),
			registration_number: new FormControl('', [Validators.required]),
			document: new FormControl({ disabled: true }, [Validators.required]),
		});
	}

	carregarInformacaoAcademica() {
		if (!this.id) {
			console.error('Nenhum ID foi encontrado na rota.');
			return;
		}

		this.service.buscarPorInformacaoAcademica(this.id).subscribe(
			data => {
				console.log('Dados recebidos:', data);

				if (Array.isArray(data) && data.length > 0) {
					this.informacaoAcademica = data[0];
				} else {
					console.error(' Nenhuma informação acadêmica encontrada.');
					return;
				}
				this.form.patchValue({
					document: this.informacaoAcademica.document,
					institution_name: this.informacaoAcademica.institution_name,
					institution_type: this.informacaoAcademica.institution_type || '',
					campus: this.informacaoAcademica.campus,
					course_name: this.informacaoAcademica.course_name,
					matricula: this.informacaoAcademica.matricula,
					course_level: this.informacaoAcademica.course_level || '',
					country: this.informacaoAcademica.country,
					start_date: this.informacaoAcademica.start_date,
					end_date: this.informacaoAcademica.end_date,
					state: this.informacaoAcademica.state,
					city: this.informacaoAcademica.city,
					registration_number: this.informacaoAcademica.registration_number,
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

		const raw = this.form.value;
		const formData = {
			...raw,
			start_date: raw.start_date ? format(parse(raw.start_date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null,
			end_date: raw.end_date ? format(parse(raw.end_date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null,
			egresso_cpf: '123.456.789-14',
		};

		if (this.mode() === 'create') {
			console.log(formData);
			this.service.criarInformacaoAcademica(formData).subscribe(
				response => {
					this.alertService.showAlert('success', 'Curso criado com sucesso!', 'Sucesso!');
					this.router.navigate(['/informacoes/academicas']);
				},
				error => {
					console.log(formData);
					this.alertService.showAlert('danger', 'Erro ao criar o curso.', 'Erro');
				}
			);
		} else if (this.mode() === 'edit') {
			if (!this.id) {
				console.error('ID inválido:', this.id);
				return;
			}
			console.log(formData);
			this.service.atualizarInformacaoAcademica(this.id, formData).subscribe(
				response => {
					this.alertService.showAlert('success', 'Dados atualizados com sucesso!', 'Sucesso!');
					this.router.navigate(['/informacoes/academicas']);
				},
				error => {
					this.alertService.showAlert('danger', 'Erro ao atualizar os dados.', 'Erro');
				}
			);
		}
	}

	onDelete() {
		console.log('Delete');
	}
}
