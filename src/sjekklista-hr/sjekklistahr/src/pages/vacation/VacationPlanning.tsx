import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  TimelineViews,
  TimelineMonth,
  Inject,
  Resize,
  DragAndDrop,
  type EventSettingsModel,
  type ActionEventArgs,
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { employeeClient } from '../../data/clients/employeeClient';
import { vacationPlanningClient } from '../../data/clients/vacationPlanningClient';
import type { EmployeeDto } from '../../data/models';
import type {
  EmployeeVacationPlanDto,
  EmployeeVacationDayStatusDto,
} from '../../data/models/VacationPlanningModels';
import './VacationPlanning.css';

interface VacationEvent {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  Status: number;
  EmployeeId: string;
  EmployeeName: string;
  CategoryColor: string;
}

export const VacationPlanning = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [vacationPlans, setVacationPlans] = useState<EmployeeVacationPlanDto[]>([]);
  const [events, setEvents] = useState<VacationEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 + i);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      loadVacationPlans();
    }
  }, [selectedYear]);

  useEffect(() => {
    buildEventsFromPlans();
  }, [vacationPlans, selectedEmployeeId]);

  const loadEmployees = async () => {
    try {
      const data = await employeeClient.getEmployees({});
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const loadVacationPlans = async () => {
    setLoading(true);
    try {
      const plans = await vacationPlanningClient.getAllEmployeeVacationPlans(selectedYear);
      setVacationPlans(plans);
    } catch (error) {
      console.error('Failed to load vacation plans:', error);
      setVacationPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const buildEventsFromPlans = () => {
    let filteredPlans = vacationPlans;
    
    if (selectedEmployeeId && selectedEmployeeId !== 'all') {
      filteredPlans = vacationPlans.filter(p => p.employeeId === selectedEmployeeId);
    }

    const newEvents: VacationEvent[] = [];
    
    filteredPlans.forEach(plan => {
      const employeeName = `${plan.employeeFirstname || ''} ${plan.employeeLastname || ''}`.trim() || 'Unknown Employee';
      
      plan.vacationDays.forEach(day => {
        const date = new Date(day.requestedDate);
        const color = getStatusColor(day.status);
        
        newEvents.push({
          Id: `${plan.employeeId}-${day.requestedDate}`,
          Subject: `${employeeName} - ${getStatusText(day.status)}`,
          StartTime: date,
          EndTime: date,
          IsAllDay: true,
          Status: day.status,
          EmployeeId: plan.employeeId,
          EmployeeName: employeeName,
          CategoryColor: color,
        });
      });
    });

    setEvents(newEvents);
  };

  const getStatusColor = (status: EmployeeVacationDayStatusDto): string => {
    switch (status) {
      case 10: // Pending
        return '#ffc107';
      case 20: // Approved
        return '#4caf50';
      case 30: // Rejected
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: EmployeeVacationDayStatusDto): string => {
    switch (status) {
      case 10:
        return t('vacationPlanning.pending');
      case 20:
        return t('vacationPlanning.approved');
      case 30:
        return t('vacationPlanning.rejected');
      default:
        return 'Unknown';
    }
  };

  const onActionComplete = async (args: ActionEventArgs) => {
    if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
      if (args.data && Array.isArray(args.data)) {
        for (const event of args.data as VacationEvent[]) {
          try {
            await vacationPlanningClient.setupVacation({
              employeeId: event.EmployeeId,
              year: selectedYear,
              vacationDate: event.StartTime.toISOString().split('T')[0],
              status: event.Status as EmployeeVacationDayStatusDto,
            });
          } catch (error) {
            console.error('Failed to save vacation:', error);
          }
        }
        await loadVacationPlans();
      }
    }
  };

  const eventSettings: EventSettingsModel = {
    dataSource: events,
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
      isAllDay: { name: 'IsAllDay' },
    },
  };

  const employeeOptions = [
    { text: t('vacationPlanning.allEmployees'), value: 'all' },
    ...employees.map(e => ({
      text: `${e.firstname} ${e.lastname}`,
      value: e.id!,
    })),
  ];

  const stats = {
    totalDays: vacationPlans.reduce((sum, p) => sum + p.vacationDays.length, 0),
    pendingRequests: vacationPlans.reduce(
      (sum, p) => sum + p.vacationDays.filter(d => d.status === 10).length,
      0
    ),
    approvedDays: vacationPlans.reduce(
      (sum, p) => sum + p.vacationDays.filter(d => d.status === 20).length,
      0
    ),
    employeesWithVacation: vacationPlans.length,
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t('vacationPlanning.title')}</h1>
        <div className="vacation-controls">
          <DropDownListComponent
            className="year-selector"
            dataSource={years}
            value={selectedYear}
            change={(e) => setSelectedYear(e.value as number)}
            placeholder={t('vacationPlanning.selectYear')}
          />
          <DropDownListComponent
            className="employee-filter"
            dataSource={employeeOptions}
            fields={{ text: 'text', value: 'value' }}
            value={selectedEmployeeId}
            change={(e) => setSelectedEmployeeId(e.value as string)}
            placeholder={t('vacationPlanning.allEmployees')}
          />
        </div>
      </div>

      <div className="stats-card">
        <div className="stat-item">
          <div className="stat-label">{t('vacationPlanning.totalDays')}</div>
          <div className="stat-value">{stats.totalDays}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('vacationPlanning.pendingRequests')}</div>
          <div className="stat-value">{stats.pendingRequests}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('vacationPlanning.approvedDays')}</div>
          <div className="stat-value">{stats.approvedDays}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('vacationPlanning.employeesWithVacation')}</div>
          <div className="stat-value">{stats.employeesWithVacation}</div>
        </div>
      </div>

      <div className="vacation-legend">
        <div className="legend-item">
          <div className="legend-color status-pending"></div>
          <span>{t('vacationPlanning.pending')}</span>
        </div>
        <div className="legend-item">
          <div className="legend-color status-approved"></div>
          <span>{t('vacationPlanning.approved')}</span>
        </div>
        <div className="legend-item">
          <div className="legend-color status-rejected"></div>
          <span>{t('vacationPlanning.rejected')}</span>
        </div>
      </div>

      {loading ? (
        <div>{t('vacationPlanning.loading')}</div>
      ) : (
        <div className="schedule-container">
          <ScheduleComponent
            height="650px"
            selectedDate={new Date(selectedYear, 0, 1)}
            eventSettings={eventSettings}
            actionComplete={onActionComplete}
            readonly={false}
          >
            <ViewsDirective>
              <ViewDirective option="Month" />
              <ViewDirective option="TimelineMonth" />
              <ViewDirective option="TimelineYear" displayName="Timeline Year" interval={12} />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      )}
    </div>
  );
};
