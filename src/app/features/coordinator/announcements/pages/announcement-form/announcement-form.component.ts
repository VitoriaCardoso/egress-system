import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, isFormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { InputComponent } from '@shared/components/input/input.component';
import { TextareaComponent } from '@shared/components/textarea/textarea.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { TypeRecipientsEnum } from '@app/features/coordinator/announcements/models/announcements.model';
import { course_level_OPTIONS_MOCK, COURSE_OPTIONS_MOCK } from '@shared/mocks';
import { FeedbackDirective } from '@shared/directives/feedback';
import { ButtonDirective } from '@shared/directives/button';
import {
	DialogConfirmComponent,
	DialogConfirmInputs,
} from '@shared/components/dialog-confirm/dialog-confirm.component';
import { AlertService } from '@shared/components/alert/alert.service';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
	selector: 'app-announcement-form',
	standalone: true,
	imports: [
		FormsModule,
		InputComponent,
		TextareaComponent,
		SelectComponent,
		MultiSelectComponent,
		CheckboxComponent,
		ReactiveFormsModule,
		FeedbackDirective,
		ButtonDirective,
		NgxEditorModule,
	],
	templateUrl: './announcement-form.component.html',
	styleUrl: './announcement-form.component.scss',
})
export class AnnouncementFormComponent implements OnInit, OnDestroy {
	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		content: new FormControl('', [Validators.required]),
		typeRecipients: new FormControl(TypeRecipientsEnum.SPECIFIC),
		courses: new FormControl([]),
		levels: new FormControl([]),
	});
	coursesOptions = COURSE_OPTIONS_MOCK;
	levelsOptions = course_level_OPTIONS_MOCK;
	checkAll = false;
	editor: Editor;
	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
	];

	private dialog = inject(Dialog);
	private router = inject(Router);
	private alertService = inject(AlertService);

	constructor() {}

	ngOnInit(): void {
		this.editor = new Editor();
	}

	onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const data: DialogConfirmInputs = {
			message: `Tem certeza que deseja enviar o comunicado para ${this.form.controls.typeRecipients.value === TypeRecipientsEnum.ALL ? 'todos' : ''} os alunos?`,
			buttonConfirmLabel: 'Enviar',
		};

		const dialog = this.dialog.open(DialogConfirmComponent, { data, maxWidth: '360px' });

		dialog.closed.subscribe((confirmed: boolean) => {
			if (confirmed) {
				console.log(this.form.value);
				this.router.navigate(['/comunicados']);
				this.alertService.showAlert('success', 'Comunicado enviado com sucesso!', 'Sucesso.');
			}
		});
	}

	onCheckAllChange(event: boolean) {
		this.checkAll = event;
		console.log('checkAll', this.checkAll);

		const controls = ['courses', 'levels'];

		if (event) {
			this.form.controls.typeRecipients.setValue(TypeRecipientsEnum.ALL, { emitEvent: false });

			controls.forEach(control => {
				const formControl = this.form.get(control);

				if (isFormControl(formControl)) {
					formControl.clearValidators();
					formControl.disable();
				}
			});
		} else {
			this.form.controls.typeRecipients.setValue(TypeRecipientsEnum.SPECIFIC);

			controls.forEach(control => {
				const formControl = this.form.get(control);

				if (isFormControl(formControl)) {
					formControl.setValidators(Validators.required);
					formControl.enable();
				}
			});
		}
	}

	ngOnDestroy() {
		this.editor.destroy();
	}
}
