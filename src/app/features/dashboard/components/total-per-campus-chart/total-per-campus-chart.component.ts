import { ChangeDetectionStrategy, Component, inject, OnInit, signal, input, InputSignal } from '@angular/core';
import { CardChartComponent } from '../card-chart/card-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../service/dashboard.service';

@Component({
	selector: 'app-total-per-campus-chart',
	standalone: true,
	imports: [CardChartComponent, BaseChartDirective],
	templateUrl: './total-per-campus-chart.component.html',
	styleUrl: './total-per-campus-chart.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalPerCampusChartComponent implements OnInit {
	private dashboardService = inject(DashboardService);

	barChartData = signal<ChartConfiguration<'bar'>['data']>({
		labels: [],
		datasets: [{ data: [], label: 'Total por Campus' }],
	});

	// Configurações do gráfico
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
		this.dashboardService.getCampusEstudantes().subscribe(data => {
			console.log('Dados de campus:', data);

			const labels = data.map(option => option.label);
			const values = data.map(option => Number(option.value));

			this.barChartData.set({
				labels,
				datasets: [{ data: values, label: 'Total por Campus' }],
			});
		});
	}
}
