import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { CollapseItemComponent } from '@shared/components/collapse-item/collapse-item.component';
import { ButtonDirective } from '@shared/directives/button';
import { TESTIMONIALS_MOCK } from './mocks/testimonials.mock';
import { Testimonial } from './models/testimonials.model';
import { GetPrivacyDescriptionPipe } from '@app/features/graduates/testimonials/pipes/get-privacy-description.pipe';
import { TestimonialsService } from '../testimonials/service/testimonials.service';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
	selector: 'app-testimonials',
	standalone: true,
	imports: [ItemInfoComponent, DatePipe, CollapseItemComponent, RouterLink, ButtonDirective, GetPrivacyDescriptionPipe],
	templateUrl: './testimonials.component.html',
	styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnInit {
	//data: Array<Testimonial> = TESTIMONIALS_MOCK; //Para utilizar o mock
	data: Testimonial[] = [];
	cpf: string = '';
	private _authService = inject(AuthService);

	constructor(private testimonialsService: TestimonialsService) {}

	ngOnInit(): void {
		this.cpf = this._authService.getCpf();
		this.buscarDepoimentos();
	}

	buscarDepoimentos(): void {
		this.testimonialsService.listarPorCpf(this.cpf).subscribe({
			next: res => {
				console.log(res);
				this.data = res;
			},
			error: err => {
				console.error('Erro ao buscar publicações:', err);
			},
		});
	}
}
