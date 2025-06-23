// Voice search module with speech recognition, speech synthesis, basic i18n and embedding search

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export class VoiceSearch {
  constructor(options = {}) {
    this.language = options.language || 'en';
    this.translations = options.translations || {
      en: { recording: 'Listening...', search: 'Search results:' },
      es: { recording: 'Escuchando...', search: 'Resultados:' },
    };
    this.docs = options.docs || [
      'What is the weather like today?',
      'Tell me a funny joke.',
      'Play some music.',
      'Open my calendar.',
    ];
    this.vocab = new Map();
    this.docVectors = this.docs.map(text => this.#vectorize(text));
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = this.#langCode();
    }
  }

  setLanguage(lang) {
    this.language = lang;
    if (this.recognition) {
      this.recognition.lang = this.#langCode();
    }
  }

  listen() {
    return new Promise(resolve => {
      if (!this.recognition) return resolve('');
      this.recognition.onresult = e => {
        const text = e.results[0][0].transcript;
        resolve(text);
      };
      this.recognition.start();
    });
  }

  speak(text) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = this.#langCode();
    window.speechSynthesis.speak(utter);
  }

  search(query, count = 3) {
    const qVec = this.#vector(query);
    const scores = this.docVectors.map((vec, i) => ({
      text: this.docs[i],
      score: this.#cosine(vec, qVec),
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, count);
  }

  t(key) {
    return this.translations[this.language]?.[key] || key;
  }

  // Private helpers
  #langCode() {
    return this.language === 'es' ? 'es-ES' : 'en-US';
  }

  #vectorize(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    for (const w of words) {
      if (!this.vocab.has(w)) {
        this.vocab.set(w, this.vocab.size);
      }
    }
    return this.#vector(text);
  }

  #vector(text) {
    const vec = new Array(this.vocab.size).fill(0);
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    for (const w of words) {
      const i = this.vocab.get(w);
      if (i !== undefined) vec[i] += 1;
    }
    return vec;
  }

  #cosine(a, b) {
    let dot = 0;
    let na = 0;
    let nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
  }
}
