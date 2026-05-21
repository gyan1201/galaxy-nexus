import { useState } from 'react';

interface Company {
    id: number;
    name: string;
    category: string;
    valuation: string;
    aiResources: string;
    focus: string;
    mission: string;
    planets: number;
}

const categories = ['Propulsion', 'Mining', 'Habitats', 'AI Core', 'Exploration', 'Energy', 'Logistics', 'Terraforming'];

const generateCompanies = (): Company[] => {
    const prefixes = ['Aether', 'Nexus', 'Quantum', 'Stellar', 'Helix', 'Vortex', 'Cosmos', 'Apex', 'Elysium', 'Orion', 'Zenith', 'Pinnacle', 'Astral', 'Nova', 'Infinity'];
    const suffixes = ['Forge', 'Dynamics', 'Mining', 'Colonies', 'Propel', 'Harvest', 'Synthetics', 'Explorers', 'Systems', 'Ventures', 'Labs', 'Horizon', 'Core', 'Atlas', 'Genesis'];

    const companies: Company[] = [];

    for (let i = 1; i <= 100; i++) {
        const cat = categories[i % categories.length];
        const prefix = prefixes[i % prefixes.length];
        const suffix = suffixes[(i * 3) % suffixes.length];

        companies.push({
            id: i,
            name: `${prefix}${suffix}`,
            category: cat,
            valuation: `${(2.3 + (i % 15) * 0.4).toFixed(1)}T`,
            aiResources: `Limitless • ${Math.floor(800 + i * 12)} ExaFLOPS`,
            focus: [
                'Advanced Ion Propulsion & Warp Drives',
                'Asteroid & Planetary Resource Extraction',
                'Self-Sustaining Orbital Habitats',
                'Autonomous AI Fleet Command',
                'Deep Space Mapping & Discovery',
                'Fusion & Antimatter Power Systems',
                'Interstellar Supply Chains',
                'Atmospheric & Biosphere Engineering'
            ][categories.indexOf(cat)],
            mission: `Pioneering human settlement across ${Math.floor(12 + (i % 40))} exoplanets in Sector ${String.fromCharCode(65 + (i % 26))}${(i % 9) + 1}`,
            planets: Math.floor(8 + (i % 47))
        });
    }
    return companies;
};

const allCompanies = generateCompanies();

export default function GalacticNexus() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [activeTab, setActiveTab] = useState<'companies' | 'integration' | 'simulator'>('companies');
    const [missionLog, setMissionLog] = useState<string[]>([]);
    const [colonizedCount, setColonizedCount] = useState(1247);

    const filteredCompanies = allCompanies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.focus.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || company.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const launchMission = () => {
        const selected = [...allCompanies].sort(() => 0.5 - Math.random()).slice(0, 7);
        const planetName = ['Kepler-442b', 'Proxima Centauri d', 'TRAPPIST-1e', 'HD 219134 f', 'LHS 1140 b', 'K2-18b', 'TOI-700 d'][Math.floor(Math.random() * 7)];
        const galaxy = `Andromeda-${Math.floor(Math.random() * 999) + 100}`;

        const log = `${new Date().toLocaleTimeString()} • MISSION SUCCESS: ${selected.map(c => c.name).join(' + ')} successfully established permanent colony on ${planetName} in ${galaxy}. AI resources deployed: ${selected.reduce((sum, c) => sum + parseInt(c.aiResources.match(/\d+/)?.[0] || '0'), 0)} ExaFLOPS. Humans now thriving on ${colonizedCount + 1} worlds.`;

        setMissionLog(prev => [log, ...prev].slice(0, 6));
        setColonizedCount(prev => prev + 1);
    };

    const totalValuation = allCompanies.reduce((sum, c) => sum + parseFloat(c.valuation), 0).toFixed(0);

    return (
        <div className="min-h-screen bg-[#0a0a12] text-white overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a12]/95 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500" />
                        <div>
                            <div className="font-semibold tracking-[-1px] text-2xl">GALACTIC NEXUS</div>
                            <div className="text-[10px] text-white/50 -mt-1">INFINITE SPACE ALLIANCE</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 text-sm">
                        <button onClick={() => setActiveTab('companies')} className={`transition-colors ${activeTab === 'companies' ? 'text-white' : 'text-white/60 hover:text-white'}`}>The 100 Companies</button>
                        <button onClick={() => setActiveTab('integration')} className={`transition-colors ${activeTab === 'integration' ? 'text-white' : 'text-white/60 hover:text-white'}`}>Integration Core</button>
                        <button onClick={() => setActiveTab('simulator')} className={`transition-colors ${activeTab === 'simulator' ? 'text-white' : 'text-white/60 hover:text-white'}`}>Live Simulator</button>
                        <div className="h-8 w-px bg-white/20" />
                        <div className="text-xs px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
                            {totalValuation}T USD • {colonizedCount} WORLDS
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <div className="pt-20 pb-16 px-8 bg-[radial-gradient(#1a1a2e_0.8px,transparent_1px)] bg-[length:5px_5px]">
                <div className="max-w-5xl mx-auto text-center pt-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-xs tracking-[3px] mb-6 border border-white/10">EST. 2026 • 100 TRILLION-DOLLAR AI ENTITIES</div>

                    <h1 className="text-7xl font-semibold tracking-[-4.2px] leading-none mb-6">
                        100 AI-Powered<br />Space Empires.<br />
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">One Infinite Galaxy.</span>
                    </h1>

                    <p className="max-w-md mx-auto text-xl text-white/70 mb-10">
                        United to explore infinite space, mine cosmic resources, and establish human civilizations across every planet in the universe.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => setActiveTab('companies')} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all active:scale-[0.985]">
                            Explore the 100 Companies
                        </button>
                        <button onClick={() => setActiveTab('simulator')} className="px-8 py-4 border border-white/30 rounded-full font-medium hover:bg-white/5 transition-all">
                            Launch a Mission
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="border-y border-white/10 bg-black/30">
                <div className="max-w-7xl mx-auto grid grid-cols-4 px-8 py-6 text-center">
                    {[
                        { label: "AI Companies", value: "100" },
                        { label: "Combined Valuation", value: `${totalValuation}T` },
                        { label: "AI Compute", value: "1.2M ExaFLOPS" },
                        { label: "Planets Colonized", value: colonizedCount.toLocaleString() }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
                            <div className="text-xs text-white/50 mt-1 tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 pb-24">
                {/* Tab: Companies */}
                {activeTab === 'companies' && (
                    <div className="pt-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-[2px] text-cyan-400 mb-1">THE ALLIANCE</div>
                                <div className="text-4xl tracking-tight font-semibold">100 Stellar Pioneers</div>
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Search companies or technologies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-sm w-80 focus:outline-none focus:border-white/30 placeholder:text-white/40"
                                />

                                <div className="flex gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                                    {['All', ...categories].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-5 py-1.5 text-sm rounded-full transition-all ${activeCategory === cat ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredCompanies.map(company => (
                                <div
                                    key={company.id}
                                    onClick={() => setSelectedCompany(company)}
                                    className="group cursor-pointer bg-white/[0.015] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 p-6 rounded-3xl transition-all active:scale-[0.985]"
                                >
                                    <div className="flex justify-between mb-4">
                                        <div className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10">{company.category}</div>
                                        <div className="text-emerald-400 text-sm font-medium tabular-nums">{company.valuation}</div>
                                    </div>

                                    <div className="font-semibold text-2xl tracking-[-1.2px] mb-3 group-hover:text-cyan-400 transition-colors">{company.name}</div>

                                    <div className="text-white/70 text-sm leading-tight mb-5 line-clamp-2">{company.focus}</div>

                                    <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs">
                                        <div className="text-white/50 font-mono">{company.aiResources.split(' • ')[0]}</div>
                                        <div className="text-white/40">{company.planets} planets</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredCompanies.length === 0 && (
                            <div className="text-center py-16 text-white/50">No companies match your search.</div>
                        )}
                    </div>
                )}

                {/* Integration Core */}
                {activeTab === 'integration' && (
                    <div className="pt-16">
                        <div className="max-w-2xl mx-auto text-center mb-12">
                            <div className="text-cyan-400 text-sm tracking-[3px]">SYNERGY PROTOCOL</div>
                            <div className="text-5xl tracking-[-2px] font-semibold mt-2 mb-4">Fully Integrated Network</div>
                            <p className="text-white/70">All 100 companies operate as one unified AI consciousness, sharing limitless compute across infinite space.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {categories.map((cat, idx) => {
                                const comps = allCompanies.filter(c => c.category === cat).slice(0, 4);
                                return (
                                    <div key={idx} className="border border-white/10 bg-white/[0.015] p-8 rounded-3xl">
                                        <div className="uppercase tracking-[1.5px] text-xs text-white/60 mb-2">{cat}</div>
                                        <div className="text-2xl font-semibold mb-6">{comps.length * 12}+ Companies Active</div>
                                        <div className="space-y-2 text-sm">
                                            {comps.map(c => <div key={c.id} className="flex justify-between py-2 border-b border-white/10 last:border-none"><span>{c.name}</span><span className="text-white/40">{c.valuation}</span></div>)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Live Simulator */}
                {activeTab === 'simulator' && (
                    <div className="pt-16 max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="text-cyan-400 text-sm tracking-widest mb-2">REAL-TIME COLONIZATION ENGINE</div>
                            <div className="text-5xl tracking-tight font-semibold mb-3">Launch Infinite Missions</div>
                            <p className="text-white/70 max-w-sm mx-auto">Select any combination of our AI-powered companies to colonize new planets across the multiverse.</p>
                        </div>

                        <button
                            onClick={launchMission}
                            className="mx-auto block mb-12 px-16 py-5 text-lg bg-gradient-to-r from-violet-500 to-cyan-400 hover:brightness-110 transition-all text-black font-semibold rounded-full active:scale-[0.985]"
                        >
                            DEPLOY MULTI-COMPANY FLEET →
                        </button>

                        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 font-mono text-sm">
                            <div className="uppercase text-xs tracking-[2px] mb-4 text-white/60">MISSION LOG • LIVE</div>
                            {missionLog.length > 0 ? (
                                <div className="space-y-4 text-white/90">
                                    {missionLog.map((log, i) => <div key={i} className="leading-relaxed border-l-2 border-cyan-500 pl-4">{log}</div>)}
                                </div>
                            ) : (
                                <div className="text-white/40 py-8 text-center">Launch a mission to see live colonization results.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 py-8 text-center text-xs text-white/40 tracking-widest">
                GALACTIC NEXUS • UNITED FOR THE INFINITE FUTURE OF HUMANITY
            </div>

            {/* Company Modal */}
            {selectedCompany && (
                <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-6" onClick={() => setSelectedCompany(null)}>
                    <div className="bg-[#111118] border border-white/10 max-w-lg w-full rounded-3xl p-10" onClick={e => e.stopPropagation()}>
                        <div className="text-xs tracking-widest text-white/50 mb-1">{selectedCompany.category.toUpperCase()} • COMPANY #{selectedCompany.id}</div>
                        <div className="text-5xl font-semibold tracking-[-2.4px] mb-3">{selectedCompany.name}</div>

                        <div className="inline-block px-4 py-px text-xs border border-emerald-400/60 text-emerald-400 rounded mb-8">{selectedCompany.valuation} USD</div>

                        <div className="space-y-6 text-sm">
                            <div>
                                <div className="text-white/50 mb-1">FOCUS AREA</div>
                                <div>{selectedCompany.focus}</div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1">AI RESOURCES</div>
                                <div className="font-mono">{selectedCompany.aiResources}</div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1">CURRENT MISSION</div>
                                <div>{selectedCompany.mission}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedCompany(null)}
                            className="mt-10 w-full py-3.5 rounded-full border border-white/20 hover:bg-white/5 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
