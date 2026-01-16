import React, { useState } from 'react';
import { DropDownListComponent, type ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

export const LanguageSwitcher: React.FC = () => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'no', label: 'Norsk' },
  ];

  const [selectedLang, setSelectedLang] = useState<string>('en');

  const handleLanguageChange = (args: ChangeEventArgs) => {
    const code = args.value as string;
    setSelectedLang(code);
    // TODO: Connect to i18n when ready
    // i18n.changeLanguage(code);
  };

  return (
    <DropDownListComponent
      dataSource={languages}
      fields={{ text: 'label', value: 'code' }}
      value={selectedLang}
      change={handleLanguageChange}
      cssClass="language-switcher"
      width="120px"
    />
  );
};
