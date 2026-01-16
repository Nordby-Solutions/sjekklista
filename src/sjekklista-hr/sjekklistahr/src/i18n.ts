import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Import translations
import en from './locales/en.json';
import no from './locales/no.json';

// Syncfusion Norwegian locale
const syncfusionNorwegian = {
  'no': {
    'schedule': {
      'day': 'Dag',
      'week': 'Uke',
      'workWeek': 'Arbeidsuke',
      'month': 'Måned',
      'agenda': 'Agenda',
      'weekAgenda': 'Uke agenda',
      'workWeekAgenda': 'Arbeidsuke agenda',
      'monthAgenda': 'Måneds agenda',
      'today': 'I dag',
      'noEvents': 'Ingen hendelser',
      'emptyContainer': 'Det er ingen hendelser planlagt for denne dagen.',
      'allDay': 'Hele dagen',
      'start': 'Start',
      'end': 'Slutt',
      'more': 'mer',
      'close': 'Lukk',
      'cancel': 'Avbryt',
      'noTitle': '(Ingen tittel)',
      'delete': 'Slett',
      'deleteEvent': 'Slett hendelse',
      'deleteMultipleEvent': 'Slett flere hendelser',
      'selectedItems': 'Valgte elementer',
      'deleteSeries': 'Slett serien',
      'edit': 'Rediger',
      'editSeries': 'Rediger serien',
      'editEvent': 'Rediger hendelse',
      'createEvent': 'Opprett',
      'subject': 'Emne',
      'addTitle': 'Legg til tittel',
      'moreDetails': 'Flere detaljer',
      'save': 'Lagre',
      'editContent': 'Vil du redigere bare denne hendelsen eller hele serien?',
      'deleteContent': 'Er du sikker på at du vil slette denne hendelsen?',
      'deleteMultipleContent': 'Er du sikker på at du vil slette de valgte hendelsene?',
      'newEvent': 'Ny hendelse',
      'title': 'Tittel',
      'location': 'Sted',
      'description': 'Beskrivelse',
      'timezone': 'Tidssone',
      'startTimezone': 'Start tidssone',
      'endTimezone': 'Slutt tidssone',
      'repeat': 'Gjenta',
      'saveButton': 'Lagre',
      'cancelButton': 'Avbryt',
      'deleteButton': 'Slett',
      'recurrence': 'Gjentakelse',
      'wrongPattern': 'Gjentakelsesmønsteret er ikke gyldig.',
      'seriesChangeAlert': 'Vil du avbryte endringene som er gjort i spesifikke forekomster av denne serien og tilpasse den til hele serien igjen?',
      'createError': 'Varigheten av hendelsen må være kortere enn hvor ofte den skjer. Forkorte varigheten, eller endre gjentakelsesmønsteret i hendelsesredigeringen.',
      'sameDayAlert': 'To forekomster av samme hendelse kan ikke forekomme på samme dag.',
      'occurenceAlert': 'Kan ikke planlegge om en forekomst av den tilbakevendende avtalen hvis den hopper over en senere forekomst av samme avtale.',
      'editRecurrence': 'Rediger gjentakelse',
      'repeats': 'Gjentas',
      'alert': 'Varsel',
      'startEndError': 'Den valgte sluttdatoen skjer før startdatoen.',
      'invalidDateError': 'Den angitte datoverdien er ugyldig.',
      'blockAlert': 'Hendelser kan ikke planlegges innenfor det blokkerte tidsområdet.',
      'ok': 'Ok',
      'yes': 'Ja',
      'no': 'Nei',
      'occurrence': 'Forekomst',
      'series': 'Serie',
      'previous': 'Forrige',
      'next': 'Neste',
      'timelineDay': 'Tidslinje dag',
      'timelineWeek': 'Tidslinje uke',
      'timelineWorkWeek': 'Tidslinje arbeidsuke',
      'timelineMonth': 'Tidslinje måned',
      'timelineYear': 'Tidslinje år',
      'editFollowingEvent': 'Påfølgende hendelser',
      'deleteTitle': 'Slett hendelse',
      'editTitle': 'Rediger hendelse',
      'beginFrom': 'Begynn fra',
      'endAt': 'Slutt ved'
    },
    'grid': {
      'EmptyRecord': 'Ingen poster å vise',
      'True': 'Sant',
      'False': 'Usant',
      'InvalidFilterMessage': 'Ugyldig filterdata',
      'GroupDropArea': 'Dra en kolonneoverskrift hit for å gruppere etter den kolonnen',
      'UnGroup': 'Klikk her for å oppheve gruppering',
      'Item': 'element',
      'Items': 'elementer',
      'EditOperationAlert': 'Ingen poster valgt for redigeringsoperasjon',
      'DeleteOperationAlert': 'Ingen poster valgt for slettingsoperasjon',
      'SaveButton': 'Lagre',
      'OKButton': 'OK',
      'CancelButton': 'Avbryt',
      'EditFormTitle': 'Detaljer om',
      'AddFormTitle': 'Legg til ny post',
      'BatchSaveConfirm': 'Er du sikker på at du vil lagre endringene?',
      'BatchSaveLostChanges': 'Ulagrede endringer vil gå tapt. Er du sikker på at du vil fortsette?',
      'ConfirmDelete': 'Er du sikker på at du vil slette posten?',
      'CancelEdit': 'Er du sikker på at du vil avbryte endringene?',
      'ChooseColumns': 'Velg kolonner',
      'SearchColumns': 'søk kolonner',
      'Matchs': 'Ingen treff funnet',
      'FilterButton': 'Filtrer',
      'ClearButton': 'Fjern',
      'StartsWith': 'Starter med',
      'EndsWith': 'Slutter med',
      'Contains': 'Inneholder',
      'Equal': 'Lik',
      'NotEqual': 'Ikke lik',
      'LessThan': 'Mindre enn',
      'LessThanOrEqual': 'Mindre enn eller lik',
      'GreaterThan': 'Større enn',
      'GreaterThanOrEqual': 'Større enn eller lik',
      'ChooseDate': 'Velg en dato',
      'EnterValue': 'Skriv inn verdi',
      'Copy': 'Kopier',
      'Group': 'Grupper etter denne kolonnen',
      'Ungroup': 'Opphev gruppering etter denne kolonnen',
      'autoFitAll': 'Tilpass alle kolonner automatisk',
      'autoFit': 'Tilpass denne kolonnen automatisk',
      'Export': 'Eksporter',
      'FirstPage': 'Første side',
      'LastPage': 'Siste side',
      'PreviousPage': 'Forrige side',
      'NextPage': 'Neste side',
      'SortAscending': 'Sorter stigende',
      'SortDescending': 'Sorter synkende',
      'EditRecord': 'Rediger post',
      'DeleteRecord': 'Slett post',
      'FilterMenu': 'Filtrer',
      'SelectAll': 'Velg alle',
      'Blanks': 'Tomme',
      'FilterTrue': 'Sant',
      'FilterFalse': 'Usant',
      'NoResult': 'Ingen treff funnet',
      'ClearFilter': 'Fjern filter',
      'NumberFilter': 'Tallfilter',
      'TextFilter': 'Tekstfilter',
      'DateFilter': 'Datofilter',
      'MatchCase': 'Match store/små bokstaver',
      'Between': 'Mellom',
      'CustomFilter': 'Tilpasset filter',
      'CustomFilterPlaceHolder': 'Skriv inn verdi',
      'CustomFilterDatePlaceHolder': 'Velg en dato',
      'AND': 'OG',
      'OR': 'ELLER',
      'ShowRowsWhere': 'Vis rader hvor:',
      'currentPageInfo': '{0} av {1} sider',
      'totalItemsInfo': '({0} elementer)',
      'firstPageTooltip': 'Gå til første side',
      'lastPageTooltip': 'Gå til siste side',
      'nextPageTooltip': 'Gå til neste side',
      'previousPageTooltip': 'Gå til forrige side',
      'nextPagerTooltip': 'Gå til neste paginering',
      'previousPagerTooltip': 'Gå til forrige paginering',
      'pagerDropDown': 'Elementer per side',
      'pagerAllDropDown': 'Elementer',
      'All': 'Alle',
      'Search': 'Søk',
      'Excelexport': 'Excel-eksport',
      'Pdfexport': 'PDF-eksport',
      'Csvexport': 'CSV-eksport',
      'Print': 'Skriv ut'
    },
    'dropdowns': {
      'noRecordsTemplate': 'Ingen poster funnet',
      'actionFailureTemplate': 'Forespørselen mislyktes',
      'overflowCountTemplate': '+${count} flere',
      'totalCountTemplate': '${count} elementer'
    },
    'datepicker': {
      'placeholder': 'Velg en dato',
      'today': 'I dag'
    },
    'calendars': {
      'today': 'I dag'
    }
  }
};

// Load Syncfusion locales
L10n.load(syncfusionNorwegian);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'no'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    resources: {
      en: { translation: en },
      no: { translation: no },
    },
  });

// Sync Syncfusion locale with i18n language
i18n.on('languageChanged', (lng) => {
  const syncfusionLocale = lng === 'no' ? 'no' : 'en-US';
  setCulture(syncfusionLocale);
});

// Set initial Syncfusion locale
const initialLocale = i18n.language === 'no' ? 'no' : 'en-US';
setCulture(initialLocale);

export default i18n;
