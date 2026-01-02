import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useTenant } from '../../../context/TenantContext';
import { employeeClient } from '../../../data/clients/employeeClient';
import { buildTenantPath } from '../../../utils/tenantHelper';
import type { EmployeeDto } from '../../../data/models';
import './EmployeeManagement.css';

export default function EmployeeManagement() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { tenantId, tenantSlug } = useTenant();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [employee, setEmployee] = useState<EmployeeDto>({
    firstname: '',
    lastname: '',
    personalEmailAddress: '',
    phoneNumber: '',
    dateOfBirth: '',
    tenantId: tenantId || '',
  });

  const isEditMode = !!employeeId;

  useEffect(() => {
    if (employeeId) {
      loadEmployee(employeeId);
    }
  }, [employeeId]);

  const loadEmployee = async (id: string) => {
    setLoading(true);
    try {
      const data = await employeeClient.getEmployeeById(id);
      if (data) {
        setEmployee(data);
      }
    } catch (error) {
      console.error('Failed to load employee:', error);
      alert('Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof EmployeeDto, value: any) => {
    setEmployee(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!employee.firstname || !employee.lastname) {
      alert('Firstname and Lastname are required');
      return;
    }

    setSaving(true);
    try {
      if (isEditMode && employeeId) {
        await employeeClient.updateEmployee(employeeId, employee);
      } else {
        await employeeClient.createEmployee({ employee });
      }
      
      // Navigate back to employees list
      const employeesPath = buildTenantPath(tenantSlug, '/employment/employees');
      navigate(employeesPath);
    } catch (error) {
      console.error('Failed to save employee:', error);
      alert('Failed to save employee');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const employeesPath = buildTenantPath(tenantSlug, '/employment/employees');
    navigate(employeesPath);
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">
        {isEditMode ? 'Rediger ansatt' : 'Opprett ansatt'}
      </h1>

      <div className="form-container">
        <div className="form-section">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstname">Fornavn *</label>
              <TextBoxComponent
                id="firstname"
                placeholder="Fornavn"
                value={employee.firstname}
                change={(e) => handleFieldChange('firstname', e.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="lastname">Etternavn *</label>
              <TextBoxComponent
                id="lastname"
                placeholder="Etternavn"
                value={employee.lastname}
                change={(e) => handleFieldChange('lastname', e.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">E-post</label>
              <TextBoxComponent
                id="email"
                type="email"
                placeholder="E-post"
                value={employee.personalEmailAddress}
                change={(e) => handleFieldChange('personalEmailAddress', e.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Telefon</label>
              <TextBoxComponent
                id="phone"
                placeholder="Telefon"
                value={employee.phoneNumber}
                change={(e) => handleFieldChange('phoneNumber', e.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="dateOfBirth">Fødselsdato</label>
              <DatePickerComponent
                id="dateOfBirth"
                placeholder="Velg dato"
                value={employee.dateOfBirth ? new Date(employee.dateOfBirth) : undefined}
                change={(e) => handleFieldChange('dateOfBirth', e.value?.toISOString()?.split("T")[0])}
                format="dd.MM.yyyy"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <ButtonComponent
            cssClass="e-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Lagrer...' : 'Lagre'}
          </ButtonComponent>
          
          <ButtonComponent
            onClick={handleCancel}
            disabled={saving}
          >
            Avbryt
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}