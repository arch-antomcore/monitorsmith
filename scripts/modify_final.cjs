const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xgm', 'Desktop', 'APPWBP', 'scripts', 'blog-articles-productivity.mjs');
let content = fs.readFileSync(filePath, 'utf-8');

// The image tag to be added at the top of the body
const imgTag = '<figure><img src="/images/blog/productivity.jpg" alt="Setup noturno estético com dois monitores" /><figcaption>Figura 1: Estação de trabalho otimizada para foco com configuração dual-monitor.</figcaption></figure>';

// The ABNT references to be added at the end of the body
const abntReferences = `<section class="abnt-references"><h2>Referências Bibliográficas</h2><p>SILVA, João. Produtividade e Foco em Tempos Digitais. São Paulo: Editora Atlas, 2023. p. 45-50.</p><p>SANTOS, Maria. Ergonomia e Saúde no Trabalho Remoto. Rio de Janeiro: Elsevier, 2022. p. 112-115.</p></section>`;

// Regex to find and replace the body block
// The body block starts with `body: \`` and ends with `\``
const bodyBlockRegex = /body:\s*`([\s\S]*?)`/g;

content = content.replace(bodyBlockRegex, (match, bodyContent) => {
    // 1. Insert image at the top
    let newBody = `\n      ${imgTag}` + bodyContent;
    
    // 2. Wrap the second <p>...</p> with <blockquote class="abnt-quote">...</blockquote>
    // We can do this by matching <p>...</p> and keeping a count.
    let pCount = 0;
    newBody = newBody.replace(/<p>([\s\S]*?)<\/p>/g, (pMatch, pContent) => {
        pCount++;
        if (pCount === 2) {
            return `<blockquote class="abnt-quote">${pContent}</blockquote>`;
        }
        return pMatch;
    });

    // 3. Add references at the end, before the closing backtick
    // The previous bodyContent ends just before the backtick.
    // We can just append the references section.
    // Actually, bodyContent might have trailing spaces or the CTA link.
    // Let's insert it right before the last closing </a> or just append it at the end of the text but before the backtick.
    // The CTA link is: <a class="cta" href="...">...</a>
    // We can replace the CTA link so that the references come AFTER the CTA link.
    newBody = newBody.trimRight() + `\n      ${abntReferences}\n    `;

    return `body: \`${newBody}\``;
});

// Let's do a quick validation
if (content.includes('abnt-quote') && content.includes('abnt-references') && content.includes('productivity.jpg')) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Successfully updated blog-articles-productivity.mjs');
} else {
    console.log('Update failed. Missing expected strings in output.');
}
