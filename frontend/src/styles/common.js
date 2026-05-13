// src/styles/common.js
// Theme: Premium Light Glassmorphism

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "min-h-screen text-slate-900"
export const pageWrapper    = "max-w-5xl mx-auto px-6 py-16 text-slate-900"
export const section        = "mb-14"

// Compatibility aliases
export const containerClass = pageWrapper

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-7 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 cursor-pointer"


// ─── Typography ───────────────────────────────────────
export const pageTitleClass =
  "text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-loose mb-4 pb-2"

export const headingClass =
  "text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"

export const subHeadingClass =
  "text-lg font-semibold text-slate-800 tracking-tight"

export const bodyText =
  "text-slate-600 leading-relaxed"

export const mutedText =
  "text-sm text-slate-500"

export const linkClass =
  "text-violet-600 hover:text-violet-700 hover:underline underline-offset-4 transition-colors p-1"


// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-full hover:from-violet-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-300 cursor-pointer text-sm tracking-wide"

export const secondaryBtn =
  "inline-flex items-center justify-center border border-slate-300 bg-white/50 text-slate-700 font-medium px-6 py-2.5 rounded-full hover:bg-white hover:border-violet-300 hover:text-violet-700 transition-all duration-300 cursor-pointer text-sm"

export const ghostBtn =
  "inline-flex items-center justify-center text-violet-600 font-medium hover:text-violet-700 hover:bg-violet-100/50 px-4 py-2 rounded-full transition-colors cursor-pointer text-sm"

// Compatibility aliases
export const buttonPrimaryClass = primaryBtn
export const buttonSecondaryClass = secondaryBtn


// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-8 md:p-10 max-w-md mx-auto shadow-xl shadow-slate-200/50 relative overflow-hidden"

export const formTitle =
  "text-3xl font-bold text-slate-900 tracking-tight text-center mb-8"

export const labelClass =
  "text-sm font-medium text-slate-700 mb-2 block"

export const inputClass =
  "w-full bg-white/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"

export const formGroup = "mb-5"

export const submitBtn =
  "w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:from-violet-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-300 cursor-pointer mt-4 text-sm tracking-wide"


// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 px-8 h-16 flex items-center sticky top-0 z-50 transition-all shadow-sm"

export const navContainerClass =
  "max-w-5xl mx-auto w-full flex items-center justify-between"

export const navBrandClass =
  "text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight"

export const navLinksClass =
  "flex items-center gap-8"

export const navLinkClass =
  "text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-violet-600 hover:after:w-full after:transition-all after:duration-300"

export const navLinkActiveClass =
  "text-sm font-bold text-violet-700 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-violet-600"


// ─── Article / Blog ───────────────────────────────────
export const articleGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

export const articleCardClass =
  "group bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 hover:-translate-y-2 hover:bg-white hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 flex flex-col gap-3 cursor-pointer relative overflow-hidden"

export const articleTitle =
  "text-xl font-bold text-slate-900 leading-snug tracking-tight group-hover:text-violet-700 transition-colors"

export const articleExcerpt =
  "text-sm text-slate-600 leading-relaxed line-clamp-3"

export const articleMeta =
  "text-xs text-slate-500 font-medium"

export const articleBody =
  "text-slate-800 leading-[1.85] text-[1.05rem] max-w-3xl font-light"

export const timestampClass =
  "text-xs text-slate-500 flex items-center gap-1.5"

export const tagClass =
  "text-xs font-semibold text-violet-700 bg-violet-100/50 border border-violet-200 rounded-md px-2 py-1 uppercase tracking-wider w-fit"


// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm flex items-center gap-2"

export const successClass =
  "bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl px-4 py-3 text-sm flex items-center gap-2"

export const loadingClass =
  "text-violet-600 text-sm animate-pulse text-center py-12 flex justify-center items-center gap-2 font-medium"

export const emptyStateClass =
  "text-center text-slate-500 py-16 text-sm bg-slate-50/50 rounded-2xl border border-slate-200 border-dashed"


// ─── Divider ──────────────────────────────────────────
export const divider =
  "h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-10"

// ─── Footer ───────────────────────────────────────────
export const footerClass =
  "border-t border-slate-200/50 mt-16 relative overflow-hidden";

export const footerContainerClass =
  "max-w-5xl mx-auto px-6 py-12 flex flex-col items-center gap-6 text-center relative z-10";

export const footerTextClass =
  "text-sm text-slate-500";

export const footerLinkClass =
  "text-sm font-medium text-slate-600 hover:text-violet-700 transition-colors";