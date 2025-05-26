import { ChangeDetectionStrategy, Component, input, signal, OnInit, inject } from '@angular/core';
import { CardChartComponent } from '../card-chart/card-chart.component';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../service/dashboard.service';
import { SelectOption } from '../../../../shared/models/select.model';

@Component({
	selector: 'app-total-per-titration-chart',
	standalone: true,
	imports: [CardChartComponent, BaseChartDirective],
	templateUrl: './total-per-titration-chart.component.html',
	styleUrl: './total-per-titration-chart.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalPerTitrationChartComponent implements OnInit {
	private dashboardService = inject(DashboardService);

	// ✅ Usando signal
	barChartData = signal<ChartConfiguration<'bar'>['data']>({
		labels: [],
		datasets: [{ data: [], label: 'Total por Título Acadêmico' }],
	});

	public barChartOptions: ChartConfiguration<'bar'>['options'] = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: { display: true },
			y: { display: true },
		},
		animation: {
			duration: 1000,
		},
		layout: {
			padding: {
				bottom: 8,
				left: 8,
				right: 8,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		indexAxis: 'y',
		backgroundColor: '#003366',
	};

	ngOnInit(): void {
		this.dashboardService.getNivelEstudantes().subscribe(data => {
			console.log('Dados de nível acadêmico:', data);

			const labels = data.map(option => option.label);
			const values = data.map(option => Number(option.value));

			this.barChartData.set({
				labels,
				datasets: [{ data: values, label: 'Total por Título Acadêmico' }],
			});
		});
	}
}
