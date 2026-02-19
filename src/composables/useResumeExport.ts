import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  type IParagraphOptions,
} from 'docx'
import { saveAs } from 'file-saver'
import { profile } from '@/data/profile'

function descToStrings(desc: string | string[] | undefined): string[] {
  if (!desc) return []
  return Array.isArray(desc) ? desc : [desc]
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 24, font: 'Calibri' }),
    ],
  })
}

function bulletPoint(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 20, font: 'Calibri' })],
  })
}

function plainParagraph(text: string, opts?: Partial<IParagraphOptions>): Paragraph {
  return new Paragraph({
    spacing: { after: 60 },
    ...opts,
    children: [new TextRun({ text, size: 20, font: 'Calibri' })],
  })
}

export function useResumeExport() {
  async function exportDocx() {
    const children: Paragraph[] = []

    // Header - Name
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({ text: profile.name, bold: true, size: 32, font: 'Calibri' }),
        ],
      }),
    )

    // Header - Contact line
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: `${profile.title} | ${profile.location}`,
            size: 22,
            font: 'Calibri',
          }),
        ],
      }),
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `${profile.linkedinUrl} | ${profile.githubUrl}`,
            size: 20,
            font: 'Calibri',
          }),
        ],
      }),
    )

    // Summary
    children.push(sectionHeading('Professional Summary'))
    children.push(plainParagraph(profile.about))

    // Experience
    children.push(sectionHeading('Experience'))
    const workExperiences = profile.experiences.filter(
      (e) => e.type === 'full-time' || e.type === 'internship' || e.type === 'part-time',
    )
    for (const exp of workExperiences) {
      const typeLabel = exp.type === 'full-time' ? '' : ` (${exp.type})`
      children.push(
        new Paragraph({
          spacing: { before: 160, after: 40 },
          children: [
            new TextRun({ text: `${exp.title}${typeLabel}`, bold: true, size: 22, font: 'Calibri' }),
            new TextRun({ text: ` | ${exp.company}`, size: 22, font: 'Calibri' }),
          ],
        }),
      )
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${exp.period}${exp.location ? ' | ' + exp.location : ''}`,
              italics: true,
              size: 20,
              font: 'Calibri',
            }),
          ],
        }),
      )
      for (const line of descToStrings(exp.description)) {
        children.push(bulletPoint(line))
      }
    }

    // Education
    children.push(sectionHeading('Education'))
    for (const edu of profile.education) {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 22, font: 'Calibri' }),
            new TextRun({ text: ` | ${edu.institution}`, size: 22, font: 'Calibri' }),
          ],
        }),
      )
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${edu.period}${edu.location ? ' | ' + edu.location : ''}`,
              italics: true,
              size: 20,
              font: 'Calibri',
            }),
          ],
        }),
      )
    }

    // Skills
    children.push(sectionHeading('Skills'))
    children.push(plainParagraph(profile.skills.join(', ')))

    // Awards
    children.push(sectionHeading('Awards & Honors'))
    for (const award of profile.awards) {
      children.push(bulletPoint(`${award.title} - ${award.issuer} (${award.year})`))
    }

    // Publications
    if (profile.publications.length > 0) {
      children.push(sectionHeading('Publications'))
      for (const pub of profile.publications) {
        children.push(bulletPoint(`${pub.title} (${pub.date})`))
      }
    }

    // Certifications
    if (profile.certifications.length > 0) {
      children.push(sectionHeading('Licenses & Certifications'))
      for (const cert of profile.certifications) {
        children.push(bulletPoint(`${cert.name} - ${cert.issuer} (${cert.issued})`))
      }
    }

    // Languages
    children.push(sectionHeading('Languages'))
    children.push(
      plainParagraph(
        profile.languages.map((l) => `${l.language} (${l.proficiency})`).join(', '),
      ),
    )

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, bottom: 720, left: 720, right: 720 },
            },
          },
          children,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'Naufal_Prima_Yoriko_Resume.docx')
  }

  function exportPdf() {
    const w = window.open('', '_blank')
    if (!w) return

    const workExperiences = profile.experiences.filter(
      (e) => e.type === 'full-time' || e.type === 'internship' || e.type === 'part-time',
    )

    const expHtml = workExperiences
      .map((exp) => {
        const typeLabel = exp.type === 'full-time' ? '' : ` (${exp.type})`
        const descLines = descToStrings(exp.description)
        const descHtml =
          descLines.length > 0
            ? `<ul>${descLines.map((l) => `<li>${l}</li>`).join('')}</ul>`
            : ''
        return `
          <div class="entry">
            <div class="entry-header">
              <strong>${exp.title}${typeLabel}</strong> | ${exp.company}
            </div>
            <div class="entry-meta">${exp.period}${exp.location ? ' | ' + exp.location : ''}</div>
            ${descHtml}
          </div>`
      })
      .join('')

    const eduHtml = profile.education
      .map(
        (edu) => `
        <div class="entry">
          <div class="entry-header"><strong>${edu.degree}</strong> | ${edu.institution}</div>
          <div class="entry-meta">${edu.period}${edu.location ? ' | ' + edu.location : ''}</div>
        </div>`,
      )
      .join('')

    const awardsHtml = profile.awards
      .map((a) => `<li>${a.title} - ${a.issuer} (${a.year})</li>`)
      .join('')

    const pubsHtml = profile.publications
      .map((p) => `<li>${p.title} (${p.date})</li>`)
      .join('')

    const certsHtml = profile.certifications
      .map((c) => `<li>${c.name} - ${c.issuer} (${c.issued})</li>`)
      .join('')

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Resume - ${profile.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #000; padding: 0.5in; max-width: 8.5in; }
  h1 { font-size: 16pt; text-align: center; margin-bottom: 4px; }
  .contact { text-align: center; font-size: 10pt; margin-bottom: 4px; }
  h2 { font-size: 12pt; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 14px; margin-bottom: 6px; padding-bottom: 2px; }
  .entry { margin-bottom: 8px; }
  .entry-header { font-size: 11pt; }
  .entry-meta { font-style: italic; font-size: 10pt; color: #333; margin-bottom: 2px; }
  ul { margin-left: 18px; margin-top: 2px; }
  li { margin-bottom: 2px; font-size: 10.5pt; }
  p { margin-bottom: 6px; font-size: 10.5pt; }
  @media print { body { padding: 0; } @page { margin: 0.5in; } }
</style></head><body>
  <h1>${profile.name}</h1>
  <div class="contact">${profile.title} | ${profile.location}</div>
  <div class="contact">${profile.linkedinUrl} | ${profile.githubUrl}</div>

  <h2>Professional Summary</h2>
  <p>${profile.about}</p>

  <h2>Experience</h2>
  ${expHtml}

  <h2>Education</h2>
  ${eduHtml}

  <h2>Skills</h2>
  <p>${profile.skills.join(', ')}</p>

  <h2>Awards & Honors</h2>
  <ul>${awardsHtml}</ul>

  <h2>Publications</h2>
  <ul>${pubsHtml}</ul>

  <h2>Licenses & Certifications</h2>
  <ul>${certsHtml}</ul>

  <h2>Languages</h2>
  <p>${profile.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}</p>
</body></html>`

    w.document.write(html)
    w.document.close()
    setTimeout(() => w.print(), 500)
  }

  return { exportDocx, exportPdf }
}
