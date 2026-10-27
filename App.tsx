import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Calendar,
  Clock3,
  Check,
} from "lucide-react";
import profilePhotoUrl from "container:///mnt/data/src/assets/56c0926fd84f62fd-image_eb906a.png";

// IntersectionObserver hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = el.querySelectorAll("[data-fade]");
            targets.forEach((t, i) => {
              setTimeout(() => {
                (t as HTMLElement).classList.add("in-view");
              }, i * 70);
            });
            // Also reveal self if it has data-fade
            if (el.hasAttribute("data-fade")) {
              el.classList.add("in-view");
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    // fallback: reveal after mount for above-the-fold
    setTimeout(() => {
      el.querySelectorAll("[data-fade]").forEach((t) => {
        const rect = (t as HTMLElement).getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          (t as HTMLElement).classList.add("in-view");
        }
      });
    }, 100);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function App() {
  const heroRef = useReveal();
  const workRef = useReveal();
  const expRef = useReveal();
  const eduRef = useReveal();
  const skillsRef = useReveal();
  const contactRef = useReveal();

  const [activeNav, setActiveNav] = useState("work");

  useEffect(() => {
    const sections = ["work", "experience", "education", "contact"];
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveNav(id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDownloadResume = () => {
    const resumeContent = `MILDRONICO A. MODESTO JR.
IT Site Support & Web Developer
Tacloban City, Philippines | mildronico@gmail.com | 09662519712

SUMMARY
IT Professional with 5+ years experience in government IT support, data systems, and modern web development. Founder of TindaCloud SaaS.

EXPERIENCE
IT Site Support - STRADCOM - Jan 2021 to Oct 2026
- Coordinated technical support operations
- Resolved end-user queries with empathetic support
- Managed escalation procedures
- Led team-building initiatives

National Household Targeting System Encoder - DSWD Tacloban - Jan 2020 to Aug 2020
- Encoded household data with accuracy
- Segregated batches and prepared packs

Administrative Aid I - City Hall Tacloban - Jan 2018 to Dec 2018
- Troubleshot hardware/software issues
- Tracked inventory and maintenance

EDUCATION
BS in Information Technology - Leyte Normal University - March 15, 2018
High School - Sagkahan National High School - 2014 With Honor
Elementary - San Fernando Central School - 2010

PROJECTS
TindaCloud - E-commerce & POS SaaS - Next.js 14, Vercel
Human Frequency - Booking System Optimization - Wix Studio

SKILLS
Customer Relationship, Sales Strategy, Technical Support, Product Knowledge, Team Collaboration, Process Optimization, Adaptive Problem Solving, Data Entry, Website Design, HTML5/CSS3, UX, Next.js
`;
    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mildronico-Modesto-Jr-Resume.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      data-safe-area-inset-root
      className="grain min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900"
      style={{
        boxSizing: "border-box",
        paddingTop: "var(--safe-area-inset-top)",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <header
        data-safe-area-sticky-top
        className="sticky z-40 border-b border-slate-100 bg-white/80 backdrop-blur-xl"
        style={{ top: "var(--safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-6 lg:px-0">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-slate-900 text-[11px] font-bold tracking-widest text-white">
              M
            </div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-slate-900">
              M. MODESTO JR.
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              { id: "work", label: "Work" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 text-[13.5px] font-medium tracking-[-0.01em] transition-colors ${
                  activeNav === item.id ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-slate-900 transition-transform duration-300 ${
                    activeNav === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:mildronico@gmail.com"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-[13px] font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 md:inline-flex"
            >
              mildronico@gmail.com
            </a>
            <a
              href="#contact"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white md:hidden"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 lg:px-0">
        {/* Hero */}
        <section ref={heroRef as any} className="relative grid gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-[88px]">
          <div className="order-2 lg:order-1">
            <div data-fade className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[11px] font-medium tracking-wide text-slate-600">
                AVAILABLE FOR NEW OPPORTUNITIES • Tacloban City, PH • Remote OK
              </span>
            </div>

            <h1
              data-fade
              className="display max-w-[560px] text-[42px] font-[800] leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-[56px] lg:text-[64px]"
            >
              IT Site Support
              <br />
              <span className="text-slate-400">&amp; Web Developer</span>
            </h1>

            <p data-fade className="mt-6 max-w-[520px] text-[17px] leading-[1.6] tracking-[-0.01em] text-slate-600">
              I build reliable systems and modern web products — from government IT support to SaaS platforms. Focused on
              uptime, clarity, and products that ship.
            </p>

            <div data-fade className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                Tacloban City, Philippines
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                mildronico@gmail.com
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                0966 251 9712
              </div>
            </div>

            <div data-fade className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(15,23,42,0.12)] transition hover:bg-black"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                onClick={handleDownloadResume}
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-[14px] font-semibold tracking-[-0.01em] text-slate-900 transition hover:border-slate-900"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            </div>

            <div data-fade className="mt-10 grid max-w-[520px] grid-cols-3 gap-6 border-t border-slate-100 pt-8">
              <div>
                <div className="text-[24px] font-bold tracking-[-0.03em] text-slate-900">5+</div>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-wide text-slate-500">Years Experience</div>
              </div>
              <div>
                <div className="text-[24px] font-bold tracking-[-0.03em] text-slate-900">100%</div>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-wide text-slate-500">Uptime Focus</div>
              </div>
              <div>
                <div className="text-[24px] font-bold tracking-[-0.03em] text-slate-900">SaaS</div>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-wide text-slate-500">Founder & Dev</div>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 flex justify-start lg:order-2 lg:justify-end">
            <div data-fade className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-b from-slate-50 to-white" />
              <div className="group/profile relative h-[220px] w-[220px] rounded-full border border-slate-200 bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={profilePhotoUrl}
                  alt="Mildronico Modesto Jr. - IT Professional"
                  className="h-full w-full rounded-full border-[4px] border-white object-cover object-center"
                  style={{ objectPosition: "50% 18%" }}
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* floating card */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] lg:flex">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">System operational</div>
                    <div className="text-[12px] text-slate-500">TindaCloud • Live SaaS</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 top-8 hidden rounded-full border border-slate-100 bg-white px-3 py-1.5 shadow-sm lg:flex">
                <span className="text-[11px] font-medium text-slate-700">Next.js 14 • Vercel</span>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" ref={workRef as any} className="border-t border-slate-100 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-fade>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Selected Work • 2024 — 2025</div>
              <h2 className="max-w-[520px] text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-slate-900 sm:text-[40px]">
                Products built for
                <br />
                real users & revenue.
              </h2>
            </div>
            <p data-fade className="max-w-[340px] text-[14px] leading-[1.6] text-slate-500">
              Two focused case studies — a founder-led SaaS and a client booking rescue. Both emphasize reliability, clarity,
              and measured business impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* TindaCloud */}
            <div
              data-fade
              className="group relative overflow-hidden rounded-[20px] border border-slate-100 bg-white p-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(15,23,42,0.04)] transition hover:shadow-[0_4px_16px_rgba(15,23,42,0.06),0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="rounded-[19px] bg-white p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 ring-1 ring-inset ring-indigo-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <span className="text-[11px] font-semibold tracking-wide text-indigo-700">LIVE SAAS • 2024—2025</span>
                  </div>
                  <div className="rounded-full bg-slate-50 p-2">
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <h3 className="mt-6 text-[24px] font-bold tracking-[-0.03em] text-slate-900">TindaCloud</h3>
                <div className="mt-2 text-[13px] font-medium uppercase tracking-wide text-slate-500">
                  E-commerce & POS SaaS Platform • Founder & Developer
                </div>

                <p className="mt-4 text-[14px] leading-[1.6] text-slate-600">
                  Full-stack retail operating system. Inventory, POS, sales analytics, and AI insights — built to replace
                  spreadsheets for small merchants in PH. Deployed on Vercel with edge caching and real-time stock sync.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js 14", "Vercel", "Inventory", "POS", "Analytics", "AI Insights"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <a
                    href="https://tindacloud.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 text-[13px] font-semibold text-white transition hover:bg-black"
                  >
                    View Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://tindacloud.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-900 transition hover:border-slate-900"
                  >
                    View Details
                  </a>
                </div>

                <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[13px] font-bold text-slate-900">Realtime</div>
                      <div className="mt-1 text-[11px] text-slate-500">Stock sync</div>
                    </div>
                    <div className="border-x border-slate-100">
                      <div className="text-[13px] font-bold text-slate-900">Edge</div>
                      <div className="mt-1 text-[11px] text-slate-500">Deployed</div>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-900">AI</div>
                      <div className="mt-1 text-[11px] text-slate-500">Sales insights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Human Frequency */}
            <div
              data-fade
              className="group relative overflow-hidden rounded-[20px] border border-slate-100 bg-white p-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(15,23,42,0.04)] transition hover:shadow-[0_4px_16px_rgba(15,23,42,0.06),0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="rounded-[19px] bg-white p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 ring-1 ring-inset ring-amber-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                    <span className="text-[11px] font-semibold tracking-wide text-amber-800">AUSTRALIA CLIENT • 2024</span>
                  </div>
                  <div className="rounded-full bg-slate-50 p-2">
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <h3 className="mt-6 text-[24px] font-bold tracking-[-0.03em] text-slate-900">Human Frequency</h3>
                <div className="mt-2 text-[13px] font-medium uppercase tracking-wide text-slate-500">
                  Booking System Optimization • Wix Studio
                </div>

                <p className="mt-4 text-[14px] leading-[1.6] text-slate-600">
                  Rescued a broken wellness booking flow for an Australian client. Fixed “No availability” bug that limited
                  bookings to 4 slots. Rebuilt schedule to full Mon–Sat 9AM–6PM AEDT, restoring client revenue and trust.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Wix Studio", "Booking API", "AEDT Timezone", "Bug Fix", "UX Repair"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-emerald-900">Before → After</div>
                      <div className="mt-1 text-[13px] leading-[1.5] text-emerald-800">
                        <span className="line-through decoration-emerald-300">4 slots only, “No availability” error</span>
                        <span className="mx-2 text-emerald-400">→</span>
                        <span className="font-semibold">Mon–Sat 9AM–6PM AEDT, fully bookable</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <a
                    href="https://humanfrequency.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 text-[13px] font-semibold text-white transition hover:bg-black"
                  >
                    View Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="inline-flex h-9 items-center justify-center rounded-full border border-slate-100 bg-slate-50 px-4 text-[12px] font-medium text-slate-500">
                    Client: humanfrequency.com.au
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" ref={expRef as any} className="border-t border-slate-100 py-20">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
            <div data-fade className="lg:sticky lg:top-[104px] lg:self-start">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Experience • 2018 — 2026</div>
              <h2 className="mt-3 text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-slate-900">Reliable under pressure. Clear in support.</h2>
              <p className="mt-4 max-w-[300px] text-[14px] leading-[1.6] text-slate-500">
                Government IT and data systems. Trained to resolve with empathy, escalate cleanly, and keep operations moving.
              </p>
              <div className="mt-8 hidden lg:block">
                <div className="h-px w-full bg-slate-100" />
                <div className="mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-500">
                  <Calendar className="h-4 w-4" />
                  Tacloban City • On-site & Remote
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[15px] top-2 hidden h-full w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent lg:block" />

              <div className="space-y-10">
                {[
                  {
                    role: "IT Site Support",
                    company: "STRADCOM",
                    period: "Jan 2021 to Oct 2026",
                    bullets: [
                      "Coordinated day-to-day technical support for government site operations",
                      "Resolved end-user queries with empathetic, clear communication",
                      "Managed escalation paths and ensured SLA compliance",
                      "Initiated team-building practices that improved response time",
                    ],
                  },
                  {
                    role: "National Household Targeting System Encoder",
                    company: "DSWD Tacloban",
                    period: "Jan 2020 to Aug 2020",
                    bullets: [
                      "Encoded household data with high accuracy under deadline pressure",
                      "Segregated batches by region and validation status",
                      "Prepared data packs for field verification",
                    ],
                  },
                  {
                    role: "Administrative Aid I",
                    company: "City Hall Tacloban",
                    period: "Jan 2018 to Dec 2018",
                    bullets: [
                      "Troubleshot hardware/software issues across administrative offices",
                      "Tracked IT inventory and maintenance schedules",
                      "Supported procurement and documentation workflows",
                    ],
                  },
                ].map((job, i) => (
                  <div key={job.role} data-fade className="relative pl-0 lg:pl-12">
                    <div className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm lg:flex">
                      <div className="h-2 w-2 rounded-full bg-slate-900" />
                    </div>
                    <div className="rounded-[16px] border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(15,23,42,0.04)] sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900">{job.role}</h3>
                          <div className="mt-1 text-[13px] font-medium text-slate-500">{job.company}</div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600 ring-1 ring-inset ring-slate-200">
                          <Clock3 className="h-3 w-3" />
                          {job.period}
                        </span>
                      </div>
                      <ul className="mt-5 space-y-2.5">
                        {job.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-[13.5px] leading-[1.5] text-slate-600">
                            <span className="mt-[8px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-300" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {i === 0 && (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
                          Current • 5+ years in support ops
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education + Trainings */}
        <section id="education" ref={eduRef as any} className="border-t border-slate-100 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div data-fade className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Education • Academic Background
              </div>
              <h2 data-fade className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-slate-900">
                Foundation in IT & systems.
              </h2>

              <div className="mt-8 space-y-4">
                {[
                  {
                    degree: "Bachelor of Science in Information Technology",
                    school: "Leyte Normal University",
                    date: "March 15, 2018",
                    detail: "Tacloban City • BSIT Graduate",
                  },
                  {
                    degree: "High School — With Honor",
                    school: "Sagkahan National High School",
                    date: "2014",
                    detail: "Consistent academic recognition",
                  },
                  {
                    degree: "Elementary Education",
                    school: "San Fernando Central School",
                    date: "2010",
                    detail: "Tacloban City",
                  },
                ].map((edu) => (
                  <div
                    key={edu.school}
                    data-fade
                    className="rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="max-w-[260px] text-[14px] font-semibold leading-[1.3] tracking-[-0.01em] text-slate-900">
                        {edu.degree}
                      </h3>
                      <span className="whitespace-nowrap rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                        {edu.date}
                      </span>
                    </div>
                    <div className="mt-2 text-[13px] font-medium text-slate-700">{edu.school}</div>
                    <div className="mt-1 text-[12px] text-slate-500">{edu.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div data-fade className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Trainings & Seminars • Professional Development
              </div>
              <h2 data-fade className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-slate-900">
                Continuous learning, certified.
              </h2>

              <div className="mt-8 space-y-3">
                {[
                  {
                    title: "Introduction to Python Programming",
                    org: "DICT • 8 hours",
                    date: "Nov 2023",
                  },
                  {
                    title: "Cybersecurity Awareness & Data Privacy",
                    org: "DICT • 16 hours",
                    date: "Sep 2023",
                  },
                  {
                    title: "Web Development Fundamentals",
                    org: "DICT • 24 hours",
                    date: "Aug 2023",
                  },
                  {
                    title: "Household Assessment & Data Validation",
                    org: "DSWD NHTS • 40 hours",
                    date: "Jan 2020",
                  },
                  {
                    title: "Government Office Productivity & Systems",
                    org: "City Hall Tacloban • 16 hours",
                    date: "Mar 2018",
                  },
                ].map((t) => (
                  <div
                    key={t.title}
                    data-fade
                    className="group flex items-start justify-between gap-4 rounded-[14px] border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                  >
                    <div>
                      <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900">{t.title}</div>
                      <div className="mt-1 text-[12px] text-slate-500">{t.org}</div>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                      {t.date}
                    </span>
                  </div>
                ))}
              </div>

              <div data-fade className="mt-6 rounded-[14px] border border-dashed border-slate-200 bg-white p-4">
                <div className="text-[12px] font-medium text-slate-600">
                  <span className="font-semibold text-slate-900">104 total training hours</span> • Certificates available upon
                  request. Focus on practical, job-ready skills for government and private sector.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section ref={skillsRef as any} className="border-t border-slate-100 py-20">
          <div data-fade className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-slate-900">Stack & capabilities</h2>
            <span className="text-[13px] text-slate-500">Built for support-heavy, product-minded teams</span>
          </div>

          <div data-fade className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Customer Relationship",
              "Sales Strategy",
              "Technical Support",
              "Product Knowledge",
              "Team Collaboration",
              "Process Optimization",
              "Adaptive Problem Solving",
              "Data Entry",
              "Website Design",
              "HTML5 / CSS3",
              "UX Principles",
              "Next.js 14",
            ].map((skill) => (
              <div
                key={skill}
                className="group flex h-[56px] items-center gap-3 rounded-[14px] border border-slate-100 bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:border-slate-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 ring-1 ring-inset ring-slate-100 transition group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contact" ref={contactRef as any} className="border-t border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-[1100px] px-6 py-16 lg:px-0 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div data-fade>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-inset ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium tracking-wide text-slate-600">OPEN TO US / AU REMOTE ROLES</span>
              </div>
              <h2 className="mt-6 max-w-[520px] text-[32px] font-bold leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-[40px]">
                Let’s build something reliable.
              </h2>
              <p className="mt-4 max-w-[460px] text-[15px] leading-[1.6] text-slate-600">
                Based in Tacloban City, working with teams across APAC & US. Fast response, clear communication, and
                systems that stay up.
              </p>

              <div className="mt-8 grid max-w-[520px] gap-3 sm:grid-cols-2">
                <a
                  href="mailto:mildronico@gmail.com"
                  className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-white p-4 transition hover:border-slate-900"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Email</div>
                    <div className="text-[13px] font-semibold text-slate-900">mildronico@gmail.com</div>
                  </div>
                </a>
                <a
                  href="tel:09662519712"
                  className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-white p-4 transition hover:border-slate-900"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 ring-1 ring-inset ring-slate-200">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Phone</div>
                    <div className="text-[13px] font-semibold text-slate-900">0966 251 9712</div>
                  </div>
                </a>
              </div>
            </div>

            <div data-fade className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(15,23,42,0.04)] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900">Contact details</div>
                <div className="h-px w-12 bg-slate-200" />
              </div>

              <div className="mt-6 space-y-4 text-[13.5px]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                  <span className="leading-[1.5] text-slate-700">
                    Tacloban City, Leyte
                    <br />
                    <span className="text-slate-500">Eastern Visayas, Philippines • GMT+8</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <a href="mailto:mildronico@gmail.com" className="font-medium text-slate-700 hover:text-slate-900">
                    mildronico@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <a href="tel:09662519712" className="font-medium text-slate-700 hover:text-slate-900">
                    0966 251 9712
                  </a>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://tindacloud.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 text-[12px] font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  tindacloud.vercel.app <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-8 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Availability</div>
                <div className="mt-2 text-[13px] leading-[1.5] text-slate-700">
                  Full-time remote, contract or employed. Can overlap US EST mornings & AU business hours.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-slate-900 text-[10px] font-bold text-white">M</div>
              <span className="text-[12px] font-medium tracking-wide text-slate-600">
                © {new Date().getFullYear()} Mildronico A. Modesto Jr. • Tacloban City • Built with Next.js mindset
              </span>
            </div>
            <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              <span>White • Slate-900 • Indigo-600</span>
              <span className="hidden sm:inline">•</span>
              <span>Linear / Stripe grade</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 390px) {
          .display { letter-spacing: -0.02em !important; }
        }
      `}</style>
    </div>
  );
}
