import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Filter,
  Sort,
  Resize,
  Toolbar,
  ExcelExport,
  PdfExport,
  type RecordDoubleClickEventArgs,
} from '@syncfusion/ej2-react-grids';
import { ToolbarComponent, ItemsDirective, ItemDirective, type ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { useTenant } from '../../../context/TenantContext';
import { employeeClient } from '../../../data/clients/employeeClient';
import { buildTenantPath } from '../../../utils/tenantHelper';
import './Employees.css';
import type { EmployeeDto } from '../../../data/models';

export const Employees: React.FC = () => {
  const { tenantSlug } = useTenant();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadEmployees();
  }, [tenantSlug]);

  const loadEmployees = async () => {
    if (!tenantSlug) return;

    setLoading(true);
    try {
      const data = await employeeClient.getEmployees({  });
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToolbarClick = (args: ClickEventArgs) => {
    if (args.item.text === 'Opprett') {
      const createPath = buildTenantPath(tenantSlug, '/employment/employees/create');
      navigate(createPath);
    }
  };

  const handleRowDoubleClick = (args: RecordDoubleClickEventArgs) => {
    const employee = args.rowData as EmployeeDto;
    if (employee.id) {
      const editPath = buildTenantPath(tenantSlug, `/employment/employees/edit/${employee.id}`);
      navigate(editPath);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Ansatte</h1>

      <div className="grid-container">
        <ToolbarComponent style={{ borderBottom: '0' }} clicked={handleToolbarClick}>
          <ItemsDirective>
            <ItemDirective
              prefixIcon="e-icons e-plus"
              text="Opprett"
              tooltipText="Opprett"
            />
            <ItemDirective
              prefixIcon="e-icons e-edit"
              text="Rediger"
              tooltipText="Edit"
            />
            <ItemDirective
              prefixIcon="e-icons e-delete"
              text="Slett"
              tooltipText="Delete"
            />
            <ItemDirective type="Separator" />
            <ItemDirective
              prefixIcon="e-icons e-export-excel-2"
              tooltipText="Export to Excel"
            />
            <ItemDirective
              prefixIcon="e-icons e-export-pdf"
              tooltipText="Export to PDF"
            />
            <ItemDirective type="Separator" />
            <ItemDirective
              align="Right"
              overflow="Show"
              type="Input"
              // template={() => (
              //   <TextBoxComponent width="200px" placeholder="Søk.." />
              // )}
            />
          </ItemsDirective>
        </ToolbarComponent>

        <GridComponent
          dataSource={employees ?? []}
          allowSelection={true}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
          allowExcelExport={true}
          allowPdfExport={true}
          enableHover={false}
          height={600}
          rowHeight={38}
          filterSettings={{ type: 'Menu' }}
          pageSettings={{ pageSize: 40 }}
          selectionSettings={{
            checkboxOnly: true,
            persistSelection: true,
            type: 'Multiple',
          }}
          recordDoubleClick={handleRowDoubleClick}
        >
          <ColumnsDirective>
            <ColumnDirective
              type="checkbox"
              allowFiltering={false}
              allowSorting={false}
              width="60"
            />
            <ColumnDirective
              field="id"
              headerText="Employee ID"
              visible={false}
              isPrimaryKey={true}
              width="130"
            />
            <ColumnDirective
              field="firstname"
              headerText="Fornavn"
              width="200"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="lastname"
              headerText="Etternavn"
              width="200"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="personalEmailAddress"
              headerText="E-post"
              width="200"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="phoneNumber"
              headerText="Tlf"
              width="200"
              clipMode="EllipsisWithTooltip"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Selection,
              Filter,
              Sort,
              Resize,
              Toolbar,
              ExcelExport,
              PdfExport,
            ]}
          />
        </GridComponent> 

        {loading &&  <h1>Laster..</h1>}
      </div>
    </div>
  );
};
