const main = document.querySelector('main');
const paths = {
  search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/>',
  moon: '<path d="M20.5 15A8.5 8.5 0 0 1 9 3.5 8.5 8.5 0 1 0 20.5 15Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"/>',
  Productividad: '<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 3v5m8-5v5M4 11h16m-11 4 2 2 4-4"/>',
  Código: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18"/>',
  Escritura: '<path d="m4 20 4-1 12-12-3-3L5 16l-1 4Zm11-14 3 3M11 20h9"/>',
  Datos: '<path d="M4 4v16h16M8 16v-4m5 4V8m5 8V5"/>',
  Automatización: '<path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z"/>'
};
const categories = Object.keys(paths).slice(-5);
const agents = ['ChatGPT', 'Claude', 'Codex'];
const levels = ['Básico', 'Intermedio', 'Avanzado'];
const guideData = [
  {
    id: 'que-es', title: 'Qué es una skill', minutes: 2,
    sections: [
      ['Un procedimiento reutilizable', 'Una skill guarda instrucciones para una tarea que repites. Puede incluir ejemplos y recursos. Por ejemplo, una skill de minutas le indica al agente cómo separar decisiones, responsables y plazos.'],
      ['Cómo leer una ficha', 'Abre la vista previa, compara la entrada con la salida y verifica los agentes compatibles. Revisa las instrucciones completas antes de usarlas.'],
      ['Cuándo conviene usarla', 'Si sueles corregir el mismo tipo de respuesta varias veces, convierte esas correcciones en pasos. Prueba la skill con dos ejemplos distintos.']
    ]
  },
  {
    id: 'primera-skill', title: 'Cómo instalar tu primera skill', minutes: 4,
    sections: [
      ['Elige una tarea', 'Busca una tarea pequeña que ya conozcas, como organizar una semana. Así podrás reconocer si el resultado te ayuda.'],
      ['Descarga y revisa', 'Abre la ficha y revisa el archivo en la vista previa. Después descarga SKILL.md y sigue la pestaña de tu agente. La ruta o el menú dependen del producto que uses.'],
      ['Prueba con datos de ejemplo', 'Usa primero la entrada que aparece en la ficha. Comprueba si la salida incluye los elementos esperados.'],
      ['Adapta y repite', 'Ajusta las instrucciones a tu manera de trabajar y repite la prueba con una entrada diferente.']
    ]
  },
  {
    id: 'crear-skill', title: 'Cómo escribir tu propia skill', minutes: 5,
    sections: [
      ['Acota el objetivo', 'Elige una tarea y especifica cuándo conviene activar la skill. Una descripción concreta ayuda al agente a decidir si debe usarla.'],
      ['Escribe el archivo', 'En SKILL.md, empieza con un bloque YAML que incluya name y description. A continuación, escribe los pasos en Markdown y añade un ejemplo de entrada y salida.'],
      ['Define qué hacer si faltan datos', 'Indica qué información debe pedir el agente y qué puede entregar si no la recibe.'],
      ['Comprueba los resultados', 'Prueba un caso típico y uno incompleto. Si el agente falla en ambos, ajusta primero la instrucción que genera la confusión.']
    ]
  }
];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
const findSkill = id => skills.find(skill => skill.id === id);
const explore = params => '#/explorar' + (params ? '?' + new URLSearchParams(params) : '');
const skillLink = skill => '#/skill/' + skill.id;
const formatCount = new Intl.NumberFormat('es-ES');
const releaseTag = 'skills-v1';
const repository = 'Andrypng1/cocorico-md';
const releaseAssets = new Map();
let countsPending = true;
let refreshPopularity = () => {};
const formatDate = new Intl.DateTimeFormat('es', {dateStyle:'long', timeZone:'UTC'});
let copyValues = new Map();
let toastTimer;

function getPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function savePreference(key, value) {
  try { localStorage.setItem(key, value); return true; } catch { return false; }
}
function toast(message) {
  document.querySelector('.toast').textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { document.querySelector('.toast').textContent = ''; }, 3500);
}
function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const button = document.querySelector('.theme');
  button.innerHTML = icon(dark ? 'sun' : 'moon');
  button.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  document.querySelector('meta[name=theme-color]').content = dark ? '#171321' : '#f8f7fb';
}
setTheme(getPreference('cocorico-theme') !== 'light');
document.querySelector('.theme').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  savePreference('cocorico-theme', dark ? 'dark' : 'light');
  setTheme(dark);
});
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});

function matching(query) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return skills.filter(skill => {
    const searchable = normalize([skill.nombre, skill.descripcion, skill.categoria, ...skill.etiquetas, ...skill.agentes, skill.nivel].join(' '));
    return words.every(word => searchable.includes(word));
  });
}
function searchBox(value = '') {
  return '<div class="search-wrap"><form class="search-box" role="search">' + icon('search') +
    '<input type="search" id="skill-search" aria-label="Buscar skills" placeholder="Busca una skill, p. ej. CSV" value="'+escape(value)+'" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="suggestions" aria-expanded="false">' +
    '<button class="button" type="submit">Buscar</button></form><div id="suggestions" class="suggestions" role="listbox" aria-label="Sugerencias de skills" hidden></div></div>';
}
function bindSearch(onInput) {
  const form = main.querySelector('.search-box');
  const input = form.querySelector('input');
  const list = main.querySelector('.suggestions');
  let selected = -1;
  let links = [];
  function hide() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    selected = -1;
  }
  function suggest() {
    hide();
    if (!input.value.trim()) return;
    const results = matching(input.value).slice(0, 5);
    list.innerHTML = results.length ? results.map((skill, i) =>
      '<a role="option" tabindex="-1" id="suggestion-'+i+'" aria-selected="false" href="'+skillLink(skill)+'">'+escape(skill.nombre)+'</a>'
    ).join('') : '<p role="option" aria-disabled="true">No hay sugerencias para esta búsqueda.</p>';
    links = Array.from(list.querySelectorAll('a'));
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }
  input.addEventListener('focus', suggest);
  input.addEventListener('input', () => { suggest(); onInput?.(input.value); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { hide(); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (list.hidden) suggest();
    if (!links.length || list.hidden) return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    selected = selected === -1 && direction === -1 ? links.length - 1 : (selected + direction + links.length) % links.length;
    links.forEach((link, index) => link.setAttribute('aria-selected', String(index === selected)));
    input.setAttribute('aria-activedescendant', links[selected].id);
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const choice = list.hidden ? null : links[selected];
    hide();
    if (choice) location.hash = choice.hash;
    else if (onInput) onInput(input.value);
    else location.hash = explore({q: input.value.trim()});
  });
  form.parentElement.addEventListener('focusout', event => {
    if (!form.parentElement.contains(event.relatedTarget)) hide();
  });
  list.addEventListener('pointerdown', event => {
    if (event.target.closest('a')) event.preventDefault();
  });
  return {input, hide};
}
function downloadCount(skill) {
  const total = releaseAssets.get(skill.id);
  if (total === undefined) return countsPending ? 'Cargando descargas…' : 'Recuento no disponible';
  return formatCount.format(total) + (total === 1 ? ' descarga' : ' descargas');
}
function countLabel(skill) {
  return '<span class="count" data-count="'+skill.id+'">'+escape(downloadCount(skill))+'</span>';
}
function downloadControl(skill, cssClass, label) {
  const attributes = 'class="'+cssClass+'" aria-label="Descargar '+escape(skill.nombre)+'"';
  if (skill.archivo || releaseAssets.has(skill.id)) {
    const file = skill.archivo || skill.id+'.md';
    return '<a '+attributes+' href="https://github.com/'+repository+'/releases/download/'+releaseTag+'/'+encodeURIComponent(file)+'">'+label+'</a>';
  }
  return '<button '+attributes+' data-download="'+skill.id+'">'+label+'</button>';
}
const codexPlugins = {
  remotion: 'https://www.remotion.dev/docs/ai/codex-plugin',
  impeccable: 'https://impeccable.style/#install'
};
function codexInstallLabel(skill) {
  if (!skill.agentes.includes('Codex')) return '';
  const official = codexPlugins[skill.id];
  return official
    ? '<a class="text-link" href="'+official+'">Instalar desde Codex</a>'
    : '<span>Agregar SKILL.md al proyecto</span>';
}
function card(skill) {
  return '<article class="card"><div class="card-top"><span class="tile" data-cat="'+skill.categoria+'">'+icon(skill.categoria)+'</span><span class="category">'+skill.categoria+'</span></div>'+
    '<h3><a href="'+skillLink(skill)+'">'+escape(skill.nombre)+'</a></h3><p>'+escape(skill.descripcion)+'</p>'+
    '<div class="tags">'+skill.etiquetas.map(tag => '<span>'+escape(tag)+'</span>').join('')+'</div>'+
    '<div class="meta">'+skill.agentes.join(' · ')+' <span aria-hidden="true">/</span> '+skill.nivel+'</div>'+
    (skill.agentes.includes('Codex') ? '<div class="meta">'+codexInstallLabel(skill)+'</div>' : '')+
    '<div class="card-bottom">'+countLabel(skill)+
    downloadControl(skill,'button secondary','Descargar')+'</div></article>';
}
function sorted(items, order) {
  return [...items].sort((a, b) => {
    const recent = b.fecha.localeCompare(a.fecha);
    if (order === 'fecha') return recent;
    return (releaseAssets.get(b.id) ?? -1) - (releaseAssets.get(a.id) ?? -1) || recent;
  });
}
function skillSection(title, items, link) {
  return '<section class="section"><div class="section-head"><h2>'+title+'</h2>' + (link ? '<a class="text-link" href="'+link+'">Ver catálogo</a>' : '') + '</div><div class="grid">'+items.map(card).join('')+'</div></section>';
}
function home() {
  return '<div class="shell"><section class="hero"><h1>Cocorico <em>MD</em></h1>'+
    '<p>Encuentra la skill que tu agente de IA necesita.</p>'+searchBox()+
    '<div class="categories" aria-label="Categorías destacadas">'+categories.map(category =>
      '<a class="chip" href="'+explore({categoria:category})+'">'+icon(category)+category+'</a>').join('')+'</div>'+
    '<div class="orbit" aria-hidden="true"></div><img class="mascot" src="rooster.svg" alt="Gallo de plumaje naranja y cola violeta" width="300" height="260"></section>'+
    skillSection('Recién añadidas', sorted(skills, 'fecha').slice(0, 3), explore({orden:'fecha'}))+
    '<div id="popular-skills">'+skillSection('Skills populares', sorted(skills).slice(0, 3), explore())+'</div>'+
    '<section class="section"><div class="section-head"><h2>Cómo funciona</h2><a class="text-link" href="#/tutoriales/primera-skill">Guía de instalación</a></div>'+
    '<ol class="how"><li><span class="step-number">1</span><div><h3>Busca</h3><p>Elige una skill y revisa su ejemplo.</p></div></li>'+
    '<li><span class="step-number">2</span><div><h3>Descarga</h3><p>Guarda el archivo Markdown en un clic.</p></div></li>'+
    '<li><span class="step-number">3</span><div><h3>Aplícala</h3><p>Sigue los pasos para tu agente.</p></div></li></ol></section></div>';
}
function page(title, description, body, options = {}) {
  return '<div class="shell page'+(options.article ? ' article' : '')+'">'+(options.back || '')+
    '<h1>'+escape(title)+'</h1>'+(description ? '<p class="lede">'+escape(description)+'</p>' : '')+body+'</div>';
}
function selectField(label, name, items, initial) {
  return '<label>'+label+'<select name="'+name+'">'+items.map(([value, text]) =>
    '<option value="'+value+'"'+(value === initial ? ' selected' : '')+'>'+text+'</option>').join('')+'</select></label>';
}
function catalog(params) {
  const options = (all, values) => [['', all], ...values.map(value => [value,value])];
  return page('Explorar skills','Busca por tarea o filtra por tu agente y nivel.', '<div class="catalog">'+
    '<aside class="filters" aria-label="Filtros"><h2>Filtros</h2>'+
    selectField('Categoría','categoria',options('Todas',categories),params.get('categoria'))+
    selectField('Agente','agente',options('Todos',agents),params.get('agente'))+
    selectField('Nivel','nivel',options('Todos',levels),params.get('nivel'))+
    selectField('Ordenar por','orden',[['','Popularidad'],['fecha','Más recientes']],params.get('orden'))+
    '<button class="button outline" data-reset>Limpiar filtros</button></aside><section aria-label="Resultados de búsqueda">'+searchBox(params.get('q') || '')+
    '<p class="result-count" role="status"></p><div class="grid results"></div></section></div>');
}
function bindCatalog() {
  const selects = Array.from(main.querySelectorAll('.filters select'));
  const results = main.querySelector('.results');
  const resultCount = main.querySelector('.result-count');
  const search = bindSearch(update);
  function update(query = search.input.value) {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    selects.forEach(select => { if (select.value) params.set(select.name, select.value); });
    const filtered = matching(query).filter(skill =>
      (!params.has('categoria') || skill.categoria === params.get('categoria')) &&
      (!params.has('agente') || skill.agentes.includes(params.get('agente'))) &&
      (!params.has('nivel') || skill.nivel === params.get('nivel'))
    );
    history.replaceState(null, '', explore(params.size ? params : null));
    resultCount.textContent = filtered.length === 1 ? '1 skill' : filtered.length + ' skills';
    results.innerHTML = filtered.length ? sorted(filtered, params.get('orden')).map(card).join('') :
      '<div class="empty"><h2>No encontramos skills</h2><p>Prueba con otra palabra o amplía los filtros.</p></div>';
  }
  selects.forEach(select => select.addEventListener('change', () => update()));
  main.querySelector('[data-reset]').addEventListener('click', () => {
    selects.forEach(select => { select.selectedIndex = 0; });
    search.input.value = '';
    search.hide();
    update();
    search.input.focus();
  });
  update();
  return () => {
    if (!results.contains(document.activeElement)) update();
  };
}

function installation(skill, agent) {
  if (skill.comando) return {
    steps: ['Abre una terminal en la raíz de tu proyecto y ejecuta el comando de instalación.', ...skill.pasos],
    command: skill.comando, example: skill.entrada, docs: skill.fuente
  };
  const folder = agent === 'Claude' ? '.claude/skills/' : '.agents/skills/';
  const docs = agent === 'Claude' ? 'https://code.claude.com/docs/en/skills' : 'https://developers.openai.com/codex/skills';
  const example = agent === 'Codex' ? '$'+skill.id+' '+skill.entrada : agent === 'Claude' ? '/'+skill.id+' '+skill.entrada : 'Usa la skill «'+skill.nombre+'».\n'+skill.entrada;
  if (agent === 'ChatGPT') return {
    steps: ['Descarga el archivo SKILL.md desde esta ficha.', 'Si tu espacio tiene Skills habilitadas, abre Plugins, entra en Skills y elige Crear y luego subir desde tu equipo. Selecciona SKILL.md.', ...skill.pasos],
    example, docs:'https://help.openai.com/en/articles/20001066-skills-in-chatgpt'
  };
  return {
    steps: ['Descarga el archivo SKILL.md desde esta ficha.', 'En la raíz de tu proyecto crea la carpeta indicada abajo y coloca dentro SKILL.md.', 'Abre '+(agent === 'Claude' ? 'Claude Code' : 'Codex')+' en ese proyecto y prueba el comando de ejemplo.', ...skill.pasos],
    example, path:folder+skill.id+'/SKILL.md', docs
  };
}
function copyButton(key, value, label) {
  copyValues.set(key, value);
  return '<button class="button outline" type="button" data-copy="'+key+'">'+icon('copy')+escape(label)+'</button>';
}
function codeBlock(key, label, value) {
  return '<div class="panel code"><strong>'+label+'</strong><pre><code>'+escape(value)+'</code></pre>'+copyButton(key,value,'Copiar '+label.toLowerCase())+'</div>';
}
function tutorialPanel(skill, agent) {
  const setup = installation(skill,agent);
  return '<ol class="steps">'+setup.steps.map(step => '<li>'+escape(step)+'</li>').join('')+'</ol>'+
    (setup.path ? codeBlock('path','Ruta',setup.path) : '')+
    (setup.command ? codeBlock('command','Comando de instalación',setup.command) : '')+
    codeBlock('example','Ejemplo',setup.example)+
    '<p><a class="text-link" href="'+setup.docs+'">'+(skill.fuente ? 'Documentación oficial de '+escape(skill.nombre) : 'Documentación de '+agent)+'</a></p>';
}
function detail(skill) {
  const related = sorted(skills.filter(item => item.id !== skill.id)).sort((a,b) => Number(b.categoria === skill.categoria)-Number(a.categoria === skill.categoria)).slice(0,2);
  return page(skill.nombre, skill.descripcion,
    '<p class="meta">'+skill.categoria+' · '+skill.nivel+' · '+skill.agentes.join(' · ')+'</p>'+
    '<p>'+escape(skill.instrucciones)+'</p>'+
    (skill.agentes.includes('Codex') ? '<p>'+codexInstallLabel(skill)+'</p>' : '')+
    (skill.fuente ? '<p>El archivo descargable es una guía rápida de Cocorico MD. <a class="text-link" href="'+skill.fuente+'">Obtener la skill oficial</a></p>' : '')+
    '<div class="actions">'+downloadControl(skill,'button',icon('download')+'Descargar Markdown')+copyButton('skill',skill.contenido,'Copiar contenido')+'</div>'+
    '<p class="meta">Añadida el '+formatDate.format(new Date(skill.fecha))+' · '+countLabel(skill)+'</p>'+
    '<section class="section"><h2>Vista previa</h2><div class="examples"><div class="panel"><h3>Entrada</h3><pre>'+escape(skill.entrada)+'</pre></div><div class="panel"><h3>Salida</h3><pre>'+escape(skill.salida)+'</pre></div></div>'+
    '<details class="panel code"><summary>Ver archivo SKILL.md</summary><pre><code>'+escape(skill.contenido)+'</code></pre></details></section>'+
    '<section class="section"><h2>Cómo aplicarla</h2><div class="tabs" role="group" aria-label="Agente para el tutorial">'+skill.agentes.map((agent,i)=>
    '<button class="button outline" data-agent="'+agent+'" aria-controls="install-panel" aria-pressed="'+(i===0)+'">'+agent+'</button>').join('')+
    '</div><div id="install-panel">'+tutorialPanel(skill,skill.agentes[0])+'</div></section>'+
    skillSection('Skills relacionadas',related), {article:true,back:'<a class="text-link" href="#/explorar">Volver a Explorar</a>'});
}
function tutorials() {
  return page('Tutoriales','Guías cortas para empezar a usar skills con tu agente.',
    '<div class="guide-list">'+guideData.map(guide => '<a class="panel guide-row" href="#/tutoriales/'+guide.id+'"><h2>'+guide.title+'</h2><time datetime="PT'+guide.minutes+'M">'+guide.minutes+' min de lectura</time></a>').join('')+'</div>');
}
function guidePage(guide) {
  return page(guide.title, guide.minutes+' min de lectura',guide.sections.map(([title,body]) =>
    '<section class="section"><h2>'+title+'</h2><p>'+body+'</p></section>').join('')+
    '<p class="section"><a class="text-link" href="#/explorar">Explorar skills</a></p>',
    {article:true,back:'<a class="text-link" href="#/tutoriales">Todos los tutoriales</a>'});
}
function submitPage() {
  const draft = JSON.parse(getPreference('cocorico-draft') || '{}');
  return page('Enviar una skill','Prepara tu propuesta y compártela desde tu dispositivo.',
    '<form class="form panel"><label>Nombre<input name="name" required maxlength="80" value="'+escape(draft.name || '')+'"></label>'+
    '<label>Contenido de SKILL.md<textarea name="content" required maxlength="25000" placeholder="Pega aquí las instrucciones y un ejemplo.">'+escape(draft.content || '')+'</textarea></label>'+
    '<p>El borrador se guarda en este navegador. Puedes compartirlo mediante las aplicaciones de tu dispositivo o descargarlo como archivo.</p>'+
    '<div class="actions"><button class="button" type="submit">Compartir propuesta</button><button class="button outline" type="submit" value="download">Descargar propuesta</button></div></form>',{article:true});
}
function downloadFile(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function bindSubmit() {
  const form = main.querySelector('form');
  const readDraft = () => Object.fromEntries(new FormData(form));
  form.addEventListener('input', () => savePreference('cocorico-draft',JSON.stringify(readDraft())));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = readDraft();
    if (!data.name.trim() || !data.content.trim()) { toast('Completa el nombre y el contenido.'); return; }
    const file = new File([data.content], 'SKILL.md', {type:'text/markdown'});
    if (event.submitter?.value !== 'download' && navigator.canShare?.({files:[file]})) {
      try { await navigator.share({title:data.name, files:[file]}); toast('Propuesta compartida.'); }
      catch (error) { if (error.name !== 'AbortError') toast('No se pudo compartir. Puedes descargar la propuesta.'); }
      return;
    }
    downloadFile(file, 'SKILL.md');
    toast('Propuesta descargada.');
  });
}
async function copyText(button) {
  const value = copyValues.get(button.dataset.copy);
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const field = document.createElement('textarea');
    field.value = value;
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    button.focus();
    if (!copied) { toast('Selecciona el texto para copiarlo manualmente.'); return; }
  }
  toast('Copiado al portapapeles.');
}
main.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.download) {
    const skill = findSkill(button.dataset.download);
    downloadFile(new Blob([skill.contenido], {type:'text/markdown;charset=utf-8'}), 'SKILL.md');
    toast('Descarga de SKILL.md iniciada.');
  }
  if (button.dataset.copy) copyText(button);
  if (button.dataset.agent) {
    const skill = findSkill(location.hash.split('/')[2]);
    main.querySelectorAll('[data-agent]').forEach(tab => tab.setAttribute('aria-pressed',String(tab === button)));
    main.querySelector('#install-panel').innerHTML = tutorialPanel(skill,button.dataset.agent);
  }
});
function render(focus = false) {
  const [pathname, query] = location.hash.slice(1).split('?');
  const [,view = '', id] = pathname.split('/');
  const skill = view === 'skill' && findSkill(id);
  const guide = view === 'tutoriales' && guideData.find(item => item.id === id);
  copyValues = new Map();
  const missing = () => page('Página no encontrada','Puedes volver al catálogo para seguir buscando.','<p><a class="text-link" href="#/explorar">Explorar skills</a></p>');
  const views = {
    '':home,
    explorar:() => catalog(new URLSearchParams(query)),
    skill:() => skill ? detail(skill) : missing(),
    tutoriales:() => id ? (guide ? guidePage(guide) : missing()) : tutorials(),
    enviar:submitPage
  };
  main.innerHTML = (Object.hasOwn(views,view) ? views[view] : missing)();
  document.title = view ? main.querySelector('h1').textContent+' · Cocorico MD' : 'Cocorico MD · Skills para agentes de IA';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === (view === 'skill' ? 'explorar' : view)) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  refreshPopularity = () => {};
  if (!view) {
    bindSearch();
    refreshPopularity = () => {
      const popular = main.querySelector('#popular-skills');
      if (!popular.contains(document.activeElement)) {
        popular.innerHTML = skillSection('Skills populares',sorted(skills).slice(0,3),explore());
      }
    };
  }
  if (view === 'explorar') refreshPopularity = bindCatalog();
  if (view === 'enviar') bindSubmit();
  if (focus) { window.scrollTo(0,0); main.focus({preventScroll:true}); }
}
window.addEventListener('hashchange', () => render(true));
render();

async function loadDownloadCounts() {
  try {
    const response = await fetch('https://api.github.com/repos/'+repository+'/releases/tags/'+releaseTag, {
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return;
    const release = await response.json();
    const assets = new Map(release.assets.map(asset => [asset.name,asset.download_count]));
    for (const skill of skills) {
      const total = assets.get(skill.archivo || skill.id+'.md');
      if (Number.isSafeInteger(total) && total >= 0) releaseAssets.set(skill.id,total);
    }
  } catch {
    // Downloads still use GitHub if its public counts API is unavailable.
  } finally {
    countsPending = false;
    refreshPopularity();
    main.querySelectorAll('[data-count]').forEach(label => {
      label.textContent = downloadCount(findSkill(label.dataset.count));
    });
  }
}
loadDownloadCounts();

