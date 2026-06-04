# DriveInspect Buchhaltung

DriveInspect Buchhaltung ist eine moderne React/Next.js-MVP-Weboberfläche für selbstständige Kfz-Sachverständige. Die App verbindet Buchhaltung, Rechnungen, Gutachten-Workflows, DSGVO, Steueraufgaben, Fahrtenbuch, Kundenverwaltung und Fahrzeugakten in einer spezialisierten SaaS-Oberfläche.

## Technik
- Next.js App Router
- React Client Components
- Tailwind CSS mit Dark Mode
- Responsive Sidebar-/Dashboard-Layout
- Mock-Daten als spätere Vorbereitung für Supabase oder Firebase
- Vorbereitete Upload-Felder für Belege, Rechnungen, Fahrzeugbilder und Gutachten
- Vorbereitete PDF-Export-Aktionen für Rechnungen, Gutachten und Steuerberater-Export

## Module
- Dashboard mit Einnahmen, Ausgaben, Gewinn, Steuerrücklage, Rechnungsstatus, offenen Gutachten, DSGVO- und Steueraufgaben sowie Ampelstatus
- Einnahmen- und Ausgabenverwaltung mit Eingabemaske, Kategorien, Tabelle, Filtern und Beleg-Upload
- Sachverständigen-Rechnungsvorlage mit fortlaufender Rechnungsnummer, MwSt-Berechnungsvorbereitung, Kleinunternehmeroption, Status und PDF-Export-Vorschau
- DSGVO-Checkliste für Kfz-Sachverständige
- Steuer-Checkliste für Kfz-Gutachter
- Suchbare Übersicht steuerlich absetzbarer Kosten
- Digitales Fahrtenbuch mit automatischer Kilometerlogik in den Mock-Daten
- Kundenverwaltung mit DSGVO-Status, Aufträgen, Rechnungen, Historie und Dokumenten
- Fahrzeugakten mit VIN, Kennzeichen, Schäden, Bildern und Gutachtenstatus
- Workflow-Kanban vom Kundenkontakt bis Rechnung und Archivierung
- Gutachten-/Prüfbericht-Modul mit Prüfbereichen, Bewertung, Risiko-Score und Kaufempfehlung
- Einstellungen für Firmendaten, Logo, Bankdaten, Steuernummer, Umsatzsteuer, Kleinunternehmerregelung, Standardtexte und Rollen

## Beispiel-Daten
Enthalten sind Mock-Daten für:
- 3 Kunden
- 3 Fahrzeuge
- 3 Gutachten
- 4 Rechnungen
- 8 Ausgaben
- 5 Fahrtenbucheinträge
- 12 DSGVO-Aufgaben
- 13 Steuer-Aufgaben
- 10 absetzbare Kostenarten
- 5 Workflow-Aufträge

## Lokal starten
```bash
npm install
npm run dev
```

Danach im Browser öffnen:
```text
http://localhost:3000
```

> Hinweis: Die App ist als MVP-Frontend vorbereitet. Für Produktivbetrieb können später Supabase/Firebase, Authentifizierung, echte PDF-Generierung, Datei-Storage und Zahlungsabgleich angebunden werden.
