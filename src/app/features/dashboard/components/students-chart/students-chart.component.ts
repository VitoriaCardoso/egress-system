import { ChangeDetectionStrategy, Component, computed, input, signal, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CardChartComponent } from '../card-chart/card-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../service/dashboard.service';
import { SelectOption } from '../../../../shared/models/select.model';

@Component({
	selector: 'app-students-chart',
	standalone: true,
	imports: [DecimalPipe, CardChartComponent, BaseChartDirective],
	templateUrl: './students-chart.component.html',
	styleUrl: './students-chart.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsChartComponent implements OnInit {
	// Usar signal() em vez de input()
	data = signal<ChartConfiguration<'doughnut'>['data']>({
		datasets: [
			{
				data: [0, 0],
				backgroundColor: ['#003366', '#CCDDEE'],
			},
		],
		labels: ['Ativo', 'Inativo'],
	});

	pieChartSum = computed(() => this.data().datasets[0].data.reduce((acc, cur) => acc + cur, 0));

	percents = computed(() =>
		this.data().datasets[0].data.map((value, index) => {
			return {
				name: this.data().labels[index],
				value: Number((value / this.pieChartSum()) * 100).toFixed(0),
			};
		})
	);

	public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: '75%',
		layout: {
			padding: {
				bottom: 8,
				left: 8,
			},
		},
		datasets: {
			doughnut: {
				borderWidth: 1,
			},
		},
	};

	constructor(private dashboardService: DashboardService) {}

	ngOnInit(): void {
		this.loadStudentStatus();
	}

	loadStudentStatus(): void {
		this.dashboardService.getStatusEstudantes().subscribe((status: SelectOption[]) => {
			console.log('Dados recebidos da API:', status);

			const ativo = Number(status.find(option => option.label === 'true')?.value || 0);
			const inativo = Number(status.find(option => option.label === 'false')?.value || 0);

			this.data.set({
				datasets: [
					{
						data: [ativo, inativo],
						backgroundColor: ['#003366', '#CCDDEE'],
					},
				],
				labels: ['Ativo', 'Inativo'],
			});
		});
	}
}
