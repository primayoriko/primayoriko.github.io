/**
 * Best-effort LinkedIn profile fetcher with multiple fallback strategies.
 * Writes parsed data to public/linkedin-data.json.
 *
 * Automated strategies (tried in order):
 *   1. Direct LinkedIn fetch with rotating user-agents + retries
 *   2. Google Cache (text-only stripped version, requires server-rendered content)
 *   3. Wayback Machine (request archive, then fetch it)
 *   4. Keep existing linkedin-data.json unchanged (data is never lost)
 *
 * Usage:
 *   bun scripts/fetch-linkedin.ts                  # Automated multi-strategy
 *   bun scripts/fetch-linkedin.ts --from-file X    # Parse HTML from a local file
 *   bun scripts/fetch-linkedin.ts --from-stdin     # Parse HTML piped via stdin
 *
 * Manual update (if automated fetch keeps failing):
 *   1. Open https://www.linkedin.com/in/naufal-prima-yoriko/ in a browser
 *   2. Save the page as HTML (Ctrl+S / Cmd+S, "Webpage, HTML Only")
 *   3. Run: bun scripts/fetch-linkedin.ts --from-file ~/Downloads/page.html
 */

const LINKEDIN_URL = 'https://www.linkedin.com/in/naufal-prima-yoriko/'
const OUTPUT_PATH = 'public/linkedin-data.json'

const USER_AGENTS = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
]

// --- Types ---

interface LinkedInExperience {
  title: string; company: string; period: string
  location?: string; description?: string; duration?: string
}

interface LinkedInData {
  fetchedAt: string
  name?: string; title?: string; location?: string; about?: string
  experiences?: LinkedInExperience[]
  education?: { degree: string; institution: string; period: string; location?: string }[]
  skills?: string[]
  certifications?: { name: string; issuer: string; issued: string; expires?: string; url?: string }[]
  publications?: { title: string; date: string; description: string; url?: string }[]
  courses?: { name: string; code: string }[]
  awards?: { title: string; issuer: string; year: string; description: string }[]
  projects?: { name: string; period: string; description: string; url?: string }[]
  languages?: { language: string; proficiency: string }[]
}

// --- Fetch strategies ---

async function fetchWithRetry(url: string, userAgents: string[], maxRetries = 3): Promise<string | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const ua = userAgents[attempt % userAgents.length]
    const delay = attempt * 3000 + Math.random() * 2000
    if (attempt > 0) {
      console.log(`  Retry ${attempt}/${maxRetries - 1} after ${Math.round(delay)}ms...`)
      await new Promise(r => setTimeout(r, delay))
    }

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache',
        },
        redirect: 'follow',
      })
      clearTimeout(timeout)

      if (res.ok) {
        const text = await res.text()
        if (text.length > 1000) return text
        console.log(`  Got HTTP ${res.status} but response too small (${text.length} bytes)`)
      } else {
        console.log(`  HTTP ${res.status} with UA: ${ua.slice(0, 40)}...`)
      }
    } catch (err: any) {
      console.log(`  Error: ${err.message}`)
    }
  }
  return null
}

async function strategy1_directFetch(): Promise<string | null> {
  console.log('\n[Strategy 1] Direct LinkedIn fetch with user-agent rotation...')
  return fetchWithRetry(LINKEDIN_URL, USER_AGENTS, 4)
}

async function strategy2_googleCache(): Promise<string | null> {
  console.log('\n[Strategy 2] Google Cache...')
  const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(LINKEDIN_URL)}&strip=1`
  const html = await fetchWithRetry(cacheUrl, [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  ], 2)
  if (!html) return null

  // Google Cache requires JS rendering — verify we got actual profile content,
  // not just the Google Search shell page
  const hasProfileContent =
    (html.includes('Naufal') || html.includes('naufal')) &&
    (html.includes('Experience') || html.includes('experience')) &&
    !html.includes('Please click <a href="/httpservice/retry/enablejs')

  if (!hasProfileContent) {
    console.log('  Google Cache returned a JS-only shell (no server-rendered profile data).')
    return null
  }
  return html
}

async function strategy3_waybackMachine(): Promise<string | null> {
  console.log('\n[Strategy 3] Wayback Machine...')
  try {
    // Request Wayback to save/archive the page
    console.log('  Requesting Wayback Machine to save page...')
    const saveRes = await fetch(`https://web.archive.org/save/${LINKEDIN_URL}`, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; profile-web-bot)' },
    })
    console.log(`  Save request: HTTP ${saveRes.status}`)

    // Check for available snapshots
    await new Promise(r => setTimeout(r, 3000))
    const availRes = await fetch(
      `https://archive.org/wayback/available?url=${encodeURIComponent(LINKEDIN_URL)}`
    )
    if (!availRes.ok) { console.log('  Availability API failed.'); return null }

    const avail = await availRes.json() as any
    const snapshot = avail?.archived_snapshots?.closest
    if (!snapshot?.url) { console.log('  No snapshots available.'); return null }

    console.log(`  Found snapshot: ${snapshot.timestamp}`)
    const archiveUrl = snapshot.url.replace('http://', 'https://')
    return fetchWithRetry(archiveUrl, ['Mozilla/5.0 (compatible; profile-web-bot)'], 2)
  } catch (err: any) {
    console.log(`  Wayback error: ${err.message}`)
    return null
  }
}

// --- HTML to Markdown ---

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n').replace(/<\/div>/gi, '\n')
    .replace(/<\/h1>/gi, '\n').replace(/<\/h2>/gi, '\n').replace(/<\/h3>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<h1[^>]*>/gi, '# ').replace(/<h2[^>]*>/gi, '## ').replace(/<h3[^>]*>/gi, '### ')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>/gi, '[$1](').replace(/<\/a>/gi, ')')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
}

// --- Markdown parsers ---

function parseMarkdown(md: string): LinkedInData {
  const data: LinkedInData = { fetchedAt: new Date().toISOString() }
  const lines = md.split('\n')

  const h1Line = lines.find(l => l.startsWith('# ') && !l.startsWith('## ') && !l.includes('http'))
  if (h1Line) data.name = h1Line.replace('# ', '').trim()
  if (!data.name || data.name.includes('http')) {
    const idx = lines.findIndex(l => l.startsWith('# '))
    if (idx >= 0) {
      for (let i = idx + 1; i < Math.min(idx + 5, lines.length); i++) {
        const n = lines.slice(i).find(l => l.startsWith('# ') && !l.startsWith('## ') && !l.includes('http'))
        if (n) { data.name = n.replace('# ', '').trim(); break }
      }
    }
  }

  const titleIdx = lines.findIndex(l => l.startsWith('# ') && !l.startsWith('## ') && !l.includes('http'))
  if (titleIdx >= 0) {
    for (let i = titleIdx + 1; i < Math.min(titleIdx + 5, lines.length); i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('#') && !line.startsWith('[') && !line.includes('connections') && !line.includes('followers')) {
        if (line.includes('at ') && line.includes('[')) data.title = line.split(' at ')[0].trim()
        else if (line.length < 50 && !line.includes('•')) data.title = line
        break
      }
    }
  }

  for (const line of lines.slice(0, 15)) {
    const m = line.trim().match(/^[A-Za-z\s]+\([A-Z]{2}\)$/)
    if (m) { data.location = line.trim().replace(/\s*\([A-Z]{2}\)$/, '').trim(); break }
  }

  const sectionMap = new Map<string, string[]>()
  let cur = ''
  for (const line of lines) {
    if (line.startsWith('## ')) { cur = line.replace('## ', '').trim(); sectionMap.set(cur, []) }
    else if (cur) sectionMap.get(cur)!.push(line)
  }

  const aboutL = sectionMap.get('About')
  if (aboutL) { const t = aboutL.filter(l => l.trim() && !l.startsWith('Total Experience')).join(' ').trim(); if (t) data.about = t }

  if (sectionMap.has('Experience')) data.experiences = parseExperiences(sectionMap.get('Experience')!)
  if (sectionMap.has('Education')) data.education = parseEducation(sectionMap.get('Education')!)
  const sk = sectionMap.get('Skills'); if (sk) { const t = sk.join(' ').trim(); if (t) data.skills = t.split('•').map(s => s.trim()).filter(Boolean) }
  if (sectionMap.has('Licenses & Certifications')) data.certifications = parseCertifications(sectionMap.get('Licenses & Certifications')!)
  if (sectionMap.has('Publications')) data.publications = parsePublications(sectionMap.get('Publications')!)
  if (sectionMap.has('Courses')) data.courses = parseCourses(sectionMap.get('Courses')!)
  if (sectionMap.has('Honors & Awards')) data.awards = parseAwards(sectionMap.get('Honors & Awards')!)
  if (sectionMap.has('Projects')) data.projects = parseProjects(sectionMap.get('Projects')!)
  const ll = sectionMap.get('Languages')
  if (ll) { data.languages = []; for (const l of ll) { const m = l.match(/^([A-Za-z]+)\s+-\s+(.+)$/); if (m) data.languages.push({ language: m[1], proficiency: m[2].trim() }) }; if (!data.languages.length) delete data.languages }

  return data
}

function parseExperiences(lines: string[]): LinkedInExperience[] {
  const exps: LinkedInExperience[] = []; let c: Partial<LinkedInExperience> | null = null
  for (const line of lines) {
    const h3 = line.match(/^### (.+?) at \[?(.+?)\]?(?:\(.*?\))?\s*(?:\(Current\))?$/); if (h3) { if (c?.title && c?.company) exps.push(c as any); c = { title: h3[1].trim(), company: h3[2].replace(/\[|\]/g, '').trim() }; continue }
    const h3p = line.match(/^### (.+?) at ([A-Za-z0-9\s.\-&()]+)$/); if (h3p) { if (c?.title && c?.company) exps.push(c as any); c = { title: h3p[1].trim(), company: h3p[2].trim() }; continue }
    if (!c) continue
    const pm = line.match(/^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\s*-\s*(Present|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\s*(?:•\s*(.+))?$/); if (pm) { c.period = `${pm[1]} – ${pm[2]}`; if (pm[3]) c.duration = pm[3].trim(); continue }
    const lm = line.match(/^([A-Za-z\s,]+(?:Indonesia|Singapore|Malaysia|Thailand|Vietnam))\s*$/); if (lm && !line.includes('Company:') && !line.includes('Department:')) { c.location = lm[1].trim(); continue }
    if (line.startsWith('Company:') || line.startsWith('Department:') || !line.trim() || line.startsWith('[')) continue
    const t = line.trim(); if (t && t.length > 10 && !t.startsWith('Company:') && !t.startsWith('Department:')) c.description = c.description ? c.description + ' ' + t : t
  }
  if (c?.title && c?.company) exps.push(c as any); return exps
}

function parseEducation(lines: string[]): NonNullable<LinkedInData['education']> {
  const r: NonNullable<LinkedInData['education']> = []; let c: any = null
  for (const l of lines) {
    const m = l.match(/^### (.+?) at \[?(.+?)\]?(?:\(.*?\))?$/); if (m) { if (c?.degree && c?.institution) r.push(c); c = { degree: m[1].trim(), institution: m[2].replace(/\[|\]/g, '').trim() }; continue }
    const p = l.match(/^### (.+?) at (.+)$/); if (p) { if (c?.degree && c?.institution) r.push(c); c = { degree: p[1].trim(), institution: p[2].trim() }; continue }
    if (!c) continue; const pm = l.match(/^(\d{4})\s*-\s*(\d{4})/); if (pm) { c.period = `${pm[1]} – ${pm[2]}`; continue }
    const lm = l.match(/^([A-Za-z\s,]+)$/); if (lm && !l.includes('•') && l.trim().length > 3 && l.trim().length < 50) c.location = lm[1].trim()
  }
  if (c?.degree && c?.institution) r.push(c); return r
}

function parseCertifications(lines: string[]): NonNullable<LinkedInData['certifications']> {
  const r: any[] = []; let c: any = null
  for (const l of lines) {
    const m = l.match(/^### (.+?) by \[?(.+?)\]?(?:\(.*?\))?$/); if (m) { if (c?.name && c?.issuer) r.push(c); c = { name: m[1].trim(), issuer: m[2].replace(/\[|\]/g, '').trim() }; continue }
    if (!c) continue; const im = l.match(/^Issued:\s*(.+?)(?:\s*•\s*Expires:\s*(.+))?$/); if (im) { c.issued = im[1].trim(); if (im[2]) c.expires = im[2].trim(); continue }
    const um = l.match(/\[View Certificate\]\((.+?)\)/); if (um) c.url = um[1].replace(/\?trk=.*$/, '')
  }
  if (c?.name && c?.issuer) r.push(c); return r
}

function parsePublications(lines: string[]): NonNullable<LinkedInData['publications']> {
  const r: any[] = []; let c: any = null
  for (const l of lines) {
    if (l.startsWith('### ')) { if (c?.title) r.push(c); c = { title: l.replace('### ', '').trim(), date: '', description: '' }; continue }
    if (!c) continue; const dm = l.match(/^((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}|\d{4})$/); if (dm) { c.date = dm[1]; continue }
    const um = l.match(/\[View Publication\]\((.+?)\)/); if (um) { let u = um[1].replace(/\?trk=.*$/, ''); if (u.includes('redirect?url=')) { u = u.split('redirect?url=')[1].split('&')[0]; if (!u.startsWith('http')) u = 'https://' + u }; c.url = u; continue }
    if (l.trim() && !l.startsWith('[') && !l.startsWith('Company:')) c.description = c.description ? c.description + ' ' + l.trim() : l.trim()
  }
  if (c?.title) r.push(c); return r
}

function parseCourses(lines: string[]): NonNullable<LinkedInData['courses']> {
  const r: any[] = []; for (const l of lines) { const m = l.match(/^(.+?) by ([A-Z]{2}\d{4})$/); if (m) r.push({ name: m[1].trim(), code: m[2].trim() }) }; return r
}

function parseAwards(lines: string[]): NonNullable<LinkedInData['awards']> {
  const r: any[] = []; let c: any = null
  for (const l of lines) {
    if (l.startsWith('### ')) { if (c?.title) r.push(c); c = { title: l.replace('### ', '').trim(), issuer: '', year: '', description: '' }; continue }
    if (!c) continue; const im = l.match(/^Issued by:\s*(.+)$/); if (im) { c.issuer = im[1].trim(); continue }
    const dm = l.match(/^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4})$/); if (dm) { c.year = dm[1].match(/\d{4}/)![0]; continue }
    if (l.trim() && !l.startsWith('[') && l.trim() !== 'Show less') c.description = c.description ? c.description + ' ' + l.trim() : l.trim()
  }
  if (c?.title) r.push(c); return r
}

function parseProjects(lines: string[]): NonNullable<LinkedInData['projects']> {
  const r: any[] = []; let c: any = null
  for (const l of lines) {
    if (l.startsWith('### ')) { if (c?.name) r.push(c); c = { name: l.replace('### ', '').trim(), period: '', description: '' }; continue }
    if (!c) continue; const pm = l.match(/^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\s*-\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})$/); if (pm) { c.period = `${pm[1]} – ${pm[2]}`; continue }
    const um = l.match(/\[Project Link\]\((.+?)\)/); if (um) { c.url = um[1].replace(/\?trk=.*$/, ''); continue }
    if (l.trim() && !l.startsWith('[')) c.description = c.description ? c.description + ' ' + l.trim() : l.trim()
  }
  if (c?.name) r.push(c); return r
}

// --- Quality check ---

function countSections(data: LinkedInData): number {
  return Object.keys(data).filter(k => k !== 'fetchedAt' && (data as any)[k] !== undefined).length
}

// --- Manual input helpers ---

async function readFromFile(path: string): Promise<string | null> {
  try {
    const file = Bun.file(path)
    if (!(await file.exists())) { console.error(`File not found: ${path}`); return null }
    return await file.text()
  } catch (err: any) {
    console.error(`Failed to read file: ${err.message}`); return null
  }
}

async function readFromStdin(): Promise<string | null> {
  try {
    const chunks: string[] = []
    const reader = Bun.stdin.stream().getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(decoder.decode(value, { stream: true }))
    }
    const result = chunks.join('')
    if (result.length < 100) { console.error('stdin too short — expected HTML content'); return null }
    return result
  } catch (err: any) {
    console.error(`Failed to read stdin: ${err.message}`); return null
  }
}

// --- Main ---

async function main() {
  const existingFile = Bun.file(OUTPUT_PATH)
  let existingData: LinkedInData | null = null
  if (await existingFile.exists()) {
    try { existingData = await existingFile.json() } catch { /* corrupted */ }
  }
  const existingSections = existingData ? countSections(existingData) : 0

  console.log(`Existing linkedin-data.json: ${existingSections} sections`)

  let html: string | null = null
  let source = ''

  // Manual input modes
  const fromFileIdx = process.argv.indexOf('--from-file')
  if (fromFileIdx !== -1 && process.argv[fromFileIdx + 1]) {
    console.log(`\n[Manual] Reading from file: ${process.argv[fromFileIdx + 1]}`)
    html = await readFromFile(process.argv[fromFileIdx + 1])
    source = 'file'
  } else if (process.argv.includes('--from-stdin')) {
    console.log('\n[Manual] Reading from stdin...')
    html = await readFromStdin()
    source = 'stdin'
  }

  // Automated multi-strategy
  if (!html && !source) {
    const strategies = [strategy1_directFetch, strategy2_googleCache, strategy3_waybackMachine]
    for (const strategy of strategies) {
      html = await strategy()
      if (html) { source = strategy.name; break }
    }
  }

  if (!html) {
    console.log('\n[Result] All strategies failed.')
    if (existingSections > 0) {
      console.log(`Keeping existing linkedin-data.json (${existingSections} sections).`)
    } else {
      console.log('No existing data. Fallback profile.ts will be used at runtime.')
      await Bun.write(OUTPUT_PATH, JSON.stringify({ fetchedAt: new Date().toISOString() }, null, 2))
    }
    console.log('\nTip: You can manually update by saving the LinkedIn page as HTML and running:')
    console.log('  bun scripts/fetch-linkedin.ts --from-file ~/Downloads/page.html')
    return
  }

  console.log(`\n[Parsing] Received ${html.length} bytes from ${source}...`)
  const md = htmlToMarkdown(html)
  const data = parseMarkdown(md)
  const newSections = countSections(data)

  console.log(`Parsed ${newSections} sections.`)

  // Only write if the new data is at least as good as the existing data
  if (newSections >= Math.min(existingSections, 3)) {
    await Bun.write(OUTPUT_PATH, JSON.stringify(data, null, 2))
    console.log(`[Result] Written to ${OUTPUT_PATH} (${newSections} sections via ${source}).`)
  } else {
    console.log(`[Result] New data (${newSections} sections) worse than existing (${existingSections}). Keeping existing.`)
  }
}

main()
