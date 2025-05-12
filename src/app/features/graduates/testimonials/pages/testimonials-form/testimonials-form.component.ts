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
import { ConsentDialogComponent } from '@app/features/graduates/testimonials/dialogs/consent-dialog/consent-dialog.component';

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
		text: new FormControl('', Validators.required),
		relatedAcademicInfo: new FormControl('', Validators.required),
		privacy: new FormControl('', Validators.required),
	});

	mode = signal<'create' | 'edit'>('create');

	id = '';
	route = inject(ActivatedRoute);
	router = inject(Router);
	alertService = inject(AlertService);
	informacaoAcademicaOpcoes: SelectOptions = RELATED_ACADEMIC_INFO_OPTIONS;
	privacyOptions = PRIVACY_OPTIONS;
	dialog = inject(Dialog);

	constructor() {
		this.route.paramMap.subscribe(params => {
			const id = params.get('id');

			this.mode.set(id ? 'edit' : 'create');
			this.id = id;

			if (id) {
				const data = TESTIMONIALS_MOCK.find(item => item.id.toString() === id);
				if (data) {
					this.form.patchValue({
						...data,
					});
				}
			}
		});
	}

	onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.alertService.showAlert('danger', 'Preencha todos os campos obrigatórios');
			return;
		}

		if (this.mode() === 'create') {
			this.createTestimonial();
		} else {
			this.editTestimonial();
		}
	}

	private createTestimonial() {
		const dialog = this.dialog.open(ConsentDialogComponent, { maxWidth: '500px', panelClass: 'consent' });

		dialog.closed.subscribe(async (confirmed: boolean) => {
			if (confirmed) {
				this.router.navigate(['/depoimentos']).then(() => {
					this.alertService.showAlert('success', 'Depoimento salvo com sucesso');
				});
			}
		});
	}

	private editTestimonial() {
		this.router.navigate(['/depoimentos']).then(() => {
			this.alertService.showAlert('success', 'Depoimento editado com sucesso');
		});
	}
}
