"use client";

import { useMemo, useState } from "react";

const navItems = [
  "Dashboard",
  "Einnahmen & Ausgaben",
  "Rechnungen",
  "DSGVO",
  "Steuern",
  "Absetzbare Kosten",
  "Fahrtenbuch",
  "Kunden",
  "Fahrzeugakten",
  "Workflow",
  "Gutachten",
  "Einstellungen"
];

const customers = [
  { name: "Autohaus König GmbH", address: "Hafenstraße 12, 20457 Hamburg", phone: "+49 40 123456", email: "dispo@auto-koenig.de", type: "Händler", privacy: "Erledigt", jobs: 2, invoices: 1, history: "12 Gutachten seit 2025", docs: "AVV, Rechnungen" },
  { name: "Mara Stein", address: "Ringallee 8, 28195 Bremen", phone: "+49 421 777888", email: "mara.stein@example.de", type: "Privatkunde", privacy: "In Arbeit", jobs: 1, invoices: 1, history: "Kaufberatung BMW", docs: "Einwilligung offen" },
  { name: "NordWerkstatt AG", address: "Prüfweg 4, 30159 Hannover", phone: "+49 511 456900", email: "service@nordwerkstatt.de", type: "Werkstatt", privacy: "Erledigt", jobs: 3, invoices: 0, history: "Rahmenschaden-Prüfung", docs: "Rahmenvertrag" }
];

const vehicles = [
  { maker: "BMW", model: "320d Touring", year: 2019, firstRegistration: "03/2019", mileage: 118400, vin: "WBA8K71090A123456", plate: "HH DI 320", engine: "2.0 Diesel 190 PS", gearbox: "Automatik", fuel: "Diesel", condition: "Gepflegt mit Lackmängeln", images: 12, damages: "Stoßfänger hinten, Felge VR", report: "Offen", customer: "Mara Stein" },
  { maker: "Mercedes-Benz", model: "Vito 116 CDI", year: 2021, firstRegistration: "08/2021", mileage: 76400, vin: "W1V4476031X987654", plate: "H NW 116", engine: "2.0 Diesel", gearbox: "Automatik", fuel: "Diesel", condition: "Gewerblich genutzt", images: 18, damages: "Tür links, Schweller", report: "In Prüfung", customer: "NordWerkstatt AG" },
  { maker: "Tesla", model: "Model 3 Long Range", year: 2022, firstRegistration: "01/2022", mileage: 42100, vin: "LRW3E7FA9NC654321", plate: "HH AK 33E", engine: "Dual Motor", gearbox: "Direktantrieb", fuel: "Elektro", condition: "Sehr gut", images: 22, damages: "Keine sichtbaren Schäden", report: "Fertig", customer: "Autohaus König GmbH" }
];

const reports = [
  { id: "GA-2026-041", customer: "Autohaus König GmbH", vehicle: "Tesla Model 3", risk: 18, recommendation: "Kaufen", status: "Fertig" },
  { id: "GA-2026-042", customer: "Mara Stein", vehicle: "BMW 320d", risk: 44, recommendation: "Nachverhandeln", status: "Offen" },
  { id: "GA-2026-043", customer: "NordWerkstatt AG", vehicle: "Mercedes Vito", risk: 71, recommendation: "Finger weg", status: "In Prüfung" }
];

const invoices = [
  { number: "RE-2026-1001", date: "2026-06-01", serviceDate: "2026-05-31", customer: "Autohaus König GmbH", vehicle: "Tesla Model 3 / LRW3E7FA9NC654321 / HH AK 33E", description: "Kaufgutachten inklusive Lackmessung und Probefahrt", net: 420, vat: 79.8, gross: 499.8, due: "14 Tage", bank: "DE12 1002 0500 0001 2345 67", status: "Bezahlt" },
  { number: "RE-2026-1002", date: "2026-06-02", serviceDate: "2026-06-02", customer: "Mara Stein", vehicle: "BMW 320d Touring / WBA8K71090A123456 / HH DI 320", description: "Gebrauchtwagenprüfung mit Kurzbericht", net: 290, vat: 55.1, gross: 345.1, due: "7 Tage", bank: "DE12 1002 0500 0001 2345 67", status: "Versendet" },
  { number: "RE-2026-1003", date: "2026-05-18", serviceDate: "2026-05-17", customer: "NordWerkstatt AG", vehicle: "Mercedes Vito / W1V4476031X987654 / H NW 116", description: "Schadengutachten Transporter", net: 680, vat: 129.2, gross: 809.2, due: "14 Tage", bank: "DE12 1002 0500 0001 2345 67", status: "Überfällig" },
  { number: "RE-2026-1004", date: "2026-06-04", serviceDate: "2026-06-04", customer: "Versicherung Hanse", vehicle: "Audi A4 / WAUZZZF40KA000111 / HH VH 22", description: "Beweissicherung und Fotodokumentation", net: 510, vat: 96.9, gross: 606.9, due: "30 Tage", bank: "DE12 1002 0500 0001 2345 67", status: "Entwurf" }
];

const expenses = [
  ["2026-06-01", "Fahrzeugkosten", "Shell", "Diesel Außentermin", 72.4, 13.76, 86.16, "Geschäftskonto", "Ja"],
  ["2026-05-28", "Lackdickenmessgerät", "ProGauge", "Kalibrierung Sensor", 149, 28.31, 177.31, "Kreditkarte", "Ja"],
  ["2026-05-23", "Software", "CloudInspect", "Gutachten-Software", 89, 16.91, 105.91, "SEPA", "Ja"],
  ["2026-05-20", "Kamera/Fotoausrüstung", "FotoHaus", "Makroobjektiv", 399, 75.81, 474.81, "Kreditkarte", "Teilweise"],
  ["2026-05-18", "Telefon/Internet", "Telekom", "Mobilfunk Gutachter", 59, 11.21, 70.21, "SEPA", "Teilweise"],
  ["2026-05-12", "Werbung/Marketing", "PrintNow", "Flyer Händlerakquise", 120, 22.8, 142.8, "Geschäftskonto", "Ja"],
  ["2026-05-05", "Weiterbildung", "TÜV Akademie", "Seminar Unfallschäden", 520, 98.8, 618.8, "Geschäftskonto", "Ja"],
  ["2026-05-02", "Bürobedarf", "OfficeLine", "Archivboxen", 46, 8.74, 54.74, "Bar", "Ja"]
].map(([date, category, supplier, description, net, vat, gross, paidBy, deductible]) => ({ date, category, supplier, description, net, vat, gross, paidBy, deductible, note: "Beleg-Upload vorbereitet" }));

const trips = [
  ["2026-06-01", "Hamburg Büro", "Autohaus König", "Autohaus König GmbH", "Fahrzeugprüfung Tesla", 18420, 18458, "geschäftlich"],
  ["2026-06-02", "Hamburg Büro", "Bremen", "Mara Stein", "Kaufberatung BMW", 18458, 18612, "geschäftlich"],
  ["2026-06-03", "Hamburg", "Hannover", "NordWerkstatt AG", "Schadengutachten Vito", 18612, 18895, "geschäftlich"],
  ["2026-06-03", "Hannover", "Hamburg", "NordWerkstatt AG", "Rückfahrt", 18895, 19178, "geschäftlich"],
  ["2026-06-04", "Hamburg", "Altona", "Privat", "Private Erledigung", 19178, 19190, "privat"]
].map(([date, start, destination, customer, purpose, kmStart, kmEnd, type]) => ({ date, start, destination, customer, purpose, kmStart, kmEnd, kilometers: kmEnd - kmStart, type, note: "Exportfähig" }));

const gdprTasks = ["Datenschutzerklärung vorhanden", "Kunde hat DSGVO-Hinweis erhalten", "Einwilligung zur Datenverarbeitung dokumentiert", "Fahrzeugbilder sicher gespeichert", "Kennzeichen/VIN geschützt gespeichert", "Cloudspeicher DSGVO-konform", "Passwortschutz aktiv", "Backup eingerichtet", "Löschkonzept vorhanden", "Zugriff nur für berechtigte Personen", "Auftragsverarbeitungsverträge vorhanden", "Archivierungsfristen dokumentiert"].map((task, i) => ({ task, status: ["Erledigt", "In Arbeit", "Offen", "Nicht relevant"][i % 4] }));

const taxTasks = ["Gewerbeanmeldung erledigt", "Steuernummer vorhanden", "Geschäftskonto eingerichtet", "Buchhaltungssoftware eingerichtet", "Umsatzsteuerpflicht geprüft", "Kleinunternehmerregelung geprüft", "Umsatzsteuervoranmeldung vorbereiten", "Einnahmenüberschussrechnung vorbereiten", "Belege vollständig hochgeladen", "Fahrtenbuch aktualisiert", "Steuerrücklage gebildet", "Steuerberater-Export vorbereitet", "Jahresabschluss vorbereitet"].map((task, i) => ({ task, due: `2026-${String((i % 6) + 6).padStart(2, "0")}-15`, frequency: ["einmalig", "monatlich", "quartalsweise", "jährlich"][i % 4], status: ["Erledigt", "In Arbeit", "Offen"][i % 3], note: "Für Kfz-Sachverständigenbetrieb relevant" }));

const deductibleCosts = [
  ["Fahrzeugkosten", "Dienstfahrzeug für Besichtigungen", "anteilig", "Privatanteil sauber trennen", "Fahrtenbuch oder 1%-Regel"],
  ["Diesel/Benzin", "Kraftstoff für Ortstermine", "abhängig vom Nutzungsanteil", "Nur betriebliche Fahrten vollständig", "Tankbeleg + Fahrtenbuch"],
  ["Laptop", "Gutachtenbearbeitung", "voll", "Bei Mischnutzung anteilig", "Rechnung"],
  ["Smartphone", "Kundenkommunikation/Fotos", "anteilig", "Privatanteil dokumentieren", "Rechnung + Nutzungsanteil"],
  ["Kamera", "Schadendokumentation", "voll", "Typisches Gutachter-Arbeitsmittel", "Rechnung"],
  ["Lackdickenmessgerät", "Lackprüfung", "voll", "Direkter Fachbezug", "Rechnung/Kalibrierung"],
  ["Diagnosegerät", "Fehlerspeicher auslesen", "voll", "Fachwerkzeug", "Rechnung"],
  ["Softwarelizenzen", "Buchhaltung/Gutachten", "voll", "Abo monatlich erfassen", "Rechnung"],
  ["Fortbildungen", "TÜV-/Schadenseminare", "voll", "Fachlicher Bezug nötig", "Teilnahmebestätigung"],
  ["Steuerberater", "EÜR/Jahresabschluss", "voll", "Betriebsausgabe", "Honorarrechnung"]
].map(([category, example, deductibility, hint, proof]) => ({ category, example, deductibility, hint, proof }));

const workflowJobs = [
  { customer: "Mara Stein", vehicle: "BMW 320d", status: "Neue Anfrage", next: "DSGVO-Hinweis senden", due: "2026-06-05", priority: "Hoch", owner: "S. Berger", note: "Besichtigung in Bremen" },
  { customer: "Autohaus König GmbH", vehicle: "Tesla Model 3", status: "Gutachten erstellt", next: "Rechnung versenden", due: "2026-06-06", priority: "Mittel", owner: "A. Kaya", note: "PDF-Freigabe offen" },
  { customer: "NordWerkstatt AG", vehicle: "Mercedes Vito", status: "Bilder hochgeladen", next: "Risiko prüfen", due: "2026-06-07", priority: "Hoch", owner: "S. Berger", note: "Unterbodenbilder fehlen" },
  { customer: "Versicherung Hanse", vehicle: "Audi A4", status: "Termin vereinbart", next: "Fahrzeugdaten erfassen", due: "2026-06-10", priority: "Niedrig", owner: "A. Kaya", note: "Flottenkunde" },
  { customer: "Privatkunde Lenz", vehicle: "VW Golf", status: "Rechnung versendet", next: "Zahlung überwachen", due: "2026-06-12", priority: "Mittel", owner: "S. Berger", note: "SEPA erwartet" }
];

const inspectionAreas = ["Karosserie", "Lack", "Rost", "Unterboden", "Motor", "Getriebe", "Fahrwerk", "Bremsen", "Reifen", "Elektronik", "Innenraum", "Probefahrt", "Dokumente", "Unfallspuren"];
const workflowSteps = ["Neue Anfrage", "Kunde kontaktiert", "Termin vereinbart", "Fahrzeugdaten erfasst", "Fahrzeug geprüft", "Bilder hochgeladen", "Gutachten erstellt", "Rechnung erstellt", "Rechnung versendet", "Zahlung eingegangen", "Auftrag archiviert"];
const categories = ["Fahrzeugkosten", "Werkzeug", "Kamera/Fotoausrüstung", "Lackdickenmessgerät", "Diagnosegerät", "Software", "Laptop/IT", "Telefon/Internet", "Werbung/Marketing", "Versicherungen", "Weiterbildung", "Bürobedarf", "Steuerberater", "Reisekosten", "Sonstiges"];

function euro(value) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

function StatusPill({ status }) {
  const tone = status === "Bezahlt" || status === "Erledigt" || status === "Kaufen" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200" : status === "Überfällig" || status === "Kritisch" || status === "Finger weg" ? "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200" : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

function Card({ title, value, helper, status = "neutral" }) {
  const border = status === "green" ? "border-l-emerald-500" : status === "yellow" ? "border-l-amber-500" : status === "red" ? "border-l-red-600" : "border-l-inspector";
  return (
    <article className={`rounded-2xl border border-slate-200 border-l-4 ${border} bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900`}>
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helper}</p>
    </article>
  );
}

function Section({ title, description, children, action }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-950">
          <tr>{headers.map((header) => <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row, index) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60" key={index}>{row.map((cell, cellIndex) => <td className="whitespace-nowrap px-4 py-3" key={cellIndex}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function FormGrid({ children }) {
  return <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

function Field({ label, type = "text", placeholder, children }) {
  return (
    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
      {label}
      {children || <input className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" type={type} placeholder={placeholder} />}
    </label>
  );
}

export default function DriveInspectAccountingApp() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const monthlyIncome = invoices.filter((invoice) => invoice.status === "Bezahlt").reduce((sum, invoice) => sum + invoice.gross, 0);
  const monthlyExpenses = expenses.reduce((sum, expense) => sum + expense.gross, 0);
  const profit = monthlyIncome - monthlyExpenses;
  const taxReserve = profit * 0.3;
  const filteredCosts = deductibleCosts.filter((item) => `${item.category} ${item.example}`.toLowerCase().includes(query.toLowerCase()));

  const content = useMemo(() => ({
    Dashboard: <Dashboard monthlyIncome={monthlyIncome} monthlyExpenses={monthlyExpenses} profit={profit} taxReserve={taxReserve} />,
    "Einnahmen & Ausgaben": <IncomeExpenses />,
    Rechnungen: <Invoices />,
    DSGVO: <Checklist title="DSGVO-Checkliste" description="Datenschutzpflichten für Bilder, VIN, Kennzeichen, Cloudspeicher und Kundenkommunikation." tasks={gdprTasks} />,
    Steuern: <TaxChecklist />,
    "Absetzbare Kosten": <DeductibleCosts query={query} setQuery={setQuery} filteredCosts={filteredCosts} />,
    Fahrtenbuch: <MileageLog />,
    Kunden: <Customers />,
    Fahrzeugakten: <VehicleFiles />,
    Workflow: <Workflow />,
    Gutachten: <Reports />,
    Einstellungen: <Settings />
  }), [filteredCosts, monthlyExpenses, monthlyIncome, profit, query, taxReserve]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-inspector text-lg font-black text-white">DI</div>
            <div>
              <p className="text-lg font-black tracking-tight">DriveInspect</p>
              <p className="text-xs text-slate-500">Buchhaltung</p>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${active === item ? "bg-inspector text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`} key={item} onClick={() => setActive(item)}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:pl-72">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-inspector">Kfz-Sachverständigen SaaS</p>
                <h1 className="text-2xl font-black">DriveInspect Buchhaltung</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" value={active} onChange={(event) => setActive(event.target.value)}>
                  {navItems.map((item) => <option key={item}>{item}</option>)}
                </select>
                <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950" onClick={() => setDark(!dark)}>{dark ? "Light Mode" : "Dark Mode"}</button>
                <button className="rounded-xl bg-signal px-4 py-2 text-sm font-bold text-white">PDF-Export vorbereiten</button>
              </div>
            </div>
          </header>
          <div className="space-y-6 p-4 lg:p-8">{content[active]}</div>
        </main>
      </div>
    </div>
  );
}

function Dashboard({ monthlyIncome, monthlyExpenses, profit, taxReserve }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Monatliche Einnahmen" value={euro(monthlyIncome)} helper="Bezahlt im aktuellen Mock-Monat" status="green" />
        <Card title="Monatliche Ausgaben" value={euro(monthlyExpenses)} helper="8 kategorisierte Betriebsausgaben" status="yellow" />
        <Card title="Gewinn vor Steuern" value={euro(profit)} helper="Automatisch aus Einnahmen minus Ausgaben" status={profit >= 0 ? "green" : "red"} />
        <Card title="Geschätzte Steuerrücklage" value={euro(taxReserve)} helper="30 % Standardrücklage" status="red" />
        <Card title="Offene Rechnungen" value="2" helper="Versendet oder Entwurf" status="yellow" />
        <Card title="Bezahlte Rechnungen" value="1" helper="Zahlungseingang markiert" status="green" />
        <Card title="Überfällige Rechnungen" value="1" helper="Mahnlauf empfohlen" status="red" />
        <Card title="Ampelstatus" value="Gelb" helper="DSGVO + offene Gutachten prüfen" status="yellow" />
      </div>
      <Section title="Operative Aufgaben" description="Schnellüberblick über offene Gutachten, DSGVO- und Steuerpflichten.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Offene Gutachten" value="2" helper="BMW 320d und Mercedes Vito" status="yellow" />
          <Card title="Offene DSGVO-Aufgaben" value="3" helper="Cloud, Löschkonzept, AVV" status="red" />
          <Card title="Offene Steuer-Aufgaben" value="4" helper="UStVA, EÜR, Belegprüfung" status="yellow" />
        </div>
      </Section>
    </div>
  );
}

function IncomeExpenses() {
  return (
    <div className="space-y-6">
      <Section title="Einnahmen erfassen" description="Rechnungsdaten mit Netto, MwSt, Brutto, Zahlungsstatus und Zahlungsart." action={<button className="rounded-xl bg-inspector px-4 py-2 text-sm font-bold text-white">Neue Einnahme</button>}>
        <FormGrid>
          {['Datum', 'Rechnungsnummer', 'Kunde', 'Leistung', 'Netto', 'MwSt', 'Brutto', 'Zahlungsstatus', 'Zahlungsart', 'Bemerkung'].map((field) => <Field key={field} label={field} />)}
        </FormGrid>
      </Section>
      <Section title="Ausgabenverwaltung" description="Betriebsausgaben mit Kategorie, Lieferant, Upload und steuerlicher Absetzbarkeit." action={<input className="max-w-xs rounded-xl border border-dashed border-slate-300 p-2 text-sm dark:border-slate-700" type="file" multiple />}>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <Field label="Kategorie"><select className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950">{categories.map((category) => <option key={category}>{category}</option>)}</select></Field>
          <Field label="Filter"><input className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" placeholder="Lieferant, Beschreibung, Kategorie" /></Field>
          <Field label="Beleg-Upload" type="file" />
        </div>
        <Table headers={["Datum", "Kategorie", "Lieferant", "Beschreibung", "Netto", "MwSt", "Brutto", "Bezahlt über", "Absetzbar", "Bemerkung"]} rows={expenses.map((expense) => [expense.date, expense.category, expense.supplier, expense.description, euro(expense.net), euro(expense.vat), euro(expense.gross), expense.paidBy, expense.deductible, expense.note])} />
      </Section>
    </div>
  );
}

function Invoices() {
  const nextNumber = "RE-2026-1005";
  return (
    <div className="space-y-6">
      <Section title="Sachverständigen-Rechnungsvorlage" description="Fortlaufende Rechnungsnummern, Gutachtenbezug, Kleinunternehmer-Option und vorbereiteter PDF-Export." action={<button className="rounded-xl bg-inspector px-4 py-2 text-sm font-bold text-white">Zahlungseingang markieren</button>}>
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <FormGrid>
            {['Firmenname', 'Firmenanschrift', 'Steuernummer', 'USt-ID optional', 'Rechnungsnummer automatisch fortlaufend', 'Rechnungsdatum', 'Leistungsdatum', 'Kunde', 'Kundenanschrift', 'Fahrzeug', 'VIN/Fahrgestellnummer', 'Kennzeichen', 'Leistungsbeschreibung', 'Netto-Betrag', 'MwSt', 'Brutto-Betrag', 'Zahlungsziel', 'Bankverbindung'].map((field) => <Field key={field} label={field} placeholder={field.includes('Rechnungsnummer') ? nextNumber : ''} />)}
            <Field label="Status"><select className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"><option>Entwurf</option><option>Versendet</option><option>Bezahlt</option><option>Überfällig</option></select></Field>
            <label className="flex items-center gap-2 text-sm font-medium"><input className="h-4 w-4" type="checkbox" /> Kleinunternehmerregelung aktivieren</label>
          </FormGrid>
          <div className="print-page rounded-2xl border p-6 shadow-sm">
            <p className="text-sm font-bold text-inspector">DriveInspect Sachverständigenrechnung</p>
            <h3 className="mt-3 text-2xl font-black">{nextNumber}</h3>
            <p className="mt-2 text-sm text-slate-600">Musterrechnung aus Kundendaten oder Gutachtenauftrag erzeugen. MwSt wird automatisch berechnet; PDF-Ausgabe ist als Workflow-Aktion vorbereitet.</p>
            <div className="mt-5 space-y-2 text-sm">
              <p><strong>Kunde:</strong> Autohaus König GmbH</p>
              <p><strong>Leistung:</strong> Kaufgutachten inklusive Fotodokumentation</p>
              <p><strong>Netto:</strong> {euro(420)} | <strong>MwSt:</strong> {euro(79.8)} | <strong>Brutto:</strong> {euro(499.8)}</p>
            </div>
          </div>
        </div>
      </Section>
      <Table headers={["Nummer", "Datum", "Kunde", "Fahrzeug", "Netto", "MwSt", "Brutto", "Zahlungsziel", "Status"]} rows={invoices.map((invoice) => [invoice.number, invoice.date, invoice.customer, invoice.vehicle, euro(invoice.net), euro(invoice.vat), euro(invoice.gross), invoice.due, <StatusPill key={invoice.number} status={invoice.status} />])} />
    </div>
  );
}

function Checklist({ title, description, tasks }) {
  return (
    <Section title={title} description={description}>
      <Table headers={["Checklistenpunkt", "Status"]} rows={tasks.map((item) => [item.task, <StatusPill key={item.task} status={item.status} />])} />
    </Section>
  );
}

function TaxChecklist() {
  return (
    <Section title="Steuer-Checkliste für Kfz-Gutachter" description="Aufgabenübersicht für Gewerbe, Umsatzsteuer, EÜR, Fahrtenbuch, Rücklagen und Steuerberater-Export.">
      <Table headers={["Aufgabe", "Fälligkeit", "Frequenz", "Status", "Bemerkung"]} rows={taxTasks.map((item) => [item.task, item.due, item.frequency, <StatusPill key={item.task} status={item.status} />, item.note])} />
    </Section>
  );
}

function DeductibleCosts({ query, setQuery, filteredCosts }) {
  return (
    <Section title="Absetzbare Kosten" description="Such- und Filterübersicht für typische Kosten eines selbstständigen Kfz-Sachverständigen." action={<input className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kostenart suchen" />}>
      <Table headers={["Kategorie", "Beispiel", "Absetzbarkeit", "Hinweis", "Benötigter Nachweis"]} rows={filteredCosts.map((item) => [item.category, item.example, item.deductibility, item.hint, item.proof])} />
    </Section>
  );
}

function MileageLog() {
  return (
    <Section title="Digitales Fahrtenbuch" description="Kilometer werden aus Start- und Endstand berechnet; Monatsübersicht und Steuerberater-Export sind vorbereitet." action={<button className="rounded-xl bg-inspector px-4 py-2 text-sm font-bold text-white">Export Steuerberater</button>}>
      <FormGrid>
        {['Datum', 'Startort', 'Zielort', 'Kunde', 'Zweck der Fahrt', 'Kilometerstand Start', 'Kilometerstand Ende', 'geschäftlich / privat', 'Bemerkung'].map((field) => <Field key={field} label={field} />)}
      </FormGrid>
      <div className="mt-5">
        <Table headers={["Datum", "Start", "Ziel", "Kunde", "Zweck", "KM Start", "KM Ende", "KM", "Art", "Bemerkung"]} rows={trips.map((trip) => [trip.date, trip.start, trip.destination, trip.customer, trip.purpose, trip.kmStart, trip.kmEnd, trip.kilometers, trip.type, trip.note])} />
      </div>
    </Section>
  );
}

function Customers() {
  return (
    <Section title="Kundenverwaltung" description="Privatkunden, Händler, Werkstätten und Versicherungen inklusive DSGVO-Status, Aufträgen, Rechnungen und Dokumenten." action={<button className="rounded-xl bg-inspector px-4 py-2 text-sm font-bold text-white">Kunde anlegen</button>}>
      <Table headers={["Name", "Adresse", "Telefon", "E-Mail", "Typ", "DSGVO", "Offene Aufträge", "Offene Rechnungen", "Historie", "Dokumente"]} rows={customers.map((customer) => [customer.name, customer.address, customer.phone, customer.email, customer.type, <StatusPill key={customer.name} status={customer.privacy} />, customer.jobs, customer.invoices, customer.history, customer.docs])} />
    </Section>
  );
}

function VehicleFiles() {
  return (
    <Section title="Fahrzeugakte" description="Fahrzeugdaten, Bilder, Schäden, Gutachtenstatus und Kundenverknüpfung zentral verwalten." action={<input className="max-w-xs rounded-xl border border-dashed border-slate-300 p-2 text-sm dark:border-slate-700" type="file" multiple />}>
      <Table headers={["Hersteller", "Modell", "Baujahr", "Erstzulassung", "KM", "VIN", "Kennzeichen", "Motorisierung", "Getriebe", "Kraftstoff", "Zustand", "Bilder", "Schäden", "Gutachtenstatus", "Kunde"]} rows={vehicles.map((vehicle) => [vehicle.maker, vehicle.model, vehicle.year, vehicle.firstRegistration, vehicle.mileage.toLocaleString("de-DE"), vehicle.vin, vehicle.plate, vehicle.engine, vehicle.gearbox, vehicle.fuel, vehicle.condition, vehicle.images, vehicle.damages, vehicle.report, vehicle.customer])} />
    </Section>
  );
}

function Workflow() {
  return (
    <Section title="Workflow vom Kundenkontakt bis Rechnung" description="Kanban-Ansicht für Akquise, Prüfung, Gutachten, Rechnung, Zahlung und Archivierung.">
      <div className="grid gap-4 overflow-x-auto xl:grid-cols-4">
        {workflowSteps.slice(0, 8).map((step) => (
          <div className="min-h-48 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950" key={step}>
            <h3 className="mb-3 text-sm font-black">{step}</h3>
            <div className="space-y-3">
              {workflowJobs.filter((job) => job.status === step).map((job) => (
                <article className="rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-900" key={`${job.customer}-${job.vehicle}`}>
                  <p className="font-bold">{job.customer}</p>
                  <p className="text-slate-500">{job.vehicle}</p>
                  <p className="mt-2"><strong>Nächster Schritt:</strong> {job.next}</p>
                  <p><strong>Fällig:</strong> {job.due}</p>
                  <p><strong>Priorität:</strong> {job.priority}</p>
                  <p><strong>Zuständig:</strong> {job.owner}</p>
                  <p className="text-slate-500">{job.note}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reports() {
  const scores = inspectionAreas.map((area, index) => ({ area, result: ["OK", "Hinweis", "Mangel", "Kritisch"][index % 4] }));
  return (
    <div className="space-y-6">
      <Section title="Gutachten-/Prüfbericht-Modul" description="Prüfbereiche, Risikoscore, Kaufempfehlung, Upload je Prüfpunkt und vorbereiteter PDF-Gutachtenexport." action={<input className="max-w-xs rounded-xl border border-dashed border-slate-300 p-2 text-sm dark:border-slate-700" type="file" multiple />}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {scores.map((score) => <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800" key={score.area}><p className="font-bold">{score.area}</p><div className="mt-2"><StatusPill status={score.result} /></div><input className="mt-3 text-xs" type="file" /></div>)}
        </div>
      </Section>
      <Table headers={["Gutachten", "Kunde", "Fahrzeug", "Risiko-Score", "Kaufempfehlung", "Status"]} rows={reports.map((report) => [report.id, report.customer, report.vehicle, `${report.risk}/100`, <StatusPill key={report.id} status={report.recommendation} />, report.status])} />
    </div>
  );
}

function Settings() {
  return (
    <Section title="Einstellungen" description="Firmendaten, Logo, Bankdaten, Steuerlogik, Rechnungstexte, Datenschutztexte und Benutzerrollen.">
      <FormGrid>
        {['Firmendaten', 'Logo hochladen', 'Bankdaten', 'Steuernummer', 'Standard-Zahlungsziel', 'Standard-Steuerrücklage in %', 'Rechnungstext', 'Datenschutztext'].map((field) => <Field key={field} label={field} type={field.includes('Logo') ? 'file' : 'text'} />)}
        <label className="flex items-center gap-2 text-sm font-medium"><input className="h-4 w-4" type="checkbox" defaultChecked /> Umsatzsteuer aktiv</label>
        <label className="flex items-center gap-2 text-sm font-medium"><input className="h-4 w-4" type="checkbox" /> Kleinunternehmerregelung aktiv</label>
        <Field label="Benutzerrolle"><select className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"><option>Admin</option><option>Sachverständiger</option><option>Steuerberater nur lesend</option></select></Field>
      </FormGrid>
    </Section>
  );
}
