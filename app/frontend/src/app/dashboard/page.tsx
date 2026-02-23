// app/frontend/src/app/aid/page.tsx

const PLACEHOLDER_PACKAGES = [
  {
    id: 'AID-001',
    title: 'Emergency Food Relief',
    region: 'Eastern Region',
    amount: '12,500 USDC',
    recipients: 250,
    status: 'Active',
  },
  {
    id: 'AID-002',
    title: 'Medical Supplies',
    region: 'Northern Zone',
    amount: '8,000 USDC',
    recipients: 120,
    status: 'Pending',
  },
  {
    id: 'AID-003',
    title: 'Shelter & Housing',
    region: 'Coastal Area',
    amount: '30,000 USDC',
    recipients: 75,
    status: 'Upcoming',
  },
];

const STATUS: Record<string, string> = {
  Active:
    'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  Pending:
    'bg-gray-50 text-gray-500 border border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700',
  Upcoming:
    'bg-gray-50 text-gray-400 border border-gray-100 dark:bg-gray-800/20 dark:text-gray-500 dark:border-gray-800',
};

export default function AidDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:to-gray-950">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Aid Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
              Onchain Aid, Fully Transparent
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              This dashboard will display humanitarian aid packages funded via
              Soter on the Stellar / Soroban blockchain every distribution
              anchored onchain and auditable by anyone.
            </p>
          </div>

          {/* Stat Cards — same style as home feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Packages Funded</h3>
              <p className="text-3xl font-bold">—</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Live data coming soon
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Total Distributed</h3>
              <p className="text-3xl font-bold">—</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Pulled from Soroban contracts
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Recipients Reached</h3>
              <p className="text-3xl font-bold">—</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Verified on-chain claims
              </p>
            </div>
          </div>

          {/* Package list — same white card wrapper as AidPackageList on home */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Aid Packages</h2>
              <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                Placeholder — live data in a future wave
              </span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-left">
                    {[
                      'ID',
                      'Title',
                      'Region',
                      'Amount',
                      'Recipients',
                      'Status',
                    ].map(h => (
                      <th
                        key={h}
                        className="pb-3 pr-6 font-medium text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                  {PLACEHOLDER_PACKAGES.map(pkg => (
                    <tr
                      key={pkg.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 pr-6 font-mono text-xs text-gray-400">
                        {pkg.id}
                      </td>
                      <td className="py-4 pr-6 font-medium">{pkg.title}</td>
                      <td className="py-4 pr-6 text-gray-600 dark:text-gray-400">
                        {pkg.region}
                      </td>
                      <td className="py-4 pr-6 font-semibold">{pkg.amount}</td>
                      <td className="py-4 pr-6 text-gray-600 dark:text-gray-400">
                        {pkg.recipients}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS[pkg.status]}`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {PLACEHOLDER_PACKAGES.map(pkg => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm leading-snug">
                      {pkg.title}
                    </p>
                    <span
                      className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS[pkg.status]}`}
                    >
                      {pkg.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {pkg.region}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="font-semibold">{pkg.amount}</span>
                    <span className="text-gray-500">
                      {pkg.recipients} recipients
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-400">{pkg.id}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coming-soon note */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Full API wiring, claim tracking, and impact reports coming in a
            future wave.
          </p>

          {/* CTA buttons — same as home page */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Notified
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
