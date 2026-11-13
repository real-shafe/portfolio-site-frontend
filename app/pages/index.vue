<template>
  <main class="home">
    <section ref="hero" class="hero" :class="{ particlesReady }">
      <img class="portraitFallback" src="/images/shafe-avatar.jpg" alt="Shafe’s black-and-white portrait" width="400" height="400" fetchpriority="high">
      <canvas ref="canvas" class="field" aria-hidden="true"></canvas>
      <h1 class="srOnly">Shafe</h1>
    </section>

    <section id="projects" class="card" aria-labelledby="projects-title">
      <div class="cardInner">
        <h2 id="projects-title" class="cardTitle">Projects</h2>
        <ul class="projects">
          <li v-for="p in projects" :key="p.name" class="project">
            <a
              class="projectLink"
              :href="p.href"
              :target="p.internal ? undefined : '_blank'"
              :rel="p.internal ? undefined : 'noopener noreferrer'"
            >
              <span class="projectName">{{ p.name }}</span>
              <span class="projectKind">{{ p.kind }}</span>
            </a>
            <p class="projectText">
              {{ p.text }}
              <a
                v-if="p.repo"
                class="repoLink"
                :href="p.repo"
                target="_blank"
                rel="noopener noreferrer"
              >Source</a>
            </p>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'Shafe' })
useSeoMeta({
  description: 'Shafe builds study tools, trains tiny language models and makes small games.',
  ogTitle: 'Shafe',
  ogDescription: 'Study tools, tiny language models and small games.',
})

const projects = [
  { name: 'Wheek Havoc', kind: 'Browser game, Three.js', href: 'https://wheek-havoc.shafe.dev',
    repo: 'https://github.com/real-shafe/wheek-havoc',
    text: 'A campy first-person roguelite. A guinea pig punches its way out of a lab full of robot scientists, powered up by science vials.' },
  { name: 'Shatterfield', kind: 'Browser game, Three.js', href: 'https://shatterfield.shafe.dev',
    repo: 'https://github.com/real-shafe/shatterfield',
    text: 'A 3D arcade shooter. Fly an interceptor through a glowing asteroid field and shatter the rocks before they hit you.' },
  { name: 'Weasel Run', kind: 'Browser game', href: 'https://weasel-run.shafe.dev',
    repo: 'https://github.com/real-shafe/weasel-run',
    text: 'An endless one-button platformer. A weasel in a red bandana runs through four biomes, bops beetles and grabs coins.' },
  { name: 'Short Story LLM', kind: 'PyTorch, runs in the browser', href: 'https://tiny-llm.shafe.dev',
    repo: 'https://github.com/real-shafe/tiny_llm',
    text: 'A small GPT trained from scratch on the TinyStories dataset, built up step by step from a bigram baseline. Start a story and it writes the rest, right on your device.' },
  { name: 'Spanish conjugation decks', kind: 'Python, Anki', href: 'https://spanish-anki.shafe.dev',
    repo: 'https://github.com/real-shafe/spanish-conjugation-anki',
    text: 'A free Anki deck of 9,000+ Spanish verb conjugation cards, each with an example sentence. Browse every card and download the deck.' },
  { name: 'Arabic Sound Lab', kind: 'Pronunciation guide, ElevenLabs', href: 'https://arabic-sound-lab.shafe.dev',
    repo: 'https://github.com/real-shafe/arabic-sound-lab',
    text: 'The sounds of Modern Standard Arabic, laid out from the lips to the throat. Tap any letter, minimal pair or vowel to hear it in a native voice generated with ElevenLabs.' },
  { name: 'Newton Force Law Sim', kind: 'Browser sim, Python', href: 'https://newton-sim.shafe.dev',
    repo: 'https://github.com/real-shafe/newton-force-law-sim',
    text: 'A spring-mass physics sandbox with swappable forces, integrators and collision rules. Fling cloth, planets and Newton’s cradle, and watch the energy books balance.' },
]

const canvas = ref<HTMLCanvasElement | null>(null)
const hero = ref<HTMLElement | null>(null)
const particlesReady = ref(false)
let disposed = false
let field: { stop: () => void } | null = null

onMounted(async () => {
  if (!canvas.value || !hero.value) return
  try {
    // served as a static file, so keep the bundler from trying to resolve it
    const url = '/js/portrait-particles.js'
    const mod = await import(/* @vite-ignore */ url)
    if (disposed || !canvas.value || !hero.value) return
    const started = await mod.start(canvas.value, { imageUrl: '/images/shafe-avatar.jpg', eventTarget: hero.value })
    if (disposed) { started.stop(); return }
    field = started
    particlesReady.value = true
  } catch (e) {
    console.warn('Portrait particles could not start', e)
  }
})

onBeforeUnmount(() => { disposed = true; field?.stop() })
</script>

<style scoped>
.home {
  background: var(--ink);
  color: var(--paper);
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.hero {
  position: relative;
  height: 100vh;
  height: 100svh;
  min-height: 520px;
  overflow: hidden;
  touch-action: pan-y;
}

.field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.portraitFallback {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  width: min(78vw, 48svh, 620px);
  height: auto;
  border-radius: 50%;
}

.particlesReady .portraitFallback {
  visibility: hidden;
}


.projectLink:focus-visible {
  outline: 3px solid var(--red);
  outline-offset: 3px;
}

/* the projects list is one big index card */
.card {
  position: relative;
  margin: 0 clamp(12px, 3vw, 40px) clamp(24px, 5vw, 64px);
  background: var(--paper);
  color: var(--text);
  border-radius: 6px;
  box-shadow: 0 30px 60px rgba(8, 12, 40, 0.45);
}

.cardInner {
  padding: 40px clamp(20px, 5vw, 64px) 56px;
}

.cardTitle {
  margin: 0 0 32px;
  padding-bottom: 14px;
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1;
  font-weight: 800;
  font-stretch: 80%;
  border-bottom: 4px solid var(--red);
  margin-left: calc(-1 * clamp(20px, 5vw, 64px));
  margin-right: calc(-1 * clamp(20px, 5vw, 64px));
  padding-left: clamp(20px, 5vw, 64px);
}

.projects {
  max-width: 52rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.project {
  padding: 18px 0 20px;
  border-bottom: 2px solid var(--blue-rule);
}

.project:last-child {
  border-bottom: 0;
}

.projectLink {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  color: inherit;
  text-decoration: none;
}

.projectName {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  line-height: 1.15;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
  transition: text-decoration-color 0.15s;
}

.projectLink:hover .projectName {
  text-decoration-color: var(--red);
}

.projectKind {
  font-size: 15px;
  color: var(--muted);
}

.projectText {
  margin: 6px 0 0;
  max-width: 40rem;
  font-size: 18px;
  line-height: 1.5;
  color: var(--text);
}

.repoLink {
  margin-left: 4px;
  font-size: 15px;
  color: var(--muted);
}

.repoLink:hover {
  color: var(--red);
}

@media (prefers-reduced-motion: reduce) {
  .projectName {
    transition: none;
  }
}
</style>
