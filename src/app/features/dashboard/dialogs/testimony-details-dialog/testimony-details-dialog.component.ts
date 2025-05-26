import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Testimony, StudentTestimony } from '../../models/titration.model';

@Component({
	selector: 'app-testimony-details-dialog',
	standalone: true,
	imports: [],
	templateUrl: './testimony-details-dialog.component.html',
	styleUrl: './testimony-details-dialog.component.scss',
})
export class TestimonyDetailsDialogComponent {
	dialogRef = inject<DialogRef<string>>(DialogRef<string>);
	data: Testimony = inject(DIALOG_DATA);
}
